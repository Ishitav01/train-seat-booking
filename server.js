const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

// Database setup
const db = new sqlite3.Database(':memory:'); // In-memory database
db.serialize(() => {
  db.run('CREATE TABLE seats (id INTEGER PRIMARY KEY, status TEXT DEFAULT "available", row INTEGER)');
  let seatId = 1;
  for (let i = 1; i <= 10; i++) {
    for (let j = 1; j <= 7; j++) {
      db.run('INSERT INTO seats (id, row) VALUES (?, ?)', [seatId, i]);
      seatId++;
    }
  }
  for (let i = 1; i <= 3; i++) {
    db.run('INSERT INTO seats (id, row) VALUES (?, 11)');
    seatId++;
  }
});

// Route to fetch seat availability
app.get('/seats', (req, res) => {
  db.all('SELECT * FROM seats', [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json(rows);
  });
});

// Route to book seats
app.post('/book', (req, res) => {
  const numSeats = req.body.numSeats;

  if (numSeats < 1 || numSeats > 7) {
    return res.status(400).send('You can only book between 1 and 7 seats.');
  }

  db.all('SELECT * FROM seats WHERE status = "available"', [], (err, rows) => {
    if (err) {
      throw err;
    }

    const availableSeats = rows;
    let bookedSeats = [];

    for (let i = 1; i <= 11; i++) {
      const rowSeats = availableSeats.filter(seat => seat.row === i);
      if (rowSeats.length >= numSeats) {
        bookedSeats = rowSeats.slice(0, numSeats);
        break;
      }
    }

    if (bookedSeats.length === 0) {
      bookedSeats = availableSeats.slice(0, numSeats);
    }

    if (bookedSeats.length < numSeats) {
      return res.status(400).send('Not enough seats available.');
    }

    const seatIds = bookedSeats.map(seat => seat.id);
    db.run(`UPDATE seats SET status = "booked" WHERE id IN (${seatIds.join(',')})`);

    res.json({ message: 'Seats booked successfully', bookedSeats });
  });
});

app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

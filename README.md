# Train Seat Booking System

This project implements a train seat booking system where users can reserve seats in a coach of 80 seats. The system adheres to the following specifications:

- There are 80 seats in the coach.
- Seats are arranged into 11 rows (10 rows with 7 seats each, and 1 row with 3 seats).
- Users can book up to 7 seats at a time.
- The booking process prioritizes booking all seats in the same row. If that's not possible, nearby seats are booked.
- Seat availability is displayed visually to the user.

## Features

- **Real-Time Seat Availability**: Users can see which seats are available or booked in real-time.
- **Up to 7 Seats Reservation**: A user can book between 1 to 7 seats at a time.
- **Visual Representation**: The seats are color-coded to indicate availability (green for available, red for booked).
- **Booking Logic**: The system tries to book all requested seats in the same row first. If that’s not possible, nearby seats will be booked.
- **Simple and Lightweight**: The project uses an in-memory SQLite database, making it lightweight and easy to reset each time the server starts.

## Technologies Used

- **Backend**: Node.js, Express.js
- **Frontend**: HTML, CSS, JavaScript
- **Database**: SQLite (in-memory)
- **Hosting**: Deployed on Netlify 

---

## Prerequisites

Ensure that you have the following installed on your system:

- **Node.js**: Download and install from [Node.js official site](https://nodejs.org/en/).
- **SQLite**: No external SQLite installation is required as the `sqlite3` package will handle it.

---

## Project Setup Instructions
1. Clone the Repository

Clone this repository to your local machine:
bash
git clone https://github.com/your-username/train-seat-booking.git

2. Navigate to the Project Directory
Go into the project folder:
bash
Copy code
cd train-seat-booking

4. Install the Dependencies
Run the following command to install the necessary Node.js dependencies:
bash
Copy code
npm install
5. Project Structure
The main files and their purposes:

php
Copy code
├── public
│   └── index.html        # Frontend code (HTML, CSS, JS)
├── server.js             # Backend code (Node.js and SQLite)
├── package.json          # Project metadata and dependencies
├── README.md             # Documentation (this file)

5. Running the Application Locally
To start the application locally, run the following command:

bash
Copy code
node server.js
The server will start, and you can open your browser and navigate to http://localhost:3000 to access the seat booking system.


How It Works
1. Seat Display
When the page loads, the current status of all seats (booked or available) is displayed. Each seat is represented as a colored block:

Green: Available seat
Red: Booked seat
2. Booking Seats
Enter the number of seats you wish to book (between 1 and 7).
Click the "Book" button to reserve seats.
If the booking is successful, the seat status will be updated on the UI.
3. Booking Logic
Priority Booking: The system attempts to book all requested seats in a single row.
Nearby Seats: If not enough seats are available in a row, nearby seats in adjacent rows will be booked.
Error Handling: If there aren't enough available seats to fulfill the request, an error message will be shown.






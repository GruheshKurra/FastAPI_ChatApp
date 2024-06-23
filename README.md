# FastAPI React MongoDB Chat Application

## Introduction
This is a real-time chat application built using FastAPI for the backend, React for the frontend, and MongoDB for data storage. The application leverages WebSockets for real-time communication.

## Demo
[Watch our demo video](https://drive.google.com/file/d/11QML05rwnO3_XhpGOaNm75PzqsNcOIzX/view?usp=sharing)

## Features
- Real-time messaging using WebSockets
- User authentication (username-based)
- Message persistence with MongoDB
- Responsive design
- Toast notifications for connection status and new messages

## Technologies
- Backend: FastAPI, PyMongo
- Frontend: React, Axios
- Database: MongoDB
- Real-time Communication: WebSockets
- Notifications: react-toastify

## Prerequisites
- Python 3.7+
- Node.js and npm
- MongoDB

## Installation

### Backend
1. Navigate to the `app` directory
2. Install the required Python packages
3. Set the MongoDB URI environment variable
4. Run the FastAPI server

### Frontend
1. Navigate to the React app directory
2. Install the required npm packages
3. Start the React development server

## Usage
1. Open your browser and go to `http://localhost:3000`
2. Enter a username to join the chat
3. Start sending and receiving messages in real-time

## API Endpoints
- GET `/messages`: Retrieve all messages
- POST `/messages`: Send a new message
- WebSocket `/ws`: Real-time message broadcasting

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## License
This project is licensed under the MIT License.

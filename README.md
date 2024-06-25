# FastAPI ChatApp

A real-time chat application built with FastAPI, React, and MongoDB.

## Table of Contents

1. [Introduction](#introduction)
2. [Project Structure](#project-structure)
3. [Prerequisites](#prerequisites)
4. [Installation](#installation)
5. [Usage](#usage)
6. [Features](#features)
7. [Code Overview](#code-overview)
8. [API Documentation](#api-documentation)
9. [WebSocket Protocol](#websocket-protocol)
10. [Database Schema](#database-schema)
11. [Deployment Guide](#deployment-guide)
12. [Troubleshooting](#troubleshooting)
13. [Future Enhancements](#future-enhancements)
14. [Contributing](#contributing)
15. [License](#license)

## Introduction

FastAPI ChatApp is a real-time chat application built using the FARM stack (FastAPI, React, MongoDB). This project demonstrates how to create a simple yet functional chat system with real-time messaging capabilities using WebSockets.

Key features:
- Real-time messaging
- User authentication (username-based)
- Message persistence using MongoDB
- Responsive UI

[Add a screenshot or GIF of your application here]

## Project Structure

The project is divided into two main parts:
- **Backend**: FastAPI server
- **Frontend**: React application

```bash
FastAPI_ChatApp/
│
├── app/
│   └── main.py
│
├── chat-app/
│   ├── public/
│   ├── src/
│   │   ├── App.js
│   │   └── App.css
│   ├── package.json
│   └── README.md
│
└── README.md
```

## Prerequisites

Before you begin, ensure you have the following installed:
- Python 3.7+
- Node.js and npm
- MongoDB

## Installation

### Clone the Repository

```bash
git clone https://github.com/GruheshKurra/FastAPI_ChatApp.git
cd FastAPI_ChatApp
```

### Backend Setup

1. **Create a virtual environment (optional but recommended):**

```bash
python -m venv venv
source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
```

2. **Install the required Python packages:**

```bash
pip install fastapi uvicorn pymongo pydantic
```

3. **Start the MongoDB server locally.**

4. **Run the FastAPI server:**

```bash
uvicorn app.main:app --reload
```

The backend server will start running on 
```bash
http://localhost:8000.
```

### Frontend Setup

1. **Navigate to the frontend directory:**

```bash
cd chat-app
```

2. **Install the required npm packages:**

```bash
npm install
```

3. **Start the React development server:**

```bash
$env:NODE_OPTIONS="--openssl-legacy-provider"
npm start
```

The frontend application will start running on http://localhost:3000.



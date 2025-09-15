# User Management Dashboard

This is a full-stack web application that allows you to perform CRUD (Create, Read, Update, Delete) operations on a list of users. It features a React frontend and a Node.js backend with an SQLite database.

## Project Overview

The application is designed to be a simple and intuitive user management system. It consists of two main parts: a frontend single-page application (SPA) built with React, and a backend REST API built with Node.js and Express.

- **Frontend:** The frontend provides a user interface for logging in, signing up, and managing users. It communicates with the backend via HTTP requests to fetch and manipulate user data.
- **Backend:** The backend provides a RESTful API for the frontend to consume. It handles all the business logic and data persistence. It uses an SQLite database to store user information.

## Folder Structure

```
.
├── backend
│   ├── config
│   │   └── database.js
│   ├── controllers
│   │   ├── authController.js
│   │   └── userController.js
│   ├── models
│   │   └── userModel.js
│   ├── routes
│   │   ├── authRoutes.js
│   │   └── userRoutes.js
│   ├── .gitignore
│   ├── package.json
│   └── server.js
├── frontend
│   ├── public
│   ├── src
│   │   ├── pages
│   │   │   ├── Login
│   │   │   ├── Signup
│   │   │   ├── UserList
│   │   │   └── UserForm
│   │   ├── App.css
│   │   ├── App.js
│   │   └── index.js
│   ├── .gitignore
│   └── package.json
└── README.md
```

## Tech Stack

**Frontend:**
- React
- React Router
- React Hook Form
- Axios
- CSS with Glass Morphism

**Backend:**
- Node.js
- Express
- SQLite
- Bcrypt
- Cors

## Features

- User authentication (Signup and Login)
- Secure password hashing using bcrypt
- Full CRUD functionality for user management
- Responsive design for various screen sizes
- Glass morphism UI theme
- Scrollable table for better mobile experience

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

### Backend Setup

1.  Navigate to the `backend` directory:
    ```sh
    cd backend
    ```

2.  Install the dependencies:
    ```sh
    npm install
    ```

3.  Start the backend server:
    ```sh
    npm start
    ```
    The server will start on `http://localhost:8080`.

### Frontend Setup

1.  Navigate to the `frontend` directory:
    ```sh
    cd frontend
    ```

2.  Install the dependencies:
    ```sh
    npm install
    ```

3.  Start the frontend development server:
    ```sh
    npm start
    ```
    The application will open in your browser at `http://localhost:3000`.
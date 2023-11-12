# nodejs-basic-users-system

This project is a simple Node.js API for managing user data in a PostgreSQL database. It provides basic CRUD (Create, Read, Update, Delete) operations for users.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/sonn3r/nodejs-basic-users-system.git
cd nodejs-basic-users-system
```

Install dependencies:

  ```bash
  npm install
  ```

Set up your PostgreSQL database and update the configuration in db.js to match your database settings.

Run the application:
```bash
npm start
```

## Usage
The API supports the following endpoints:

GET /users: Get a list of all users.
GET /users/:id: Get details of a specific user by ID.
POST /users: Add a new user to the database.
DELETE /users/:id: Remove a user from the database.
PUT /users/:id: Update user information.

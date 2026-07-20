# Store Rating System

A full-stack web application for managing stores, users, and ratings with role-based access.

## Overview

This project was built for a full-stack internship coding challenge.
It allows:

- Normal users to register, log in, browse stores, and submit ratings from 1 to 5
- Admin users to manage stores and users
- Store owners to view ratings submitted for their store and check the average rating

## Tech Stack

- Frontend: React.js, Vite, Tailwind CSS, React Router, Axios, Lucide React, React Hot Toast
- Backend: Node.js, Express.js, JWT, bcrypt, express-validator
- Database: MySQL / PostgreSQL style schema, implemented with MySQL2

## Features

### Authentication

- Single login system for all roles
- Normal user signup
- JWT-based protected routes
- Change password flow for logged-in users

### Admin

- Add normal users, admins, and store owners
- Add stores
- View dashboard stats
- View and search users
- View and search stores
- View user details

### Normal User

- Register and log in
- Browse all stores
- Search stores by name and address
- Submit or update a rating for a store
- View submitted ratings

### Store Owner

- Log in
- View average rating for their store
- View users who rated their store

## Project Structure

```text
backend/
  src/
    controllers/
    services/
    routes/
    validators/
    middleware/
    database/
frontend/
  src/
    components/
    context/
    hooks/
    pages/
    routes/
    services/
    utils/
```

## Environment Variables

### Backend

Create a `.env` file inside `backend/` with:

```env
PORT=5000
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=1d
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=store_rating_system
NODE_ENV=development
```

### Frontend

Optional `.env` file inside `frontend/`:

```env
VITE_API_URL=http://localhost:5000/api
```

## Database

The schema is available in:

- [`backend/src/database/schema.sql`](backend/src/database/schema.sql)
- [`backend/src/database/seed.sql`](backend/src/database/seed.sql)

Tables:

- `users`
- `stores`
- `ratings`

## Installation

### 1. Install dependencies

Run from the project root:

```bash
cd backend
npm install

cd ../frontend
npm install
```

### 2. Create the database

- Create a MySQL database named `store_rating_system`
- Run the SQL from `backend/src/database/schema.sql`
- Optionally run `backend/src/database/seed.sql`

### 3. Configure environment files

- Add the backend `.env`
- Add the frontend `.env` if you want to override the API URL

### 4. Start the backend

```bash
cd backend
npm run dev
```

### 5. Start the frontend

```bash
cd frontend
npm run dev
```

Frontend runs on:

- `http://localhost:3000`

Backend runs on:

- `http://localhost:5000`

## Important Routes

### Frontend

- `/login`
- `/register`
- `/change-password`
- `/admin/dashboard`
- `/admin/users`
- `/admin/add-user`
- `/admin/add-store`
- `/admin/stores`
- `/user/dashboard`
- `/user/stores`
- `/user/ratings`
- `/owner/dashboard`
- `/owner/ratings`

## Notes

- Validation rules are implemented on the backend and mirrored in the frontend where needed.
- Role-based access is enforced through JWT and protected routes.
- Toast notifications are used for user feedback.
- The UI has been designed to be clean and submission-ready.

## Scripts

### Backend

```bash
npm run dev
npm start
```

### Frontend

```bash
npm run dev
npm run build
npm run preview
```

## Submission Status

This project includes:

- Authentication
- Role-based dashboards
- Store and user management
- Rating submission and update flow
- Search and sorting on key listings
- A polished frontend UI


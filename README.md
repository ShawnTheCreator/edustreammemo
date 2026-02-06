# Erisn Africa Education - Student Management System

A full-stack student management application built with React, Node.js, Express, and MongoDB.

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Local Development Setup](#local-development-setup)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

## Overview

Erisn Africa Education is a professional student management system designed for educational institutions. It provides a clean interface for managing student records including personal information, contact details, enrollment dates, and academic status.

### Features

- View all students in a responsive table
- Add new students with form validation
- Edit existing student records
- Delete students with confirmation
- Toast notifications for user feedback
- Responsive design for desktop and mobile
- RESTful API with proper error handling

### Live Demo

- Frontend: https://edustream-dusky.vercel.app
- Backend API: https://edustreammemo.onrender.com/api

## Architecture

```
Frontend (React + Vite)     Backend (Node.js + Express)     Database (MongoDB Atlas)
         |                              |                              |
         |  HTTPS/API calls             |                              |
         | ----------------------------->|                              |
         |                              |  Mongoose queries            |
         |                              | ----------------------------->|
         |                              |                              |
```

### Technology Stack

**Frontend:**
- React 19
- Vite (build tool)
- Tailwind CSS
- ES6+ JavaScript

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose ODM
- Helmet (security headers)
- CORS (cross-origin handling)

**Database:**
- MongoDB Atlas (cloud-hosted)
- Collection: students

**Deployment:**
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

## Prerequisites

Before running the application locally, ensure you have:

1. Node.js (version 18 or higher)
2. npm (comes with Node.js)
3. Git
4. A MongoDB Atlas account (free tier available)

## Local Development Setup

### Step 1: Clone the Repository

```bash
git clone https://github.com/ShawnTheCreator/edustreammemo.git
cd edustreammemo
```

### Step 2: Install Backend Dependencies

```bash
cd backend
npm install
```

### Step 3: Configure Backend Environment Variables

Create a `.env` file in the `backend/` directory:

```
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/edustream?retryWrites=true&w=majority
FRONTEND_URL=http://localhost:3000
```

Replace the MongoDB URI with your own connection string from MongoDB Atlas.

### Step 4: Seed the Database (Optional)

To populate the database with sample student data:

```bash
node seed.js
```

### Step 5: Start the Backend Server

```bash
node server.js
```

You should see:
```
MongoDB Connected: [your-cluster-info]
Server running in development mode on port 5000
API URL: http://localhost:5000/api
```

### Step 6: Install Frontend Dependencies

Open a new terminal and run:

```bash
cd frontend
npm install
```

### Step 7: Configure Frontend Environment Variables

Create a `.env.local` file in the `frontend/` directory:

```
VITE_API_URL=http://localhost:5000/api
```

### Step 8: Start the Frontend Development Server

```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`

### Step 9: Access the Application

Open your browser and navigate to:

```
http://localhost:3000
```

You should see the student management interface with data from your local backend.

## Project Structure

```
edustreammemo/
├── backend/                    # Backend API
│   ├── src/
│   │   ├── controllers/        # Request handlers
│   │   │   └── studentController.js
│   │   ├── models/             # Database schemas
│   │   │   └── Student.js
│   │   ├── routes/             # API route definitions
│   │   │   └── studentRoutes.js
│   │   ├── services/           # Business logic
│   │   │   └── studentService.js
│   │   ├── middleware/         # Express middleware
│   │   │   └── errorHandler.js
│   │   └── utils/              # Utility functions
│   │       ├── AppError.js
│   │       └── catchAsync.js
│   ├── .env                    # Backend environment variables
│   ├── .env.example            # Example environment file
│   ├── app.js                  # Express app configuration
│   ├── server.js               # Server entry point
│   ├── seed.js                 # Database seeding script
│   └── package.json            # Backend dependencies
│
├── frontend/                   # Frontend React application
│   ├── public/                 # Static assets
│   │   ├── Logo.webp
│   │   └── icon.ico
│   ├── src/
│   │   ├── api/                # API client
│   │   │   ├── client.js
│   │   │   └── studentService.js
│   │   ├── components/         # React components
│   │   │   ├── Student/
│   │   │   │   ├── StudentForm.jsx
│   │   │   │   └── StudentTable.jsx
│   │   │   ├── Toast.jsx
│   │   │   └── UI/
│   │   │       ├── Button.jsx
│   │   │       └── Input.jsx
│   │   ├── App.jsx             # Main application component
│   │   ├── index.jsx           # Application entry point
│   │   └── types.js            # Type definitions
│   ├── .env.local              # Frontend environment variables
│   ├── index.html              # HTML template
│   ├── package.json            # Frontend dependencies
│   └── vite.config.js          # Vite configuration
│
├── .gitignore                  # Git ignore rules
└── README.md                   # This file
```

## Environment Variables

### Backend (.env)

| Variable | Description | Example |
|----------|-------------|---------|
| NODE_ENV | Application environment | development |
| PORT | Server port number | 5000 |
| MONGODB_URI | MongoDB connection string | mongodb+srv://... |
| FRONTEND_URL | Allowed CORS origin | http://localhost:3000 |

### Frontend (.env.local)

| Variable | Description | Example |
|----------|-------------|---------|
| VITE_API_URL | Backend API URL | http://localhost:5000/api |

## API Documentation

### Base URL

Local: `http://localhost:5000/api`

Deployed: `https://edustreammemo.onrender.com/api`

### Endpoints

#### Get All Students

```
GET /students
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "string",
      "firstName": "string",
      "lastName": "string",
      "email": "string",
      "phone": "string",
      "grade": "string",
      "enrollmentDate": "string (YYYY-MM-DD)"
    }
  ],
  "count": 10
}
```

#### Create Student

```
POST /students
```

**Request Body:**
```json
{
  "firstName": "string (required)",
  "lastName": "string (required)",
  "email": "string (required, unique)",
  "phone": "string",
  "grade": "string",
  "enrollmentDate": "string (YYYY-MM-DD, required)"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "string",
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "phone": "string",
    "grade": "string",
    "enrollmentDate": "string"
  }
}
```

#### Update Student

```
PUT /students/:id
```

**Request Body:** Same as Create Student

**Response:** Same as Create Student

#### Delete Student

```
DELETE /students/:id
```

**Response:**
```json
{
  "success": true,
  "message": "Student deleted successfully"
}
```

#### Health Check

```
GET /health
```

**Response:**
```json
{
  "success": true,
  "message": "API is running",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Database Schema

### Student Model

```javascript
{
  firstName: String (required, trimmed),
  lastName: String (required, trimmed),
  email: String (required, unique, trimmed),
  phone: String (optional, trimmed),
  grade: String (optional, trimmed),
  enrollmentDate: Date (required),
  createdAt: Date (auto-generated),
  updatedAt: Date (auto-generated)
}
```

### Validation Rules

- First name: Required, max 50 characters
- Last name: Required, max 50 characters
- Email: Required, must be unique, valid email format
- Enrollment date: Required, valid date

## Deployment

### Frontend (Vercel)

1. Push code to GitHub
2. Connect repository to Vercel
3. Set build command: `npm run build`
4. Set output directory: `dist`
5. Deploy

### Backend (Render)

1. Push code to GitHub
2. Create Web Service on Render
3. Set build command: `npm install`
4. Set start command: `node server.js`
5. Add environment variables
6. Deploy

### Environment Variables for Production

**Backend (Render):**
```
NODE_ENV=production
PORT=10000
MONGODB_URI=[your-mongodb-uri]
FRONTEND_URL=https://edustream-dusky.vercel.app
```

**Frontend (Vercel):**
No environment variables needed - the API URL is dynamically set in `api/client.js`

## Troubleshooting

### Port Already in Use

If you get `EADDRINUSE: address already in use :::5000`:

Windows:
```bash
taskkill /F /IM node.exe
```

Then restart the backend server.

### Database Connection Issues

1. Verify your MongoDB Atlas connection string
2. Ensure your IP address is whitelisted in Atlas
3. Check network connectivity

### CORS Errors

If you see CORS errors in the browser:
1. Verify `FRONTEND_URL` in backend `.env` matches your frontend URL
2. For production, ensure both URLs are in the `allowedOrigins` array in `backend/app.js`

### Frontend Not Showing Data

1. Check browser console for API errors
2. Verify backend is running
3. Confirm `VITE_API_URL` is set correctly
4. Check Network tab in browser dev tools

### Logo Not Displaying

Ensure `Logo.webp` is in the `frontend/public/` directory, not the root of the frontend folder.

## Development Commands

| Command | Description | Location |
|---------|-------------|----------|
| `npm run dev` | Start frontend dev server | frontend/ |
| `node server.js` | Start backend server | backend/ |
| `node seed.js` | Seed database with sample data | backend/ |
| `npm install` | Install dependencies | frontend/ or backend/ |

## License

This project is for educational purposes.

## Support

For issues or questions, please open an issue on GitHub.

# Erisn Africa Education - Backend API

Professional-grade Node.js/Express/MongoDB backend for the Student Management System.

## Architecture

```
backend/
├── src/
│   ├── models/         # Mongoose schemas
│   ├── controllers/    # Request handling
│   ├── services/       # Business logic
│   ├── routes/         # Route definitions
│   ├── middleware/     # Error handling & logging
│   └── utils/          # Helper functions
├── app.js              # Express app configuration
├── server.js           # Server entry point
└── package.json
```

## Features

- **Layered Architecture**: Separation of concerns with models, controllers, services
- **Mongoose Schema**: Strict validation with timestamps
- **Performance**: `.lean()` for GET queries
- **Error Handling**: Global error middleware with custom AppError class
- **Security**: Helmet headers + CORS configuration
- **Validation**: Duplicate email detection (400 Bad Request)
- **Consistent API**: Standardized JSON response format

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/students` | Get all students |
| GET | `/api/students/:id` | Get single student |
| POST | `/api/students` | Create new student |
| PUT | `/api/students/:id` | Update student |
| DELETE | `/api/students/:id` | Delete student |
| GET | `/api/health` | Health check |

## Setup

1. **Install dependencies**:
   ```bash
   cd backend
   npm install
   ```

2. **Create .env file**:
   ```bash
   cp .env.example .env
   ```

3. **Start MongoDB** (local or use MongoDB Atlas)

4. **Run server**:
   ```bash
   # Development
   npm run dev
   
   # Production
   npm start
   ```

Server runs on `http://localhost:5000`

## Response Format

All API responses follow this structure:

```json
{
  "success": true,
  "data": { ... },
  "message": "Optional message"
}
```

Error responses:
```json
{
  "success": false,
  "status": "fail",
  "message": "Error description"
}
```

## Frontend Integration

The frontend is configured to connect to `http://localhost:5000/api` via the `VITE_API_URL` environment variable.

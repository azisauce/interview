# Interview - Angular 19 + Express.js

This project demonstrates an Angular 19 application with an Express.js backend API.

## Project Structure

```
interview-yassine/
├── server.js                          # Express.js backend server
├── src/
│   └── app/
│       ├── services/
│       │   └── user.service.ts        # Angular HTTP service
│       └── user-dashboard/
│           ├── user-dashboard.component.ts
│           ├── user-dashboard.component.html
│           └── user-dashboard.component.css
└── package.json
```

## Features

### Backend (Express.js)
- RESTful API with mock user data
- CORS enabled for Angular frontend
- Endpoints:
  - `GET /api/users` - Get all users

### Frontend (Angular 19)
- User Dashboard component with:
  - Data fetching from API
  - Advanced filtering (search, role, status, department)
  - Sortable table columns
  - Pagination
  - CRUD operations
  - Statistics dashboard
  - Modern UI with animations

### Angular Service
- `UserService` - HTTP service for API communication
- Type-safe interfaces
- RxJS observables for async operations

## Running the Application

### Prerequisites
- Node.js v18.20.8
- npm 10.8.2

### Start Backend Server
```bash
npm run server
```
The server will run on `http://localhost:3000`

### Start Frontend (in a new terminal)
```bash
npm start
```
The Angular app will run on `http://localhost:4200`

## API Endpoints

### Get All Users
```bash
curl http://localhost:3000/api/users
```

### Create User
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New User",
    "email": "new@example.com",
    "role": "Developer",
    "status": "active",
    "joinDate": "2024-01-01",
    "department": "Engineering"
  }'
```

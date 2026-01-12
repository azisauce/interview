# Interview Yassine - Angular 19 + Express.js

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
  - `GET /api/users/:id` - Get user by ID
  - `POST /api/users` - Create new user
  - `PUT /api/users/:id` - Update user
  - `DELETE /api/users/:id` - Delete user
  - `GET /api/health` - Health check

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
- Error handling

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

### Get User by ID
```bash
curl http://localhost:3000/api/users/1
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

### Update User
```bash
curl -X PUT http://localhost:3000/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Name"
  }'
```

### Delete User
```bash
curl -X DELETE http://localhost:3000/api/users/1
```

## Development Notes

### Component Refactoring Opportunity
The `UserDashboardComponent` is intentionally complex and handles multiple responsibilities. It's designed to be refactored into parent-child components using `@Input()` and `@Output()`:

**Potential Child Components:**
- `UserStatisticsComponent` - Display statistics
- `UserFiltersComponent` - Handle filtering logic
- `UserTableComponent` - Display sortable table
- `UserPaginationComponent` - Manage pagination
- `UserFormComponent` - Handle add/edit forms

### Service Pattern
The application demonstrates the Angular service pattern:
1. **Service Layer** (`UserService`) - Handles HTTP communication
2. **Component Layer** (`UserDashboardComponent`) - Consumes service and manages UI
3. **Separation of Concerns** - Business logic in service, presentation in component

## Technologies Used

- **Frontend**: Angular 19, TypeScript, RxJS
- **Backend**: Express.js, Node.js
- **Styling**: CSS with modern gradients and animations
- **HTTP**: Angular HttpClient, CORS

## Next Steps

1. The user can implement the CRUD operations in the component to use the service methods
2. Refactor the component into parent-child architecture
3. Add form validation
4. Implement proper error handling UI
5. Add loading states
6. Connect to a real database instead of mock data

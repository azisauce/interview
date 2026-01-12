const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Mock user data (as if from database)
const mockUsers = [
    {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        role: 'Admin',
        status: 'active',
        joinDate: '2023-01-15',
        department: 'Engineering'
    },
    {
        id: 2,
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        role: 'Developer',
        status: 'active',
        joinDate: '2023-03-20',
        department: 'Engineering'
    },
    {
        id: 3,
        name: 'Bob Johnson',
        email: 'bob.johnson@example.com',
        role: 'Manager',
        status: 'active',
        joinDate: '2022-11-10',
        department: 'Marketing'
    },
    {
        id: 4,
        name: 'Alice Williams',
        email: 'alice.williams@example.com',
        role: 'Designer',
        status: 'inactive',
        joinDate: '2023-05-05',
        department: 'Marketing'
    },
    {
        id: 5,
        name: 'Charlie Brown',
        email: 'charlie.brown@example.com',
        role: 'Analyst',
        status: 'active',
        joinDate: '2023-07-12',
        department: 'Finance'
    },
    {
        id: 6,
        name: 'Diana Prince',
        email: 'diana.prince@example.com',
        role: 'Developer',
        status: 'active',
        joinDate: '2023-02-28',
        department: 'Engineering'
    },
    {
        id: 7,
        name: 'Ethan Hunt',
        email: 'ethan.hunt@example.com',
        role: 'Manager',
        status: 'active',
        joinDate: '2022-09-15',
        department: 'Sales'
    },
    {
        id: 8,
        name: 'Fiona Green',
        email: 'fiona.green@example.com',
        role: 'Developer',
        status: 'inactive',
        joinDate: '2023-04-18',
        department: 'Engineering'
    },
    {
        id: 9,
        name: 'George Miller',
        email: 'george.miller@example.com',
        role: 'Analyst',
        status: 'active',
        joinDate: '2023-06-22',
        department: 'Finance'
    },
    {
        id: 10,
        name: 'Hannah Lee',
        email: 'hannah.lee@example.com',
        role: 'Designer',
        status: 'active',
        joinDate: '2023-08-30',
        department: 'Marketing'
    }
];

// API Routes

// GET all users
app.get('/api/users', (req, res) => {
    // Simulate database delay
    setTimeout(() => {
        res.json({
            success: true,
            data: mockUsers,
            count: mockUsers.length
        });
    }, 300);
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'API is running',
        timestamp: new Date().toISOString()
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Express server running on http://localhost:${PORT}`);
    console.log(`📊 API endpoint: http://localhost:${PORT}/api/users`);
    console.log(`💚 Health check: http://localhost:${PORT}/api/health`);
});

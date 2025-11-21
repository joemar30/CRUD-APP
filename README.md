cd C:\Users\Acer\Desktop\crud-app

@'
# StockManager - Full Stack CRUD Application

A modern, responsive full-stack web application for inventory management with user authentication and role-based access control.

![StockManager](https://img.shields.io/badge/React-18.2.0-blue) ![Node.js](https://img.shields.io/badge/Node.js-Express-green) ![SQLite](https://img.shields.io/badge/Database-SQLite-lightgrey)

## 🌟 Features

### 🔐 Authentication & Authorization
- **User Login/Logout** with JWT tokens
- **Role-based Access Control** (Admin vs User)
- **Secure password handling** with bcrypt

### 📦 Product Management
- **View Products** with search and filter capabilities
- **Add New Products** with full details
- **Edit Product** information
- **Delete Products** (Admin only)
- **Stock Management** with real-time quantity updates
- **Product Categories** organization

### 👥 User Management (Admin Only)
- **View All Users** with roles and creation dates
- **Add New Users** with email, name, and role assignment
- **Delete Users** (cannot delete own account)
- **Role Management** (Admin/User)

### 🎨 User Interface
- **Modern, Responsive Design** works on desktop, tablet, and mobile
- **Clean, Card-based Layout** for product display
- **Intuitive Navigation** with role-specific menus
- **Real-time Notifications** for user feedback
- **Search & Filter** functionality
- **Pagination** for large datasets

## 🚀 Tech Stack

### Frontend
- **React 18** with Hooks
- **Vite** for fast development
- **React Router** for navigation
- **Axios** for API calls
- **CSS3** with modern features (Grid, Flexbox, Variables)
- **Font Awesome** for icons

### Backend
- **Node.js** with Express.js
- **SQLite** database (file-based, no setup required)
- **JWT** for authentication
- **bcryptjs** for password hashing
- **CORS** enabled for frontend communication

## 📋 Prerequisites

Before running this application, make sure you have installed:
- **Node.js** (version 14 or higher)
- **npm** (comes with Node.js)

## 🛠️ Installation & Setup

### 1. Clone or Download the Project
```bash
# If using git
git clone <repository-url>
cd crud-app

# Or extract the downloaded zip file and navigate to the folder

2. BACKEND SETUP
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Start the backend server
npm run dev

The backend will start on http://localhost:5000

3.FRONTEND SETUP

# Open a new terminal window
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the frontend development server
npm run dev

The frontend will start on http://localhost:3000

🎯 Usage
Access the Application
Open your browser and go to http://localhost:3000

You will see the login page

Demo Accounts
Two demo accounts are available:

🔧 Admin Account (Full Access)
Email: admin@example.com

Password: password123

Admin Permissions:

View, add, edit, and delete products

Manage user accounts

Access all application features

👤 User Account (Limited Access)
Email: user@example.com

Password: password123

User Permissions:

View all products

Add new products

Adjust stock quantities

Cannot delete products or access user management

Navigation
Dashboard: Overview of the system

Products: View and manage all products

Add Product: Create new products

User Management: Manage users (Admin only)

Add User: Create new users (Admin only)


🔧 API Endpoints
Authentication
POST /api/auth/login - User login

GET /api/auth/profile - Get user profile (protected)

Products
GET /api/products - Get all products (with search/filter/pagination)

POST /api/products - Create new product (protected)

PUT /api/products/:id - Update product (protected, admin only)

DELETE /api/products/:id - Delete product (protected, admin only)

Users
GET /api/users - Get all users (protected, admin only)

POST /api/users - Create new user (protected, admin only)

DELETE /api/users/:id - Delete user (protected, admin only)

🎨 Features in Detail
Product Management
Search: Real-time search by product name or description

Filter: Filter by category and stock status

Pagination: Handle large product lists efficiently

Stock Control: Increment/decrement stock quantities

Categories: Organize products into categories

User Management
Role Assignment: Assign admin or user roles

Account Management: Create and manage user accounts

Security: Prevent self-deletion and role escalation

Responsive Design
Mobile-first approach

Flexible grid layouts

Touch-friendly interfaces

Optimized for all screen sizes

🚀 Deployment
Backend Deployment
The backend can be deployed to services like:

Heroku

Railway

DigitalOcean

AWS EC2

Frontend Deployment
The frontend can be deployed to:

Vercel

Netlify

GitHub Pages

AWS S3

Environment Variables
Create a .env file in the backend directory:

env
DB_TYPE=sqlite
JWT_SECRET=your-super-secret-key
PORT=5000


🤝 Contributing
Fork the project

Create your feature branch (git checkout -b feature/AmazingFeature)

Commit your changes (git commit -m 'Add some AmazingFeature')

Push to the branch (git push origin feature/AmazingFeature)

Open a Pull Request

📝 License
This project is licensed under the MIT License - see the LICENSE file for details.

👨‍💻 Development
Running in Development Mode
# Backend (terminal 1)
cd backend && npm run dev

# Frontend (terminal 2) 
cd frontend && npm run dev
Building for Production

# Frontend build
cd frontend && npm run build

# Backend start (production)
cd backend && npm start

🐛 Troubleshooting

Common Issues
Port already in use

Change ports in backend/.env and frontend/vite.config.js

Dependencies not installed

Run npm install in both backend and frontend directories

Database connection issues

The SQLite database is created automatically on first run

CORS errors

Backend is configured to accept requests from localhost:3000

Getting Help
If you encounter any issues:

Check the console for error messages

Ensure all dependencies are installed

Verify both servers are running

Check that ports 3000 and 5000 are available

🙏 Acknowledgments
React team for the amazing framework

Vite for fast development builds

Express.js for the robust backend

SQLite for simple database management

Font Awesome for beautiful icons# StockManager - Full Stack CRUD Application

[Previous content remains the same...]

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Development

[Rest of the content remains the same...]

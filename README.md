LocalChefBazaar — Marketplace for Local Home-Cooked Meals
📌 Project Overview

LocalChefBazaar is a full-stack MERN marketplace platform that connects local home chefs with customers looking for fresh, healthy, and affordable homemade meals.

Customers can browse meals, view details, place orders, make secure payments, leave reviews, and track order status in real-time.

Chefs can create and manage meals, accept or reject orders, and deliver meals.

Admins can manage users, handle role requests, monitor fraud users, and view platform statistics.

🎯 Project Purpose

This project demonstrates:

Full-stack MERN development skills

Role-based authentication & authorization

Secure JWT-based authentication

Payment system integration (Stripe)

CRUD operations with MongoDB

Dashboard management system

Real-time order status updates

Clean, recruiter-friendly UI design

🌐 Live URL

🔗 Client Live Site: https://your-live-client-url.com

🔗 Server Live API: https://your-live-server-url.com

🔐 Admin Credentials

Admin Email: samiha@gmail.com

Admin Password: Samiha@123

👥 User Roles

The system has three main roles:

👤 Normal User (Customer)

Browse meals

View meal details

Add reviews

Add to favorites

Place orders

Make payments

Track order status

Manage profile

👨‍🍳 Chef

Create meals

Update/Delete meals

Manage order requests

Accept / Cancel / Deliver orders

View chef-specific dashboard

👑 Admin

Manage users

Mark users as fraud

Manage role requests

Approve Chef/Admin requests

View platform statistics

Monitor payments & orders

✨ Key Features
🔐 Authentication

Firebase Email & Password Login

JWT-based Authorization

Role-based protected routes

Secure MongoDB & Firebase config using environment variables

🏠 Home Page

Animated Hero Section (Framer Motion)

Dynamic Daily Meals (6 items)

Customer Reviews Section

Extra Custom Section

🍽 Meals Page

Card layout of meals

Sort by price (Ascending/Descending)

Pagination (10 items per page)

See Details (Protected)

📄 Meal Details Page

Full meal information

Review system (Add, Update, Delete)

Add to Favorite

Order Now button

❤️ Favorite System

Add meal to favorites

Prevent duplicate favorites

Delete favorite meals

🛒 Order System

Auto-filled order form

Quantity-based total price calculation

SweetAlert confirmation

Order saved to MongoDB

Order status tracking

💳 Stripe Payment Integration

Payment only when order is accepted

Payment status updated

Payment history stored

Redirect to success page

📊 Dashboards

User Dashboard

My Profile

My Orders

My Reviews

Favorite Meals

Chef Dashboard

Create Meal

My Meals

Order Requests

Admin Dashboard

Manage Users

Manage Requests

Platform Statistics (Recharts)

Fraud User Management

📈 Platform Statistics

Total Payment Amount

Total Users

Orders Pending

Orders Delivered

Recharts visualization (Bar / Pie Chart)

⚠️ Fraud System

Admin can mark user/chef as fraud

Fraud users cannot place orders

Fraud chefs cannot create meals

📱 Responsive Design

Fully responsive for mobile, tablet & desktop

Proper spacing & alignment

Clean modern UI

🛠 Technologies Used
💻 Frontend

React.js

React Router

React Hook Form

Axios

Axios Interceptors

TanStack React Query

Framer Motion

Recharts

SweetAlert2

Stripe JS

Tailwind CSS / DaisyUI

🖥 Backend

Node.js

Express.js

MongoDB

JWT (jsonwebtoken)

Stripe Payment API

Cookie-parser

CORS

Dotenv

🔥 Authentication

Firebase Authentication (Email & Password)

🔒 Security Features

JWT Token Verification Middleware

Role-based Route Protection

Environment Variable Protection

MongoDB credentials secured

Firebase config secured

Protected API endpoints

📂 Database Collections

users

meals

reviews

favorites

order_collection

payment_history

role_requests

🚀 Deployment

Client: Firebase

Server: Vercel 

Firebase Domain Authorized

No CORS / 404 / 504 Errors

Private routes protected on reload

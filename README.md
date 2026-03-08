# 🍲 LocalChefBazaar – Client

A modern **full-stack MERN marketplace platform** that connects **local home chefs with customers** looking for fresh, homemade meals.

Customers can browse meals, place orders, leave reviews, and track order status, while chefs can manage meals and handle orders through an intuitive dashboard.

The project focuses on **supporting local chefs, promoting healthy food, and creating a transparent food marketplace.**

---

# 🔗 Project Links

- **Live Site:** https://local-chef-bazaar-27127.web.app
- **Client Repository:** https://github.com/maishaj/local_chef_bazaar_client
- **Server Repository:** https://github.com/maishaj/local_chef_bazaar_server

---

# ✨ Key Features

## 👤 Authentication

- Email & Password login
- Google authentication
- Firebase authentication integration
- Protected routes for authenticated users

## 🍽️ Meal Marketplace

- Browse meals created by local chefs
- View detailed meal information
- Search and filter meals
- Dynamic meal listings

## 🛒 Order System

- Add meals to cart
- Secure checkout process
- Order tracking
- Order history for users

## ⭐ Reviews & Ratings

- Customers can leave reviews
- Rating system for meals
- Helps other users make informed decisions

## 👨‍🍳 Chef Dashboard

- Add new meals
- Update meal information
- Delete meals
- Manage customer orders

## 🛠 Admin Dashboard

- Manage platform users
- Handle role requests
- Monitor platform activity
- Manage meals and orders

## 📊 Role Based System

Three types of roles exist in the system:

- **Customer**
- **Chef**
- **Admin**

Each role has **different permissions and dashboard features.**

---

# 🛠 Tech Stack

## Frontend

- React.js
- React Router
- Tailwind CSS
- DaisyUI
- Axios
- Firebase Authentication

## Backend

- Node.js
- Express.js
- MongoDB
- JWT Authentication

## Tools

- Firebase
- Vercel
- Git & GitHub

---

# 📁 Project Structure

```
src
 ┣ components
 ┣ pages
 ┣ routes
 ┣ hooks
 ┣ layouts
 ┣ context
 ┣ firebase
 ┗ utils
```

---

# ⚙️ Environment Variables

Create a `.env` file in the root folder and add the following:

```
VITE_apiKey=your_key
VITE_authDomain=your_domain 
VITE_projectId=your_project_id
VITE_storageBucket=your_bucket
VITE_messagingSenderId=your_sender_id
VITE_appId=your_app_id
VITE_image_host_key=your_image_host_id

```

---

# 🚀 Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/maishaj/local_chef_bazaar_client.git
```

### 2️⃣ Navigate to project folder

```bash
cd local_chef_bazaar_client
```

### 3️⃣ Install dependencies

```bash
npm install
```

### 4️⃣ Run the project

```bash
npm run dev
```

---

# 📌 Future Improvements

- Real-time order tracking
- Mobile UI improvements
- Push notifications
- Chef analytics dashboard
- Integrated payment gateway

---

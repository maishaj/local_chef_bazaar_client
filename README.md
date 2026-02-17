# 👨‍🍳 LocalChefBazaar – Marketplace for Local Home-Cooked Meals

**LocalChefBazaar** is a modern MERN stack platform that connects home cooks with people looking for fresh, homemade food. The platform empowers local chefs to earn from their kitchens while providing customers with access to healthy, affordable meals with real-time tracking and secure payments.

🔗 **[Live Site URL](https://local-chef-bazaar.web.app/)**
📂 **[Client Repository](https://github.com/maishaj/local_chef_bazaar_client)**
📂 **[Server Repository](https://github.com/maishaj/local_chef_bazaar_server)**

---

## 🚀 Key Features

* **Role-Based Access Control (RBAC):** Tailored interfaces and specific permissions for **Admins**, **Chefs**, and **Normal Users**.
* **Dynamic Meal Management:** Chefs can upload menus, manage food items (ingredients, price, delivery area), and handle customer orders.
* **Secure Ordering & Payments:** Integrated **Stripe** payment functionality for orders, with status tracking from "Pending" to "Delivered."
* **Interactive Marketplace:** Public meals page with price sorting, detailed meal insights, and chef experience details.
* **Engagement System:** Users can submit reviews with ratings and maintain a personalized "Favorite Meals" collection.
* **Admin Oversight:** Centralized dashboard to manage user roles, approve chef requests, and monitor platform statistics via **Recharts**.
* **Responsive & Animated UI:** A mobile-optimized design featuring smooth animations powered by **Framer Motion**.

---

## 🛠️ Technologies Used

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React.js, React Router, Tailwind CSS, Framer Motion |
| **Backend** | Node.js, Express.js, JWT (JSON Web Token) |
| **Database** | MongoDB |
| **Authentication** | Firebase Authentication (Email/Password & Google Login) |
| **Payments** | Stripe API |
| **Hosting** | Firebase (Frontend) & Vercel (Backend) |

---

## 🧱 Layout Structure

### 🌍 Public Routes (Accessible to everyone)
* **Home Page:** Animated Hero section, Daily Meals (6 most recent), Customer Reviews, and a Newsletter section.
* **Meals Page:** Full menu display with sorting capabilities; "See Details" is restricted to logged-in users.
* **Authentication:** Secure Login and Registration with role-based defaults and password validation.

### 🛡️ Private Dashboards (Logged-in users only)
* **User:** Profile management, My Orders, My Reviews, and Favorite Meals.
* **Chef:** Create Meal (image upload required), My Meals management, and Order Request handling.
* **Admin:** Manage Users (Make Fraud action), Request Approvals (Chef/Admin requests), and Platform Statistics.

---

## 🔑 Demo Admin Credentials
To explore the Admin, use the following:

> **Email:** `samiha@gmail.com`  
> **Password:** `Samiha@123`

---

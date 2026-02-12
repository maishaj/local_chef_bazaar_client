# LocalChefBazaar - Marketplace for Local Home-Cooked Meals

## 📖 Project Purpose
LocalChefBazaar is a modern online platform that connects home cooks with people looking for fresh, homemade food. It allows chefs to earn money from their kitchens while providing customers access to healthy, affordable meals prepared by local chefs.

---

## 🚀 Live Links
* **Live Website:** [https://local-chef-bazaar-27127.web.app/](https://local-chef-bazaar-27127.web.app/)
* **Server Repository:** [https://github.com/maishaj/local_chef_bazaar_server](https://github.com/maishaj/local_chef_bazaar_server)
* **Client Repository:** [https://github.com/maishaj/local_chef_bazaar_client](https://github.com/maishaj/local_chef_bazaar_client)

---

## ✨ Key Features

### 1. User Roles and Permissions 
* **Customer:** Can browse meals, place orders, and leave reviews
* **Chef:** Can upload menus, manage food items, and handle customer orders.
* **Admin:** Has full system access, including managing users, chefs, and platform statistics.

### 2. Meal Management & Ordering
* **Dynamic Daily Meals:** Displays a list of meals with real-time sorting by price.
* **Interactive Reviews:** Users can submit ratings and comments that update the UI instantly.
* **Secure Checkout:** Integrated Stripe payment gateway for secure meal purchases.

### 3. Comprehensive Dashboards [cite: 206]
* **Chef Dashboard:** Manage order statuses (Pending → Accepted → Delivered).
* **Admin Dashboard:** Approve/Reject "Be a Chef" requests and visualize data using Recharts.

### 4. Security & Performance
* **JWT Authentication:** Secure token-based access for protected routes and API requests.
* **Firebase Auth:** Handles secure user registration and login.
* **Fully Responsive:** Optimized design for mobile and desktop alignment.

---

## 🛠️ Technologies & Packages Used

### **Frontend**
* **React.js:** UI Framework
* **Tailwind CSS & DaisyUI:** Proper alignment and eye-pleasing design 
* **Framer Motion:** Animated Hero and Banner sections
* **React Hook Form:** Handling inputs and validation for all forms
* **Recharts:** Visualizing platform metrics via Bar or Pie charts 
* **Axios:** Secure API communication
* **SweetAlert2 / React Hot Toast:** Confirmation and success messages 

### **Backend**
* **Node.js & Express.js:** Server-side logic
* **MongoDB:** Database for meals, users, orders, and favorites 
* **JSON Web Token (JWT):** Secure access to protected data 
* **Stripe:** Secure payment functionality 
* **Dotenv:** Securing Firebase and MongoDB credentials 

---
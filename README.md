# LocalChefBazaar - Marketplace for Local Home-Cooked Meals

## 📖 Project Purpose
[cite_start]LocalChefBazaar is a modern online platform that connects home cooks with people looking for fresh, homemade food[cite: 9, 14]. [cite_start]It allows chefs to earn money from their kitchens while providing customers access to healthy, affordable meals prepared by local chefs[cite: 11, 12].

---

## 🚀 Live Links
* **Live Website:** [https://local-chef-bazaar-27127.web.app/](https://local-chef-bazaar-27127.web.app/)
* **Server Repository:** [https://github.com/maishaj/local_chef_bazaar_server](https://github.com/maishaj/local_chef_bazaar_server)
* **Client Repository:** [https://github.com/maishaj/local_chef_bazaar_client](https://github.com/maishaj/local_chef_bazaar_client)

---

## ✨ Key Features

### [cite_start]1. User Roles and Permissions [cite: 30]
* [cite_start]**Customer:** Can browse meals, place orders, and leave reviews[cite: 37, 38].
* [cite_start]**Chef:** Can upload menus, manage food items, and handle customer orders[cite: 35, 36].
* [cite_start]**Admin:** Has full system access, including managing users, chefs, and platform statistics[cite: 33, 34, 219].

### 2. Meal Management & Ordering
* [cite_start]**Dynamic Daily Meals:** Displays a list of meals with real-time sorting by price[cite: 80, 84, 91].
* [cite_start]**Interactive Reviews:** Users can submit ratings and comments that update the UI instantly[cite: 113, 131, 132].
* [cite_start]**Secure Checkout:** Integrated Stripe payment gateway for secure meal purchases[cite: 10, 267].

### [cite_start]3. Comprehensive Dashboards [cite: 206]
* [cite_start]**Chef Dashboard:** Manage order statuses (Pending → Accepted → Delivered)[cite: 216, 253, 367].
* [cite_start]**Admin Dashboard:** Approve/Reject "Be a Chef" requests and visualize data using Recharts[cite: 218, 247, 376].

### 4. Security & Performance
* [cite_start]**JWT Authentication:** Secure token-based access for protected routes and API requests[cite: 380].
* [cite_start]**Firebase Auth:** Handles secure user registration and login[cite: 42, 55].
* [cite_start]**Fully Responsive:** Optimized design for mobile and desktop alignment[cite: 20, 380].

---

## 🛠️ Technologies & Packages Used

### **Frontend**
* [cite_start]**React.js:** UI Framework [cite: 14]
* [cite_start]**Tailwind CSS & DaisyUI:** Proper alignment and eye-pleasing design [cite: 20]
* [cite_start]**Framer Motion:** Animated Hero and Banner sections [cite: 79]
* [cite_start]**React Hook Form:** Handling inputs and validation for all forms [cite: 381]
* [cite_start]**Recharts:** Visualizing platform metrics via Bar or Pie charts [cite: 376, 377]
* **Axios:** Secure API communication
* [cite_start]**SweetAlert2 / React Hot Toast:** Confirmation and success messages [cite: 161, 185]

### **Backend**
* [cite_start]**Node.js & Express.js:** Server-side logic [cite: 14]
* [cite_start]**MongoDB:** Database for meals, users, orders, and favorites [cite: 14, 130, 146, 165]
* [cite_start]**JSON Web Token (JWT):** Secure access to protected data [cite: 380]
* [cite_start]**Stripe:** Secure payment functionality [cite: 267]
* [cite_start]**Dotenv:** Securing Firebase and MongoDB credentials [cite: 18, 19]

---

## 💻 Local Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/maishaj/local_chef_bazaar_client](https://github.com/maishaj/local_chef_bazaar_client)
LocalChefBazaar - Marketplace for Local Home-Cooked Meals

Project Purpose: LocalChefBazaar is a modern MERN stack platform designed to connect local home cooks (Chefs) with customers seeking fresh, healthy, and affordable homemade meals. It allows chefs to earn income from their kitchens while providing users with a real-time ordering and secure payment experience

🚀Live Links

Live Website: https://local-chef-bazaar-27127.web.app/
Server Repository: https://github.com/maishaj/local_chef_bazaar_server
Client Repository: https://github.com/maishaj/local_chef_bazaar_client

✨ Key Features

1. Role-Based Access Control (RBAC)

Customer: Can browse meals, manage favorite lists, and place orders.
Chef: Can create and manage menus, and handle incoming order requests.
Admin: Full system access to manage users, approve chef requests, and view platform statistics.

2. Meal Management & Ordering

Dynamic Daily Meals: Real-time meal cards with sorting functionality by price.
Interactive Reviews: Users can submit and view ratings and comments for specific meals.
Secure Checkout: Integrated Stripe payment gateway for order completion.

3. Comprehensive Dashboards
   Chef Dashboard: Manage order statuses (Pending → Accepted → Delivered).
   Admin Dashboard: Approve/Reject "Be a Chef" requests and visualize data with Recharts.

4. Security & Performance

JWT Authentication: Secure token-based access for protected routes.
Firebase Auth: Handles user registration and secure login.
Fully Responsive: Optimized for desktop and mobile devices.

🛠️ Technologies & Packages Used

Frontend

React.js: UI Framework
Tailwind CSS & DaisyUI: Styling and alignment
Framer Motion: Animated Hero and Banner sections
React Hook Form: Handling all form validations
Recharts: Visualizing platform statistics
Axios: API communication
SweetAlert2 / React Hot Toast: Success and error notifications

Backend

Node.js & Express.js: Server-side logic
MongoDB: Database for meals, users, and orders
JSON Web Token (JWT): Secure authentication
Stripe: Payment processing
Dotenv: Managing environment variables for security

💻 Local Setup
Clone the repository.
Install dependencies: npm install.
Create a .env file with your MONGODB_URI, STRIPE_SECRET_KEY, and FIREBASE_CONFIG.
Run the project: npm run dev.

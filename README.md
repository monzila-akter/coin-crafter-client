## CoinCrafter - Micro-Task and Earning Platform
(Add a clean screenshot here)

## 🚀 Project Overview
CoinCrafter is a Micro-Task and Earning Platform where users can complete small tasks to earn coins, which can be withdrawn as real money. The platform supports three user roles: Worker, Buyer, and Admin, each with distinct functionalities.

Workers complete tasks to earn rewards.
Buyers create and manage tasks while paying workers for their work.
Admins oversee user activities, manage withdrawals, and maintain system integrity.
## 🛠️ Tech Stack
- Frontend: React.js, Tailwind CSS, Swiper Slider, React Router
- Backend: Node.js, Express.js, MongoDB
- Authentication: Firebase Authentication, JWT (JSON Web Token)
- Payments: Stripe Payment Integration
- Hosting: Firebase (Client-side), Vercel (Server-side)
- Other: ImageBB API (for image uploads)
## 🌟 Core Features
✅ Role-Based Dashboard: Separate dashboards for Workers, Buyers, and Admins.
✅ User Authentication: Email/password login and Google sign-in.
✅ Task Management: Buyers can create, update, and delete tasks. Workers can submit tasks and earn rewards.
✅ Coin System: Workers earn coins that can be withdrawn; Buyers purchase coins to pay workers.
✅ Payment Integration: Secure Stripe-based payment system for purchasing coins.
✅ Withdrawal System: Workers can withdraw earnings once they reach 200 coins.
✅ Real-time Notifications: Users receive notifications for important events.
✅ Secure Authorization: Role-based access with JWT authentication.
✅ Pagination & Responsive UI: Seamless experience across all devices.

## 📦 Dependencies
# Below are the key dependencies used in the project:

1. Client-Side (Frontend)
- React.js
- React Router DOM
- Firebase Authentication
- Swiper.js (for sliders)
- React-Responsive-Carousel
- Tailwind CSS
2. Server-Side (Backend)
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT (JSON Web Token)
- Stripe API (for payments)
- ImageBB API (for image uploads)
## 🏗️ Installation & Setup
# Follow these steps to set up the project locally:

# 1️⃣ Clone the Repositories
- bash
- Copy
- Edit
- git clone <CLIENT_REPO_URL>
- git clone <SERVER_REPO_URL>
# 2️⃣ Install Dependencies
- Navigate into both the client and server directories and install dependencies:

- bash
- Copy
- Edit
# For client-side
- cd client
- npm install

# For server-side
- cd server
- npm install
# 3️⃣ Set Up Environment Variables
* Create a .env file in the server directory and add the following:

- env
- Copy
- Edit
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
STRIPE_SECRET_KEY=your_stripe_secret_key
For the client, set up Firebase credentials in an .env file:

env
Copy
Edit
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
# 4️⃣ Run the Server & Client
- bash
- Copy
- Edit
# Start the backend server
- cd server
- npm run dev  

# Start the frontend client
- cd client
- npm start  
## 🔗 Live Links & Resources
1. Frontend Live Site: https://coin-crafter-client.web.app/
2. Client GitHub Repo: https://github.com/monzila-akter/trust-ease-client
3. Server GitHub Repo: https://github.com/monzila-akter/coin-crafter-server
4. Admin Login Credentials:
- Email: admin45@gmail.com
- Password: Admin45#




# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

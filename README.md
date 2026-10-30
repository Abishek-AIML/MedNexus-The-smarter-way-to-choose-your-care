# 🏥 MedNexus - Hospital & Laboratory Management System

A comprehensive healthcare management platform built with MERN stack.

## 🌐 Live Demo

🚀 Frontend: https://mednexus-hospital-management.vercel.app  
🔗 Backend API: https://mednexus-hospital-management.onrender.com

## 🌟 Features

- 🔍 Search hospitals & diagnostic labs by location
- 📍 Location-based filtering with distance calculation
- ❤️ Save favorites
- 📅 Book appointments online
- 🏥 Facility management for owners
- 👨‍⚕️ Doctor/technician management
- 🔐 Admin panel with complete control

## 🛠️ Tech Stack

**Frontend:** React 18, Tailwind CSS, Vite, React Router  
**Backend:** Node.js, Express, MongoDB, Mongoose, JWT

## 📦 Installation

### Prerequisites
- Node.js v18+
- MongoDB v6+

### Setup
```bash
git clone https://github.com/iamankrr/mednexus-hospital-management.git
cd mednexus-hospital-management

cd backend
npm install
# Copy .env.example to .env, then set MONGO_URI and a private JWT_SECRET.
npm run dev

cd ../frontend
npm install
# Optionally copy .env.example to .env to set VITE_API_URL.
npm run dev
```

The backend defaults to port `3000`; set `PORT` in `backend/.env` to use another port. The frontend uses the Vite `/api` proxy locally and defaults to the backend on port `3000`. If you change the backend port, set `VITE_API_URL` in `frontend/.env` to the backend origin (for example, `http://localhost:5000`).

Do not run `backend/seedData.js` against an existing database: it deletes all users, hospitals, and laboratories before inserting sample data.

🔑 Default Credentials (For Demo Only)

Admin: admin@hospital.com  
Owner: owner@hospital.com  
User: aman@example.com
  
⚠️ Note: This repository does not include shared default passwords. Create accounts through the application or use a disposable database when testing seed data.
## 👨‍💻 Developer

**Aman Kumar**  
GitHub: [@iamankrr](https://github.com/iamankrr)

---

Made with ❤️ for better healthcare access

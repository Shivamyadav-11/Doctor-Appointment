# 🏥 Doctor Appointment Booking System

A full-stack **Doctor Appointment Booking System** built using the **MERN Stack**. The platform allows users to browse doctors, book appointments, manage their bookings, and make online payments.

The project also includes a separate **Admin Dashboard** for managing doctors, users, and appointments.

---

# 🚀 Live Demo

| Service | Live URL |
|---|---|
| 🌐 User Frontend | [Visit Frontend](https://doctorappointmentfrontend-eight.vercel.app/) |
| 🛠️ Admin Panel | [Visit Admin Panel](https://doctorappointmentadmin-five.vercel.app/) |
| ⚙️ Backend API | [Visit Backend API](https://doctor-appointment-1-55m1.onrender.com) |

> **Note:** The backend is deployed on Render's free tier, so the first request after inactivity may take some time to respond.

---

# 📌 Features

## 👤 User Features

- 🔐 User registration and login
- 🩺 Browse available doctors
- 🔎 View doctors by specialization
- 👨‍⚕️ View detailed doctor profiles
- 📅 Book appointments with doctors
- 🕒 Select available appointment slots
- 📋 View booked appointments
- ❌ Cancel appointments
- 👤 Update user profile
- 💳 Online payment integration using Razorpay
- 🔔 User notifications using React Toastify
- 📱 Responsive user interface

## 🛠️ Admin Features

- 🔐 Secure admin login
- 📊 Admin dashboard
- 👨‍⚕️ Add new doctors
- ✏️ Manage doctor information
- 👥 View registered users
- 📅 View and manage appointments
- 💰 Monitor appointment and payment information
- 🖼️ Upload and manage doctor images
- 🔔 Notifications and alerts using React Toastify

---

# ⚙️ How It Works

The application is divided into three main parts:

~~~text
                    ┌─────────────────────┐
                    │    User Frontend    │
                    │       React         │
                    └──────────┬──────────┘
                               │
                               │ API Requests
                               ▼
                    ┌─────────────────────┐
                    │      Backend        │
                    │ Node.js + Express   │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │       MongoDB       │
                    │      Database       │
                    └─────────────────────┘


                    ┌─────────────────────┐
                    │     Admin Panel     │
                    │       React         │
                    └──────────┬──────────┘
                               │
                               │ API Requests
                               ▼
                            Backend
~~~

---

## 👤 User Flow

1. The user opens the frontend application.
2. The user can browse available doctors.
3. The user selects a doctor.
4. The user chooses an available appointment slot.
5. The appointment request is sent to the backend.
6. The backend stores the appointment information in the database.
7. The user can view and manage their appointments.
8. The user can make online payments using Razorpay.

## 🛠️ Admin Flow

1. The admin logs into the admin panel.
2. The admin dashboard communicates with the backend API.
3. The admin can add and manage doctors.
4. The admin can view and manage appointments.
5. The admin can monitor users and appointment-related data.

---

# 🛠️ Tech Stack

## Frontend

- React.js
- Vite
- JavaScript
- CSS / Tailwind CSS
- React Router DOM
- React Toastify
- Axios

## Admin Panel

- React.js
- Vite
- Axios
- React Router DOM
- React Toastify

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

## Other Services

- Razorpay – Online payment integration
- Cloudinary – Image storage and management
- Render – Backend deployment
- Vercel – Frontend and Admin deployment

---

# 📂 Project Structure

~~~text
Doctor-Appointment/
│
├── Frontend/
│   ├── public/
│   ├── src/
│   ├── components/
│   ├── pages/
│   ├── context/
│   ├── package.json
│   └── vite.config.js
│
├── admin/
│   ├── src/
│   ├── components/
│   ├── pages/
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── config/
│   ├── package.json
│   └── server.js
│
├── .gitignore
└── README.md
~~~

---

# 💻 Run Locally

## 1. Clone the Repository

~~~bash
git clone https://github.com/Shivamyadav-11/Doctor-Appointment.git
~~~

Move into the project directory:

~~~bash
cd Doctor-Appointment
~~~

---

# 🔧 Backend Setup

Navigate to the backend folder:

~~~bash
cd backend
~~~

Install dependencies:

~~~bash
npm install
~~~

Create a `.env` file and add the required environment variables:

~~~env
PORT=4000

MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret

RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
~~~

Start the backend server:

~~~bash
npm run server
~~~

---

# 🌐 Frontend Setup

Open a new terminal and navigate to the frontend folder:

~~~bash
cd Frontend
~~~

Install dependencies:

~~~bash
npm install
~~~

Create a `.env` file:

~~~env
VITE_BACKEND_URL=http://localhost:4000
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
~~~

Start the frontend:

~~~bash
npm run dev
~~~

---

# 🛠️ Admin Setup

Open another terminal and navigate to the admin folder:

~~~bash
cd admin
~~~

Install dependencies:

~~~bash
npm install
~~~

Create a `.env` file:

~~~env
VITE_BACKEND_URL=http://localhost:4000
~~~

Start the admin panel:

~~~bash
npm run dev
~~~

---

# 🌍 Production Environment Variables

## Frontend

~~~env
VITE_BACKEND_URL=https://doctor-appointment-1-55m1.onrender.com
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
~~~

## Admin

~~~env
VITE_BACKEND_URL=https://doctor-appointment-1-55m1.onrender.com
~~~

> ⚠️ Never upload secret environment variables such as database passwords, JWT secrets, Razorpay secret keys, or Cloudinary secrets to GitHub.

---

# 👨‍💻 Author

**Shivam Yadav**

GitHub: [@Shivamyadav-11](https://github.com/Shivamyadav-11)

---

# ⭐ Support

If you like this project, consider giving the repository a **star ⭐**.

---

### Made with ❤️ using the MERN Stack

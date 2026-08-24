# 🏥 Doctor Appointment Booking System

A full-stack **Doctor Appointment Booking System** built using the **MERN Stack**. The platform allows users to browse doctors, book appointments, manage their bookings, and make online payments.

The project also includes a separate **Admin Dashboard** for managing doctors, users, and appointments.

---

# 🚀 Live Demo

| Service | Live URL |
|---|---|
| 🌐 User Frontend | https://doctorappointmentfrontend-eight.vercel.app/ |
| 🛠️ Admin Panel | https://doctorappointmentadmin-five.vercel.app/ |
| ⚙️ Backend API | https://doctor-appointment-1-55m1.onrender.com |

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

```text
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

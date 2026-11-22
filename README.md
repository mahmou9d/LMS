# 🎓 E-Learning Management System (LMS) - Full Stack Platform

A modern, production-grade, full-stack **Learning Management System (LMS)** built with **Next.js 16**, **Node.js (Express & TypeScript)**, **MongoDB**, and **Redis**. Designed to deliver high-performance video streaming with DRM protection, seamless course purchases with Stripe, real-time push notifications via Socket.io, and a comprehensive Admin management dashboard with analytics.

---

## 🌟 Key Features

### 👨‍🎓 Student Experience
- **Browse & Search:** Categorized course catalog, keyword search, course details, syllabus, and video previews.
- **Secure Video Player:** Encrypted video streaming powered by **VdoCipher DRM** to prevent screen recording and piracy.
- **Seamless Checkout:** Real-time card payments via **Stripe Elements** with instant course enrollment upon confirmation.
- **Course Player & Progress:** Multi-section course curriculum, lectures, video progress tracking, and student Q&A.
- **Reviews & Ratings:** Verified students can review courses and rate instructors.
- **Authentication:** Email/Password with OTP verification, plus Social Login (**Google** & **GitHub** via NextAuth).
- **User Profile:** Manage profile picture (Cloudinary), update personal info, track enrolled courses, and change password.
- **Theme Support:** Modern Dark Mode & Light Mode toggle powered by `next-themes`.

### 🛡️ Admin & Instructor Panel
- **Course Management:** Multi-step course builder (Metadata, Thumbnail upload, Curriculum, Video URLs/VdoCipher, Pricing & Discounts).
- **Interactive Analytics:** Visual performance charts with **Recharts** (Course sales, User acquisition trends, Order revenue).
- **User & Role Management:** View all users, assign Admin/User roles, manage permissions, or delete accounts with **MUI DataGrid**.
- **Financial Invoices:** Comprehensive invoice table tracking transactions and order statuses.
- **Real-Time Notifications:** Instant notifications on new purchases and user inquiries powered by **Socket.io**.
- **Dynamic CMS / Layout Customization:** Edit Homepage Hero banner, Course Categories, and FAQ sections directly from the dashboard.

---

## 🏗️ Architecture & Monorepo Structure

```
LMS/
├── client/              # Frontend Application (Next.js 16, React 19, Tailwind CSS)
│   ├── app/             # App Router pages, layouts, and route handlers
│   ├── components/      # UI components (Admin, Auth, Course, Profile, Layout)
│   ├── redux/           # Redux Toolkit & RTK Query API slices
│   └── public/          # Static assets, icons, and fonts
│
├── back/                # Backend API Server (Node.js, Express, TypeScript)
│   ├── controllers/     # Request handlers (auth, course, order, analytics, layout)
│   ├── models/          # MongoDB Mongoose schemas
│   ├── routes/          # RESTful API route definitions
│   ├── services/        # Business logic & DB queries
│   ├── middleware/      # Auth guard, role check, error handling, rate limiting
│   ├── mails/           # EJS responsive email templates
│   ├── socketServer.ts  # Socket.io real-time server
│   └── server.ts        # Server entry point & DB connection
│
└── README.md            # Root Project Documentation (This file)
```

---

## 💻 Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Material UI (MUI DataGrid), Emotion |
| **State & API** | Redux Toolkit (RTK Query), NextAuth, Axios |
| **Backend** | Node.js, Express, TypeScript, ts-node-dev |
| **Database & Cache** | MongoDB (Mongoose), Redis (ioredis for sessions & caching) |
| **Security & Media** | JWT (Access & Refresh tokens), bcryptjs, Cloudinary, VdoCipher (DRM Video) |
| **Payments** | Stripe API & Stripe React Elements |
| **Real-time** | Socket.io & Socket.io-client |
| **Emails** | Nodemailer & EJS Templates |

---

## 🚀 Quick Start Guide

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [MongoDB](https://www.mongodb.com/) (Local or MongoDB Atlas)
- [Redis](https://redis.io/) (Local or Upstash Cloud Redis)
- Accounts for: Cloudinary, Stripe, and Nodemailer (SMTP)

---

### 1. Clone & Setup Repository

```bash
git clone <repository-url>
cd LMS
```

---

### 2. Backend Setup

```bash
cd back

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env # or create .env using the template below

# (Optional) Seed initial data
npm run seed

# Run development server
npm run dev
```

> Backend will start running on: `http://localhost:8000`

---

### 3. Frontend Setup

Open a new terminal:

```bash
cd client

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env # or create .env using the template below

# Run development server
npm run dev
```

> Frontend will start running on: `http://localhost:3000`

---

## 🔑 Environment Variables Overview

### Backend (`back/.env`)
```env
PORT=8000
ORIGIN=http://localhost:3000
NODE_ENV=development

# Database & Cache
DB_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/lms?retryWrites=true&w=majority
REDIS_URL=redis://default:<password>@<host>:<port>

# Cloudinary
CLOUD_NAME=your_cloud_name
CLOUD_API_KEY=your_api_key
CLOUD_SECRET_KEY=your_secret_key

# JWT Secrets
ACTIVATION_SECRET=your_activation_secret
ACCESS_TOKEN=your_access_token_secret
REFRESH_TOKEN=your_refresh_token_secret
ACCESS_TOKEN_EXPIRE=5
REFRESH_TOKEN_EXPIRE=3

# SMTP (Email)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SERVICE=gmail
SMTP_EMAIL=your_email@gmail.com
SMTP_PASSWORD=your_app_password

# Video Streaming & Payment
VADOCIPHER_API_SECRET=your_vdocipher_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

### Frontend (`client/.env`)
```env
NEXT_PUBLIC_SERVER_URL=http://localhost:8000/api/v1/
NEXT_PUBLIC_SOCKET_SERVER_URL=http://localhost:8000/

# NextAuth & Social Login
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret
SECRET=your_nextauth_secret

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

GITHUB_ID=your_github_client_id
GITHUB_SECRET=your_github_client_secret

# VdoCipher Video Player
VADOCIPHER_API_SECRET=your_vdocipher_secret
```

---

## 📦 Available Scripts

### In `/back`:
- `npm run dev`: Starts Express in development mode with `ts-node-dev` and hot reload.
- `npm run build`: Compiles TypeScript to `dist/`.
- `npm start`: Runs the compiled production code (`dist/server.js`).
- `npm run seed`: Seeds demo database entries.

### In `/client`:
- `npm run dev`: Starts Next.js development server with custom memory allocation.
- `npm run build`: Builds the production bundle with Next.js.
- `npm start`: Runs the production server.
- `npm run lint`: Runs ESLint checks.

---

## 📄 License
This project is licensed under the [ISC License](LICENSE).


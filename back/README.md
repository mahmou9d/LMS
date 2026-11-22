# 🛠️ LMS Backend API Server

High-performance, secure backend RESTful API server for the **Learning Management System (LMS)** platform. Built with **Node.js**, **Express**, and **TypeScript**, powered by **MongoDB** for persistent storage, **Redis** for session management and caching, **Socket.io** for real-time notifications, and **Stripe** for payment processing.

---

## 🚀 Core Features

- **Authentication & Authorization:**
  - JWT-based authentication with Access and Refresh tokens stored in HTTP-Only cookies.
  - Email verification with OTP codes sent via Nodemailer & EJS responsive templates.
  - Social OAuth authentication handler (Google & GitHub).
  - Role-based Access Control (RBAC) separating regular Users from Administrators.
- **Session & Caching Layer:**
  - Redis integration via `ioredis` for fast session lookup and caching user data.
- **Media & DRM Video Streaming:**
  - Cloudinary integration for course thumbnail and user avatar uploads.
  - VdoCipher API integration for secure, encrypted OTP-authenticated video streaming (DRM protected).
- **Payment Processing:**
  - Stripe integration with checkout intent generation, currency management, and purchase verification.
- **Order & Invoice Processing:**
  - Instant enrollment upon successful payment.
  - Automatic email notifications with formatted order receipts.
- **Real-Time Communication:**
  - WebSockets via `socket.io` for live admin notifications on new course purchases and inquiries.
- **Security & Reliability:**
  - IP Rate Limiting via `express-rate-limit`.
  - CORS security whitelist.
  - Custom error handling middleware and async error wrapper (`CatchAsyncError`).
  - Automated cron jobs via `node-cron` for periodic notification cleanup.

---

## 📁 Directory Structure

```
back/
├── @types/             # Custom TypeScript type declarations (e.g. express Request user)
├── controllers/        # Request controllers handling business logic
│   ├── analytics.controller.ts    # User, course, and order growth analytics
│   ├── course.controller.ts       # CRUD courses, Q&A, reviews, video OTP
│   ├── layout.controller.ts       # CMS layout (Hero, FAQ, Categories)
│   ├── notification.controller.ts # Real-time notification updates
│   ├── order.controller.ts        # Stripe payment intents and orders
│   └── user.controller.ts         # Registration, OTP, login, JWT refresh, profile
├── mails/              # EJS HTML email templates
│   ├── activation-mail.ejs
│   ├── order-confirmation.ejs
│   └── question-reply.ejs
├── middleware/         # Express middlewares
│   ├── auth.ts         # isAuthenticated and authorizeRoles guards
│   ├── catchAsyncErrors.ts
│   └── error.ts        # Global ErrorHandler middleware
├── models/             # Mongoose schemas
│   ├── course.model.ts
│   ├── layout.model.ts
│   ├── notification.model.ts
│   ├── order.model.ts
│   └── user.model.ts
├── routes/             # API Route declarations
│   ├── analytics.route.ts
│   ├── course.route.ts
│   ├── layout.route.ts
│   ├── notification.route.ts
│   ├── order.route.ts
│   └── user.route.ts
├── services/           # Reusable data access services (course, order, user)
├── utils/              # Helper utilities (db connection, redis, jwt, sendMail, cloudinary)
├── app.ts              # Express application configuration & middleware
├── server.ts           # Server bootstrap, MongoDB connection & Socket.io init
├── socketServer.ts     # Socket.io connection handlers
├── seed.ts             # Database seeding script
└── tsconfig.json       # TypeScript configuration
```

---

## 🛠️ Tech Stack & Dependencies

- **Runtime & Language:** Node.js, TypeScript
- **Framework:** Express.js 4.x
- **Database:** MongoDB via Mongoose 9.x
- **Cache:** Redis via `ioredis`
- **Real-Time:** Socket.io
- **Auth & Security:** `jsonwebtoken`, `bcryptjs`, `cookie-parser`, `express-rate-limit`, `cors`
- **Cloud & Media:** Cloudinary 2.x, VdoCipher
- **Payments:** Stripe 22.x
- **Email:** Nodemailer & EJS

---

## ⚙️ Environment Variables Setup

Create a `.env` file in the root of the `/back` directory:

```env
# Server
PORT=8000
ORIGIN=http://localhost:3000
NODE_ENV=development

# Database & Cache
DB_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/lms?retryWrites=true&w=majority
REDIS_URL=redis://default:<password>@<host>:<port>

# Cloudinary
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_SECRET_KEY=your_cloudinary_api_secret

# JWT Secret Keys & Expiry
ACTIVATION_SECRET=your_activation_secret_key
ACCESS_TOKEN=your_jwt_access_token_secret
REFRESH_TOKEN=your_jwt_refresh_token_secret
ACCESS_TOKEN_EXPIRE=5
REFRESH_TOKEN_EXPIRE=3

# SMTP Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SERVICE=gmail
SMTP_EMAIL=your_email@gmail.com
SMTP_PASSWORD=your_google_app_password

# Video Streaming & Payment Gateways
VADOCIPHER_API_SECRET=your_vdocipher_api_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

---

## 🚦 Available Scripts

```bash
# Install dependencies
npm install

# Run server with live hot reload (ts-node-dev)
npm run dev

# Compile TypeScript to JavaScript (/dist folder)
npm run build

# Run production build
npm start

# Seed mock courses and data into the database
npm run seed
```

---

## 📡 API Endpoints Overview

Base URL: `http://localhost:8000/api/v1`

### 👤 User & Auth
- `POST /registration` — Register new user & dispatch OTP activation email
- `POST /activate-user` — Verify 4-digit OTP & create active account
- `POST /login` — Authenticate and receive access/refresh tokens
- `GET /logout` — Clear session cookies & revoke token
- `GET /refresh` — Refresh access token using refresh token
- `GET /me` — Get current logged-in user profile
- `POST /social-auth` — OAuth authentication (Google/GitHub)
- `PUT /update-user-info` — Update username and email
- `PUT /update-user-password` — Change password
- `PUT /update-user-avatar` — Upload avatar to Cloudinary
- `GET /get-users` — [Admin] List all registered users
- `PUT /update-user-role` — [Admin] Change user role (admin/user)
- `DELETE /delete-user/:id` — [Admin] Delete user account

### 📚 Courses
- `POST /create-course` — [Admin] Create a new course with video curriculum
- `PUT /edit-course/:id` — [Admin] Update existing course
- `GET /get-course/:id` — Get public course preview (without video links)
- `GET /get-courses` — Get all courses (public catalog)
- `GET /get-course-content/:id` — Get full course content with video URLs (purchased students only)
- `PUT /add-question` — Add a question inside a course lecture
- `PUT /add-answer` — Answer a question inside a course lecture
- `PUT /add-review/:id` — Post review and rating on a course
- `PUT /add-reply` — [Admin] Reply to a customer review
- `POST /getVideoOTP` — Generate VdoCipher OTP & playback info for secure video streaming
- `DELETE /delete-course/:id` — [Admin] Delete course

### 💳 Orders & Payments
- `GET /payment/stripepublishablekey` — Get Stripe publishable key
- `POST /payment` — Create Stripe payment intent
- `POST /create-order` — Create new course order after payment confirmation
- `GET /get-orders` — [Admin] List all orders and financial invoices

### 📊 Analytics & Layout (Admin)
- `GET /get-users-analytics` — [Admin] User growth analytics (last 12 months)
- `GET /get-courses-analytics` — [Admin] Course creation analytics (last 12 months)
- `GET /get-orders-analytics` — [Admin] Sales revenue & order analytics (last 12 months)
- `POST /create-layout` — [Admin] Initialize layout (Hero / FAQ / Categories)
- `PUT /edit-layout` — [Admin] Update layout content
- `GET /get-layout/:type` — Fetch public layout content by type (`Banner`, `FAQ`, `Categories`)

---

## 🐳 Docker Deployment

A `Dockerfile` is provided for containerized deployment:

```bash
# Build the Docker image
docker build -t lms-backend .

# Run container
docker run -p 8000:8000 --env-file .env lms-backend
```

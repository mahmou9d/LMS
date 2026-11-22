# 💻 LMS Client Application

A modern, responsive, full-featured web client for the **E-Learning Management System (LMS)** platform. Built with **Next.js 16** (App Router), **React 19**, **TypeScript**, **Tailwind CSS v4**, and **Material UI (MUI)**.

---

## ✨ Features

### 🎓 For Students
- **Course Catalog & Search:** Explore all available courses with search, filtering by categories, and preview details.
- **Detailed Course Page:** View course title, description, price, prerequisites, what you'll learn, curriculum syllabus, and verified student reviews.
- **Secure Video Player:** Video streaming with player controls and secure playback (including VdoCipher DRM).
- **Interactive Course Learning:** Lecture checklist, video player, Q&A discussions under each video, and verified review posting.
- **Stripe Card Checkout:** Secure in-app payments with Stripe Elements (Visa, Mastercard, etc.).
- **Authentication:**
  - Standard Email & Password with OTP 4-digit code verification.
  - Social Sign-in via **Google** and **GitHub** using **NextAuth**.
- **Student Profile:**
  - View enrolled courses.
  - Change avatar picture (direct upload).
  - Update user name and email.
  - Change password.
- **Theming:** Full Dark & Light mode toggle with persistent state via `next-themes`.
- **Live Notifications:** Real-time updates delivered through `socket.io-client`.

---

### 🛡️ For Administrators
- **Admin Dashboard Overview:** Quick status widgets, revenue summary, user acquisition stats, and live order alerts.
- **Multi-Step Course Builder:**
  1. **Course Information:** Title, description, price, estimated price, tags, level, demo video URL, and thumbnail.
  2. **Course Data:** Benefits, prerequisites, and multi-section curriculum with video URLs and descriptions.
  3. **Course Content:** Detailed video lectures, resources, and attachments.
  4. **Course Preview & Publishing:** Live preview before final submission.
- **Course Management:** View all courses with edit, preview, and delete modals.
- **User & Team Management:**
  - Comprehensive user list using **MUI DataGrid**.
  - Edit user roles (Promote to Admin / Demote to User).
  - Delete user accounts.
- **Financial Invoices:** Real-time table of all completed purchases and customer order history.
- **Visual Analytics:**
  - **User Analytics:** 12-month registration growth bar/line charts using **Recharts**.
  - **Course Analytics:** 12-month course creation and enrollment trends.
  - **Order Analytics:** Monthly revenue and sales charts.
- **CMS & Customization:**
  - Edit Homepage Hero section (headline, subtitle, hero image).
  - Manage FAQ questions and answers.
  - Manage course categories.

---

## 📁 Directory Structure

```
client/
├── app/                      # Next.js 16 App Router
│   ├── about/                # About Us page
│   ├── admin/                # Admin Panel pages
│   │   ├── categories/       # Manage categories
│   │   ├── courses/          # All courses table
│   │   ├── courses-analytics/# Course analytics charts
│   │   ├── create-course/    # Multi-step course creation
│   │   ├── edit-course/[id]/ # Edit course page
│   │   ├── faq/              # Manage FAQ
│   │   ├── hero/             # Manage Hero section
│   │   ├── Invoices/         # Orders & invoices table
│   │   ├── orders-analytics/ # Orders & revenue analytics
│   │   ├── team/             # Admin team members
│   │   ├── users/            # All users management
│   │   └── users-analytics/  # User registration analytics
│   ├── course/               # Course preview details
│   ├── course-access/        # Enrolled student video player & syllabus
│   ├── courses/              # Full courses catalog page
│   ├── faq/                  # Public FAQ page
│   ├── policy/               # Privacy policy & terms
│   ├── profile/              # User profile page
│   ├── Providers.tsx         # Redux, NextAuth, ThemeProvider wrappers
│   ├── globals.css           # Global Tailwind CSS v4 styling
│   ├── layout.tsx            # Root application layout
│   └── page.tsx              # Homepage
│
├── components/               # Modular React components
│   ├── Admin/                # Admin widgets, sidebar, analytics, tables
│   ├── auth/                 # Login, SignUp, OTP Verification modals
│   ├── Course/               # Course card, player, details, reviews, Q&A
│   ├── Customization/        # Hero, FAQ, and Categories live editors
│   ├── Loader/               # Loading spinners & suspense indicators
│   ├── Payment/              # Stripe checkout form & payment modal
│   ├── Profile/              # Profile sidebar, security, enrolled courses
│   ├── Review/               # Customer review cards
│   ├── route/                # Hero, FAQ, Course sections for home
│   ├── Footer.tsx            # Main footer
│   └── Header.tsx            # Navbar with search, theme switch, auth modal
│
├── hooks/                    # Custom React hooks (useProtected, adminProtected)
├── redux/                    # Redux Toolkit store & RTK Query slices
│   ├── features/             # authSlice, apiSlice, coursesApi, ordersApi...
│   └── store.ts              # Central store configuration
├── types/                    # TypeScript interfaces & definitions
├── utills/                   # Custom utility functions & navigation items
├── package.json              # Client scripts & dependencies
└── tsconfig.json             # TypeScript configuration
```

---

## 🛠️ Tech Stack & Libraries

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Library:** [React 19](https://react.dev/)
- **Language:** TypeScript
- **State Management:** [Redux Toolkit](https://redux-toolkit.js.org/) & RTK Query
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components & Icons:**
  - [Material UI (MUI)](https://mui.com/) & `@mui/x-data-grid`
  - [React Icons](https://react-icons.github.io/react-icons/)
  - `@emotion/react` & `@emotion/styled`
- **Charts:** [Recharts](https://recharts.org/)
- **Forms & Validation:** [Formik](https://formik.org/) & [Yup](https://github.com/jquense/yup)
- **Authentication:** [NextAuth.js](https://next-auth.js.org/) (Google & GitHub providers)
- **Payments:** [Stripe Elements](https://stripe.com/docs/stripe-js)
- **Notifications:** [React Hot Toast](https://react-hot-toast.com/) & [Socket.io Client](https://socket.io/)
- **Themes:** `next-themes` (Dark/Light mode)

---

## ⚙️ Environment Variables Setup

Create a `.env` or `.env.local` file inside the `/client` directory:

```env
# Backend API & WebSocket URLs
NEXT_PUBLIC_SERVER_URL=http://localhost:8000/api/v1/
NEXT_PUBLIC_SOCKET_SERVER_URL=http://localhost:8000/

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret
SECRET=your_nextauth_secret

# Social OAuth Credentials
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

GITHUB_ID=your_github_client_id
GITHUB_SECRET=your_github_client_secret

# Video Player / DRM
VADOCIPHER_API_SECRET=your_vdocipher_secret
```

---

## 🚦 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to explore the application.

### 3. Build for Production
```bash
npm run build
npm start
```

### 4. Code Quality & Linting
```bash
npm run lint
```

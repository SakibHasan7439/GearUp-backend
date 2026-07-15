# GearUp — Backend

GearUp is a backend service for a **sports & outdoor equipment rental platform**, built with a modern Node.js/TypeScript stack. It handles user authentication, equipment listings, rental bookings, and secure payments via Stripe.

## ✨ Features

- 🔐 **Authentication & Authorization** — JWT-based auth with role-based access control (RBAC)
- 🏕️ **Equipment Management** — CRUD APIs for listing and managing rentable gear
- 📅 **Rental Bookings** — Create, track, and manage equipment rental orders
- 💳 **Payments** — Stripe Checkout integration for secure, hosted payment flows
- 🗄️ **Relational Data Layer** — Prisma ORM with PostgreSQL for type-safe database access
- ☁️ **Cloud Deployment** — Deployed on Vercel with a Neon PostgreSQL database

## 🛠️ Tech Stack

| Layer          | Technology                     |
|----------------|---------------------------------|
| Runtime        | Node.js                        |
| Language       | TypeScript                     |
| Framework      | Express.js                     |
| ORM            | Prisma                         |
| Database       | PostgreSQL (Neon)              |
| Payments       | Stripe Checkout                |
| Auth           | JWT                            |
| Deployment     | Vercel                         |

## 📁 Project Structure

```
gearup-backend/
├── prisma/
│   ├── schema.prisma      # Database schema & models
│   └── migrations/        # Prisma migration history
├── src/
│   ├── controllers/       # Request handlers
│   ├── routes/            # Express route definitions
│   ├── services/          # Business logic layer
│   ├── middlewares/       # Auth, error handling, etc.
│   ├── utils/             # Helper functions
│   └── index.ts           # App entry point
├── .env.example
├── package.json
└── tsconfig.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- A PostgreSQL database (e.g. [Neon](https://neon.tech))
- A Stripe account for payment testing

### Installation

```bash
git clone https://github.com/SakibHasan7439/GearUp-backend.git
cd gearup-backend
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
# Pooled connection (used by the app at runtime)
DATABASE_URL="postgresql://<user>:<password>@<host>/<db>?sslmode=require&pgbouncer=true"

# Direct connection (used by Prisma for migrations)
DIRECT_URL="postgresql://<user>:<password>@<host>/<db>?sslmode=require"

JWT_SECRET="your_jwt_secret"
STRIPE_SECRET_KEY="your_stripe_secret_key"
STRIPE_WEBHOOK_SECRET="your_stripe_webhook_secret"
PORT=5000
```

> ⚠️ **Note:** When using Neon (or any pooled Postgres provider), keep `DATABASE_URL` and `DIRECT_URL` separate. Prisma migrations require a **direct** (non-pooled) connection, while the app itself should use the **pooled** connection at runtime.

### Database Setup

```bash
npx prisma generate
npx prisma migrate dev
```

### Run the Server

```bash
npm run dev
```

The API will be available at `http://localhost:5000`.

## 🧩 API Overview

The API is organized by resource, with role-based access control (`CUSTOMER`, `PROVIDER`, `ADMIN`) enforced on protected routes.

| Resource      | Base Path          | Summary                                                        |
|---------------|--------------------|------------------------------------------------------------------|
| **Auth**      | `/api/auth`        | Register, login, and refresh JWT tokens                         |
| **Categories**| `/api/categories`  | Public browsing, admin-only create/update/delete                |
| **Gear**      | `/api/gear`         | Public listing/details, provider CRUD on their own gear, admin overview |
| **Rentals**   | `/api/rentals`      | Customers create & view bookings; admins/providers view relevant orders |
| **Payments**  | `/api/payments`     | Stripe Checkout session creation, webhook handling, payment history |
| **Provider**  | `/api/provider`     | Provider dashboard for managing incoming rental orders           |
| **Reviews**   | `/api/review`       | Customers can leave reviews on gear items                        |

*(Full route-level detail lives in the codebase — this is a high-level summary for onboarding.)*

## 🌐 Deployment

This project is deployed on **Vercel**. Make sure all environment variables above are configured in the Vercel project settings, and that `DIRECT_URL` is available for running migrations during build/deploy.

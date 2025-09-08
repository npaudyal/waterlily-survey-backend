# Health Survey App - Backend API

A robust Express.js backend API for the Health Survey application, built with TypeScript, Prisma ORM, and PostgreSQL.

## 🚀 Features

- **User Authentication**: Secure JWT-based authentication with refresh tokens
- **Survey Management**: Complete CRUD operations for health surveys
- **Submission Tracking**: Store and retrieve user survey submissions
- **Security**: Implements best practices with Helmet, CORS, and password hashing
- **Type Safety**: Full TypeScript implementation with strict typing
- **Database**: PostgreSQL with Prisma ORM for type-safe database access

## 📋 Prerequisites

- Node.js (v18+ recommended)
- PostgreSQL database
- npm or yarn package manager

## 🛠️ Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd waterlily-survey-app/backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/survey_db"

# JWT Secrets
JWT_SECRET="your-super-secret-jwt-key"
REFRESH_TOKEN_SECRET="your-super-secret-refresh-token-key"

# Frontend URL (for CORS)
NEXT_PUBLIC_URL="http://localhost:3001"

# Server Port
PORT=3000
```

4. **Set up the database**
```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Seed the database (optional)
npm run seed
```

## 🏃‍♂️ Running the Application

### Development Mode
```bash
npm run dev
```
The server will start with hot-reloading enabled on `http://localhost:3000`

### Production Mode
```bash
# Build the application
npm run build

# Start the production server
npm start
```

## 📁 Project Structure

```
backend/
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── seed.ts            # Database seeding script
├── src/
│   ├── controllers/       # Route controllers
│   │   ├── authController.ts
│   │   └── surveyController.ts
│   ├── middleware/        # Express middleware
│   │   ├── auth.ts       # Authentication middleware
│   │   ├── errorHandler.ts
│   │   └── validation.ts # Request validation
│   ├── routes/           # API routes
│   │   ├── authRoutes.ts
│   │   ├── surveyRoutes.ts
│   │   └── index.ts
│   ├── services/         # Business logic
│   │   ├── authService.ts
│   │   └── surveyService.ts
│   ├── types/            # TypeScript type definitions
│   │   └── index.ts
│   ├── utils/            # Utility functions
│   │   ├── jwt.ts
│   │   └── validation.ts
│   └── server.ts         # Application entry point
├── dist/                 # Compiled JavaScript (generated)
├── .env                  # Environment variables
├── .gitignore
├── package.json
├── tsconfig.json         # TypeScript configuration
└── README.md
```

## 🔐 API Endpoints

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register a new user | No |
| POST | `/api/auth/login` | Login user | No |
| POST | `/api/auth/logout` | Logout user | No |
| POST | `/api/auth/refresh` | Refresh access token | No |
| GET | `/api/auth/validate` | Validate current token | Yes |
| GET | `/api/auth/profile` | Get user profile | Yes |

### Survey Management

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/survey/active` | Get active surveys | No |
| POST | `/api/survey/submit` | Submit survey response | Yes |
| GET | `/api/survey/submission` | Get user submissions | Yes |

## 🔒 Security Features

- **Password Security**: 
  - Minimum 8 characters
  - Requires uppercase, lowercase, numbers, and special characters
  - No spaces allowed
  - Prevents common weak patterns
  - Bcrypt hashing with salt rounds

- **JWT Authentication**:
  - Access tokens (15 minutes expiry)
  - Refresh tokens (7 days expiry)
  - HTTP-only cookies for token storage

- **Request Security**:
  - Helmet.js for security headers
  - CORS configuration for cross-origin requests
  - Input validation and sanitization
  - SQL injection prevention via Prisma ORM
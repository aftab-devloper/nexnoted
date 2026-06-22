NexNotes — AI-Powered Smart Notes Application
A production-ready full-stack notes application featuring JWT authentication, per-user data isolation, and AI-powered writing assistance built with modern technologies.

Next.js NestJS PostgreSQL TypeScript Groq CI

Overview
NexNotes is a full-stack web application that allows users to create, manage, and enhance their notes using AI. Every user gets their own private workspace — notes are completely isolated per account. The AI assistant (powered by Groq's LLaMA 3.3) can improve writing quality, summarize long notes, and suggest smart titles in real time.

Live Demo
Running locally — deployment coming soon.

Service	URL
Frontend	http://localhost:3000
Backend API	http://localhost:3001
Tech Stack
Frontend
Technology	Purpose
Next.js 15	React framework with App Router
TypeScript	Type safety
CSS Variables	Dark/Light theming system
LocalStorage	JWT token persistence
Backend
Technology	Purpose
NestJS 10	Modular Node.js framework
TypeScript	Type safety
Prisma ORM	Database schema & queries
PostgreSQL	Relational database
JWT + Passport	Authentication & authorization
bcryptjs	Password hashing
Groq SDK	AI model integration
DevOps
Technology	Purpose
GitHub Actions	CI/CD pipeline
Git	Version control (main + dev branches)
Architecture
┌─────────────────────────────────────────────────────────┐
│                     CLIENT (Browser)                     │
│              Next.js 15 — App Router (Port 3000)        │
│         /login   /register   /notes (protected)         │
└─────────────────────┬───────────────────────────────────┘
                      │ HTTP + JWT Bearer Token
                      │ CORS enabled
┌─────────────────────▼───────────────────────────────────┐
│                   SERVER (NestJS)                        │
│                    Port 3001                             │
│  ┌─────────────┐ ┌──────────────┐ ┌──────────────────┐ │
│  │ AuthModule  │ │ NotesModule  │ │    AiModule      │ │
│  │ /auth/*     │ │ /notes/*     │ │    /ai/*         │ │
│  │ Register    │ │ CRUD         │ │ Improve          │ │
│  │ Login       │ │ JWT Guard    │ │ Summarize        │ │
│  └─────────────┘ └──────────────┘ │ Title Suggest    │ │
│                                   └──────────────────┘ │
└─────────────────────┬───────────────────────────────────┘
                      │
        ┌─────────────┴─────────────┐
        │                           │
┌───────▼────────┐         ┌────────▼───────┐
│   PostgreSQL   │         │   Groq Cloud   │
│   (Port 5432)  │         │  LLaMA 3.3 70B │
│  Users + Notes │         │   AI Model     │
└────────────────┘         └────────────────┘
Features
Authentication System
Secure user registration with name, email, and password
Password hashing with bcryptjs (salt rounds: 10)
JWT token generation on login (7-day expiry)
Protected routes — unauthorized access redirects to login
Per-session token storage in localStorage
One-click logout with token cleanup
Notes Management
Create notes with custom title and content
View all personal notes in a clean card layout
Edit notes inline without page navigation
Delete notes with instant UI update
Notes are user-scoped — each user sees only their own notes
Empty state UI when no notes exist
AI Writing Assistant (Groq + LLaMA 3.3 70B)
Improve — Rewrites the note with better grammar, clarity, and structure
Summarize — Condenses long notes into 2–3 concise sentences
Title Suggest — Generates a smart, context-aware title from note content
Loading state on AI buttons during processing
AI result auto-saved directly to the note
UI/UX
Dark and Light theme toggle (persisted in localStorage)
Smooth CSS transitions between themes
CSS custom properties for consistent theming
Responsive layout (mobile, tablet, desktop)
Sticky navbar with branding and actions
Professional card-based note layout
Hover animations on note cards
Project Structure
my-portfolio/
│
├── .github/
│   └── workflows/
│       └── ci.yml                  # GitHub Actions CI pipeline
│
├── hello-backend/                  # NestJS Backend
│   ├── prisma/
│   │   ├── migrations/             # Database migrations
│   │   └── schema.prisma           # Database schema
│   ├── src/
│   │   ├── ai/
│   │   │   ├── ai.controller.ts    # AI endpoints
│   │   │   ├── ai.module.ts        # AI module config
│   │   │   └── ai.service.ts       # Groq API logic
│   │   ├── auth/
│   │   │   ├── auth.controller.ts  # Register + Login endpoints
│   │   │   ├── auth.module.ts      # Auth module config
│   │   │   ├── auth.service.ts     # JWT + bcrypt logic
│   │   │   └── jwt.strategy.ts     # Passport JWT strategy
│   │   ├── notes/
│   │   │   ├── notes.controller.ts # Notes CRUD endpoints
│   │   │   ├── notes.module.ts     # Notes module config
│   │   │   └── notes.service.ts    # Notes business logic
│   │   ├── prisma/
│   │   │   └── prisma.service.ts   # Prisma client wrapper
│   │   ├── app.module.ts           # Root module
│   │   └── main.ts                 # App entry point + CORS
│   └── package.json
│
├── hello-frontend/                 # Next.js Frontend
│   └── app/
│       ├── login/
│       │   └── page.tsx            # Login page
│       ├── notes/
│       │   └── page.tsx            # Notes dashboard (protected)
│       ├── register/
│       │   └── page.tsx            # Register page
│       ├── globals.css             # CSS variables + theme system
│       ├── layout.tsx              # Root layout
│       └── page.tsx                # Root redirect
│
└── README.md
Database Schema
model User {
  id       Int     @id @default(autoincrement())
  name     String?
  email    String  @unique
  password String
  notes    Note[]
}

model Note {
  id        Int      @id @default(autoincrement())
  title     String
  content   String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  userId    Int?
  user      User?    @relation(fields: [userId], references: [id])
}
API Reference
Auth Endpoints
Method	Endpoint	Body	Response
POST	/auth/register	{ name, email, password }	{ message, userId }
POST	/auth/login	{ email, password }	{ token }
Notes Endpoints (JWT Required)
Method	Endpoint	Body	Response
GET	/notes	—	Note[]
POST	/notes	{ title, content }	Note
PUT	/notes/:id	{ title, content }	Note
DELETE	/notes/:id	—	Note
AI Endpoints (JWT Required)
Method	Endpoint	Body	Response
POST	/ai/improve	{ content }	string
POST	/ai/summarize	{ content }	string
POST	/ai/title	{ content }	string
Local Setup
Prerequisites
Node.js v18+
PostgreSQL (running on port 5432)
Groq API Key — console.groq.com
1. Clone the Repository
git clone https://github.com/aftab-devloper/nexnoted.git
cd nexnoted
2. Backend Setup
cd hello-backend
npm install
Create .env file:

DATABASE_URL="postgresql://postgres:password@localhost:5432/nexnotes"
GROQ_API_KEY="gsk_your_groq_api_key_here"
Run migrations and start:

npx prisma migrate dev
npm run start:dev
3. Frontend Setup
cd hello-frontend
npm install
npm run dev
4. Open in Browser
http://localhost:3000
User Flow
New User:
  Visit / → Redirect to /login → Click "Register"
  → Fill form → Auto login → /notes dashboard

Returning User:
  Visit / → Redirect to /login
  → Enter credentials → /notes dashboard

Protected Access:
  Visit /notes without token → Redirect to /login

Logout:
  Click Logout → Token cleared → Redirect to /login
CI/CD Pipeline
GitHub Actions runs on every push to dev and main branches:

- Checkout code
- Setup Node.js 18
- Install dependencies (backend + frontend)
- Run build checks
Roadmap
This project serves as a practice ground for the Claude Mastery Roadmap. Future features planned:

[ ] MCP (Model Context Protocol) integration
[ ] RAG — semantic search across notes
[ ] Claude Agent SDK integration
[ ] A2A Protocol
[ ] React Native mobile app
[ ] Note categories and tags
[ ] Note search functionality
[ ] Docker Compose deployment
Key Learnings
Full-stack TypeScript application with NestJS + Next.js
JWT authentication with Passport.js strategy pattern
Prisma ORM with PostgreSQL migrations
Per-user data isolation using userId scoping
Groq API integration with LLaMA 3.3 70B model
CSS custom properties for scalable theming
GitHub Actions CI/CD pipeline setup
Modular NestJS architecture (Auth, Notes, AI modules)
Author
Aftab Solangi Full Stack Developer | AI Engineer

GitHub

Built as part of the Claude Mastery Roadmap — Lecture 14.8 (Mini Full Stack Project)

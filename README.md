📝 NexNotes — AI-Powered Smart Notes Application


A production-ready full-stack notes application featuring JWT authentication, per-user data isolation, and AI-powered writing assistance.




🚀 Tech Stack

Frontend

TechnologyPurposeNext.js 15React framework with App RouterTypeScriptType safetyCSS VariablesDark/Light theming systemLocalStorageJWT token persistence

Backend

TechnologyPurposeNestJS 10Modular Node.js frameworkTypeScriptType safetyPrisma ORMDatabase schema & queriesPostgreSQLRelational databaseJWT + PassportAuthentication & authorizationbcryptjsPassword hashingGroq SDKAI model integration

DevOps

TechnologyPurposeGitHub ActionsCI/CD pipelineGitVersion control (main + dev branches)


✨ Features

🔐 Authentication


Secure user registration with name, email, and password
Password hashing with bcryptjs (salt rounds: 10)
JWT token generation on login (7-day expiry)
Protected routes — unauthorized access redirects to login


📝 Notes Management


Create notes with custom title and content
View all personal notes in a clean card layout
Edit notes inline without page navigation
Delete notes with instant UI update
Notes are user-scoped — each user sees only their own notes


🤖 AI Writing Assistant (Groq + LLaMA 3.3 70B)


✨ Improve — Rewrites the note with better grammar, clarity, and structure
📝 Summarize — Condenses long notes into 2–3 concise sentences
💡 Title Suggest — Generates a smart, context-aware title from note content


🎨 UI/UX


Dark and Light theme toggle (persisted in localStorage)
Smooth CSS transitions between themes
Responsive layout (mobile, tablet, desktop)
Professional card-based note layout



📁 Project Structure

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
│   │   │   ├── auth.controller.ts  # Register + Login
│   │   │   ├── auth.service.ts     # JWT + bcrypt logic
│   │   │   └── jwt.strategy.ts     # Passport JWT strategy
│   │   ├── notes/
│   │   │   ├── notes.controller.ts # Notes CRUD endpoints
│   │   │   └── notes.service.ts    # Notes business logic
│   │   ├── prisma/
│   │   │   └── prisma.service.ts   # Prisma client wrapper
│   │   └── main.ts                 # App entry point + CORS
│   └── package.json
│
├── hello-frontend/                 # Next.js Frontend
│   └── app/
│       ├── login/page.tsx          # Login page
│       ├── notes/page.tsx          # Notes dashboard (protected)
│       ├── register/page.tsx       # Register page
│       ├── globals.css             # CSS variables + theme system
│       └── layout.tsx              # Root layout
│
└── README.md


🗄️ Database Schema

prismamodel User {
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


🔗 API Reference

Auth Endpoints

MethodEndpointBodyResponsePOST/auth/register{ name, email, password }{ message, userId }POST/auth/login{ email, password }{ token }

Notes Endpoints (JWT Required)

MethodEndpointBodyResponseGET/notes—Note[]POST/notes{ title, content }NotePUT/notes/:id{ title, content }NoteDELETE/notes/:id—Note

AI Endpoints (JWT Required)

MethodEndpointBodyResponsePOST/ai/improve{ content }stringPOST/ai/summarize{ content }stringPOST/ai/title{ content }string


⚙️ Local Setup

Prerequisites


Node.js v18+
PostgreSQL (running on port 5432)
Groq API Key — console.groq.com


1. Clone the Repository

bashgit clone https://github.com/aftab-devloper/nexnoted.git
cd nexnoted

2. Backend Setup

bashcd hello-backend
npm install

Create .env file:

envDATABASE_URL="postgresql://postgres:password@localhost:5432/nexnotes"
GROQ_API_KEY="gsk_your_groq_api_key_here"

Run migrations and start:

bashnpx prisma migrate dev
npm run start:dev

3. Frontend Setup

bashcd hello-frontend
npm install
npm run dev

4. Open in Browser

http://localhost:3000


🔄 CI/CD Pipeline

GitHub Actions runs on every push to dev and main branches:

yaml- Checkout code
- Setup Node.js 20
- Install dependencies (backend + frontend)
- Run build checks


🗺️ Roadmap


 MCP (Model Context Protocol) integration
 RAG — semantic search across notes
 Claude Agent SDK integration
 React Native mobile app
 Note categories and tags
 Docker Compose deployment



🧠 Key Learnings


Full-stack TypeScript application with NestJS + Next.js
JWT authentication with Passport.js strategy pattern
Prisma ORM with PostgreSQL migrations
Per-user data isolation using userId scoping
Groq API integration with LLaMA 3.3 70B model
GitHub Actions CI/CD pipeline setup
Modular NestJS architecture (Auth, Notes, AI modules)



👨‍💻 Author

Aftab Solangi — Full Stack Developer | AI Engineer

GitHub: @aftab-devloper



Built as part of the Claude Mastery Roadmap — Lecture 14.8 (Mini Full Stack Project)
# ChaLo AI - Complete Installation & Setup Guide

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Quick Start](#quick-start)
3. [Development Setup](#development-setup)
4. [Docker Setup](#docker-setup)
5. [Database Configuration](#database-configuration)
6. [Environment Variables](#environment-variables)
7. [Running the Application](#running-the-application)
8. [Building for Production](#building-for-production)
9. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Software
- **Node.js 18+** - [Download](https://nodejs.org/)
- **Python 3.9+** - [Download](https://www.python.org/)
- **PostgreSQL 14+** - [Download](https://www.postgresql.org/)
- **Redis 6+** - [Download](https://redis.io/)
- **Docker & Docker Compose** - [Download](https://www.docker.com/)
- **Git** - [Download](https://git-scm.com/)

### System Requirements
- **RAM**: Minimum 8GB (16GB recommended)
- **Storage**: Minimum 20GB free space
- **OS**: Windows, macOS, or Linux

---

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/jlordie/chalo-ai.git
cd chalo-ai
```

### 2. Setup with Docker (Recommended)

```bash
# Copy environment variables
cp .env.example .env.local

# Start all services
npm run docker:up

# Watch logs
npm run docker:logs
```

The application will be available at:
- **Web UI**: http://localhost:3000
- **API**: http://localhost:5000
- **Admin Panel**: http://localhost:3000/admin

---

## Development Setup

### Manual Installation (Without Docker)

#### 1. Install Root Dependencies

```bash
npm install
```

#### 2. Setup Backend

```bash
cd backend
npm install

# Create .env file
cp .env.example .env

# Configure database connection
# Edit .env with your PostgreSQL credentials
```

#### 3. Setup Frontend

```bash
cd ../frontend
npm install

# Create .env.local file
cp .env.example .env.local
```

#### 4. Setup Database

```bash
cd ../backend

# Run migrations
npm run db:migrate

# Seed initial data
npm run db:seed
```

#### 5. Start Development Servers

```bash
# From root directory
npm run dev

# Or run separately:
npm run backend:dev    # Terminal 1
npm run frontend:dev   # Terminal 2
```

---

## Docker Setup

### Using Docker Compose

```bash
# Build all services
npm run docker:build

# Start all services
npm run docker:up

# View logs
npm run docker:logs

# Stop all services
npm run docker:down

# Reset everything
npm run docker:down
docker volume prune
npm run docker:up
```

### Docker Compose Services

1. **PostgreSQL** (Port 5432)
   - Database for application data
   - Credentials: postgres/postgres

2. **Redis** (Port 6379)
   - Caching and session management
   - Password: redis_password

3. **Backend API** (Port 5000)
   - Express.js server
   - RESTful API endpoints

4. **Frontend** (Port 3000)
   - Next.js web application
   - Admin dashboard

5. **Nginx** (Ports 80, 443)
   - Reverse proxy
   - Load balancing

---

## Database Configuration

### PostgreSQL Setup

#### Windows/macOS/Linux

```bash
# Install PostgreSQL from https://www.postgresql.org/download/

# Create database
createdb chalo_ai

# Create user (optional)
createuser -P chalo_user
# Password: your_secure_password
```

#### Docker PostgreSQL

```bash
# Already configured in docker-compose.yml
# Credentials:
# - User: chalo
# - Password: chalopassword
# - Database: chalo_db
# - Port: 5432
```

### Run Migrations

```bash
cd backend

# Create new migration
npm run db:migrate:create

# Run pending migrations
npm run db:migrate

# Seed database with initial data
npm run db:seed

# Reset database (careful!)
npm run db:reset
```

---

## Environment Variables

### Create `.env.local` in Root

```bash
cp .env.example .env.local
```

### Essential Variables

```env
# Server
NODE_ENV=development
PORT=5000

# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=chalo_ai
DB_USER=postgres
DB_PASSWORD=postgres

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# JWT
JWT_SECRET=your-secret-key-here
JWT_EXPIRY=24h

# Super Admin
SUPER_ADMIN_EMAIL=jhonlordvisto101@gmail.com
SUPER_ADMIN_PASSWORD=secure_password

# API Keys
OPENAI_API_KEY=sk-your-key-here
HUGGINGFACE_API_KEY=your-key-here
```

---

## Running the Application

### Development Mode

```bash
# Start both frontend and backend
npm run dev

# OR run separately
npm run backend:dev   # Terminal 1
npm run frontend:dev  # Terminal 2
```

### Production Build

```bash
# Build all services
npm run build

# Start production server
npm start
```

### Access Points

| Service | URL | Username | Password |
|---------|-----|----------|----------|
| Web UI | http://localhost:3000 | - | - |
| Admin Panel | http://localhost:3000/admin | jhonlordvisto101@gmail.com | *setup during install* |
| API | http://localhost:5000 | - | - |
| API Docs | http://localhost:5000/api/docs | - | - |

---

## Building for Production

### Web Application

```bash
# Build Next.js frontend
npm run frontend:build

# Build Node.js backend
npm run backend:build
```

### Desktop Application (Electron)

```bash
# Build desktop app
npm run desktop:build

# Create installers
npm run desktop:package

# Output locations:
# - Windows: dist/*.exe, dist/*.msi
# - macOS: dist/*.dmg
# - Linux: dist/*.AppImage, dist/*.deb
```

### Mobile Application (Flutter)

```bash
# Android APK
npm run mobile:build

# iOS
cd mobile
flutter build ios
```

### Docker Production Build

```bash
# Build production images
docker-compose -f docker-compose.prod.yml build

# Run production containers
docker-compose -f docker-compose.prod.yml up -d
```

---

## Project Structure

```
chalo-ai/
├── frontend/                 # Next.js web application
│   ├── src/pages/           # Page components
│   ├── src/components/      # Reusable components
│   ├── src/services/        # API services
│   ├── public/              # Static files
│   └── package.json
│
├── backend/                  # Express.js API
│   ├── src/
│   │   ├── routes/          # API routes
│   │   ├── controllers/     # Request handlers
│   │   ├── middleware/      # Express middleware
│   │   ├── services/        # Business logic
│   │   └── index.ts         # Entry point
│   ├── database/
│   │   ├── migrations/      # DB migrations
│   │   └── seed/            # Initial data
│   └── package.json
│
├── mobile/                   # Flutter mobile app
│   ├── lib/
│   │   ├── screens/         # UI screens
│   │   ├── widgets/         # Custom widgets
│   │   └── services/        # API services
│   ├── android/
│   ├── ios/
│   └── pubspec.yaml
│
├── desktop/                  # Electron desktop app
│   ├── src/
│   ├── main.js              # Electron entry
│   └── package.json
│
├── docker-compose.yml        # Docker services
├── .env.example              # Environment template
└── package.json              # Root package file
```

---

## Troubleshooting

### Database Connection Issues

```bash
# Check PostgreSQL is running
psql -U postgres -c "SELECT version();"

# Reset database
npm run db:reset

# Check Redis
redis-cli ping
```

### Port Already in Use

```bash
# Find process using port (macOS/Linux)
lsof -i :3000
lsof -i :5000
lsof -i :5432

# Kill process (example for port 3000)
kill -9 <PID>

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Node Modules Issues

```bash
# Clear cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Or in Docker
npm run docker:down
docker volume prune
npm run docker:up
```

### Docker Issues

```bash
# View logs
docker-compose logs -f [service-name]

# Rebuild services
npm run docker:build --no-cache

# Check services status
docker-compose ps

# Access service shell
docker-compose exec [service-name] sh
```

### Environment Variables Not Loading

```bash
# Verify .env file exists
ls -la .env.local

# Check variables are set
echo $NODE_ENV

# Restart services
npm run docker:down
npm run docker:up
```

---

## Common Commands

```bash
# Development
npm run dev                  # Start all services
npm run backend:dev         # Start backend only
npm run frontend:dev        # Start frontend only

# Building
npm run build               # Build all
npm run build:backend       # Build backend only
npm run build:frontend      # Build frontend only

# Database
npm run db:migrate          # Run migrations
npm run db:seed             # Seed data
npm run db:reset            # Reset database

# Docker
npm run docker:up           # Start containers
npm run docker:down         # Stop containers
npm run docker:logs         # View logs
npm run docker:build        # Build images

# Testing
npm run test                # Run all tests
npm run test:coverage       # Coverage report
npm run lint                # Lint code
npm run format              # Format code
```

---

## Support & Documentation

- **Documentation**: [Wiki](https://github.com/jlordie/chalo-ai/wiki)
- **Issues**: [GitHub Issues](https://github.com/jlordie/chalo-ai/issues)
- **Email**: jhonlordvisto101@gmail.com

---

## License

ChaLo AI © 2024 by Jhon Lord Visto. All rights reserved.

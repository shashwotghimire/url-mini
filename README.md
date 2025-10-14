# URL Mini - Full Stack URL Shortener

A complete full-stack URL shortener application with analytics, built with modern technologies and best practices.

## 🚀 What Has Been Built

### Backend (Node.js/Bun + Express + Prisma)
- **RESTful API** with Express.js and TypeScript
- **PostgreSQL Database** with Prisma ORM
- **URL Shortening** using nanoid for unique short IDs
- **Analytics Tracking** with visit counts and history
- **Health Check** endpoint for monitoring
- **CORS Support** for frontend integration
- **Input Validation** for URL format checking

### Frontend (React + Vite + Tailwind CSS)
- **Modern React 19** application with TypeScript
- **Vite** for fast development and optimized builds
- **Tailwind CSS** for responsive, utility-first styling
- **shadcn/ui Components** for consistent, accessible UI
- **Two Main Features**:
  - URL Shortener with copy-to-clipboard
  - Analytics Dashboard with visit statistics
- **Responsive Design** that works on all devices
- **Error Handling** with user-friendly messages
- **Loading States** for better UX

## 📋 Features

### Core Functionality
- ✅ Create short URLs from long URLs
- ✅ Redirect short URLs to original URLs
- ✅ Track visit analytics and statistics
- ✅ Copy short URLs to clipboard
- ✅ View original URLs with external link preview
- ✅ Responsive design for mobile and desktop

### Technical Features
- ✅ TypeScript for type safety
- ✅ Modern React with hooks
- ✅ Tailwind CSS for styling
- ✅ shadcn/ui component library
- ✅ API client with error handling
- ✅ Environment variable configuration
- ✅ Production-ready build system

## 🛠 Tech Stack

### Backend
- **Runtime**: Bun (recommended) or Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Language**: TypeScript
- **ID Generation**: nanoid
- **Validation**: Custom URL validation

### Frontend
- **Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Language**: TypeScript
- **Package Manager**: Bun

## 📁 Project Structure

```
url-mini/
├── 📁 frontend/                    # React frontend application
│   ├── 📁 src/
│   │   ├── 📁 components/
│   │   │   ├── 📁 ui/             # shadcn/ui components
│   │   │   │   ├── button.tsx
│   │   │   │   ├── input.tsx
│   │   │   │   ├── card.tsx
│   │   │   │   └── alert.tsx
│   │   │   ├── UrlShortener.tsx   # Main URL shortening component
│   │   │   ├── Analytics.tsx      # Analytics dashboard
│   │   │   └── RedirectPage.tsx   # Short URL redirect page
│   │   ├── 📁 lib/
│   │   │   ├── api.ts             # API client
│   │   │   └── utils.ts           # Utility functions
│   │   ├── App.tsx                # Main app component
│   │   ├── main.tsx              # React entry point
│   │   └── index.css             # Global styles
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── tsconfig.json
├── 📁 prisma/                     # Database schema and migrations
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.sql
├── 📁 routes/                     # Express API routes
│   ├── url.route.ts              # URL shortening endpoints
│   └── health.route.ts           # Health check endpoint
├── 📄 index.ts                   # Main backend entry point
├── 📄 server.ts                  # Server startup
├── 📄 prisma.ts                  # Prisma client configuration
├── 📄 validation.ts              # URL validation utilities
├── 📄 package.json              # Backend dependencies
├── 📄 Dockerfile                # Docker configuration
└── 📄 README.md                 # This file
```

## 🚀 Quick Start

### Prerequisites
- **Bun** (recommended) or Node.js 18+
- **PostgreSQL** database
- **Git**

### 1. Clone and Install
```bash
# Clone the repository
git clone <repository-url>
cd url-mini

# Install backend dependencies
bun install

# Install frontend dependencies
cd frontend
bun install
cd ..
```

### 2. Database Setup
```bash
# Set up environment variables
cp .env.example .env

# Edit .env with your database credentials
# DATABASE_URL="postgresql://username:password@localhost:5432/url_mini"
# PORT=3000

# Run database migrations
bunx prisma migrate dev
```

### 3. Development Mode

#### Option A: Run Everything Together
```bash
# Run both backend and frontend
bun run dev:all
```

#### Option B: Run Separately
```bash
# Terminal 1 - Backend
bun dev

# Terminal 2 - Frontend
bun run dev:frontend
```

### 4. Access the Application
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000
- **Health Check**: http://localhost:3000/check

## 📚 API Documentation

### Endpoints

#### Create Short URL
```http
POST /url
Content-Type: application/json

{
  "url": "https://example.com/very/long/url"
}
```

**Response:**
```json
{
  "shortUrl": {
    "id": "clx123...",
    "shortId": "abc12345",
    "redirectUrl": "https://example.com/very/long/url",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "visitCount": 0,
    "visitHistory": []
  }
}
```

#### Get Analytics
```http
GET /url/analytics/:shortId
```

**Response:**
```json
{
  "shortUrl": {
    "id": "clx123...",
    "shortId": "abc12345",
    "redirectUrl": "https://example.com/very/long/url",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "visitCount": 42,
    "visitHistory": ["2024-01-01T00:00:00.000Z", "..."]
  }
}
```

#### Redirect Short URL
```http
GET /url/:shortId
```
**Response:** 302 Redirect to original URL

#### Health Check
```http
GET /check
```

**Response:**
```json
{
  "message": "api is healthy"
}
```

## 🏗 Building for Production

### Frontend Build
```bash
# Build the frontend
bun run build:frontend

# The built files will be in frontend/dist/
```

### Backend Build
```bash
# The backend runs directly with Bun/Node.js
# No build step required for the backend
```

## 🐳 Docker Deployment

### Using the included Dockerfile
```bash
# Build the Docker image
docker build -t url-mini .

# Run the container
docker run -p 3000:3000 \
  -e DATABASE_URL="postgresql://username:password@host:5432/url_mini" \
  url-mini
```

### Docker Compose (Recommended)
Create a `docker-compose.yml`:

```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://postgres:password@db:5432/url_mini
      - PORT=3000
    depends_on:
      - db

  db:
    image: postgres:15
    environment:
      - POSTGRES_DB=url_mini
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

volumes:
  postgres_data:
```

Run with:
```bash
docker-compose up -d
```

## 🌐 Deployment Options

### 1. Traditional VPS/Server
- Deploy backend to a VPS (DigitalOcean, Linode, etc.)
- Set up PostgreSQL database
- Use PM2 or similar for process management
- Serve frontend with Nginx
- Set up SSL with Let's Encrypt

### 2. Cloud Platforms

#### Railway
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway init
railway up
```

#### Vercel (Frontend) + Railway (Backend)
- Deploy frontend to Vercel
- Deploy backend to Railway
- Update frontend environment variables

#### Heroku
```bash
# Install Heroku CLI
# Create Procfile
echo "web: bun run server.ts" > Procfile

# Deploy
git add .
git commit -m "Deploy to Heroku"
git push heroku main
```

### 3. Container Orchestration
- **Kubernetes**: Use the Docker image with K8s manifests
- **Docker Swarm**: Deploy with Docker Swarm
- **AWS ECS/Fargate**: Deploy containers to AWS

## 🔧 Environment Variables

### Backend (.env)
```env
DATABASE_URL="postgresql://username:password@localhost:5432/url_mini"
PORT=3000
NODE_ENV=production
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:3000
```

## 📊 Database Schema

```sql
-- URL table
CREATE TABLE "Url" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "shortId" TEXT NOT NULL UNIQUE,
  "redirectUrl" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "visitCount" INTEGER NOT NULL DEFAULT 0,
  "visitHistory" TIMESTAMP(3)[] DEFAULT ARRAY[]::TIMESTAMP(3)[]
);
```

## 🧪 Testing

### Backend Tests
```bash
# Run backend tests
bun test
```

### Frontend Tests
```bash
# Run frontend tests (if configured)
cd frontend
bun test
```

## 🔍 Monitoring & Logging

### Health Checks
- Backend: `GET /check`
- Database connectivity through Prisma
- Error logging to console

### Analytics
- Visit tracking per short URL
- Visit history with timestamps
- Real-time statistics in frontend

## 🚨 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Check DATABASE_URL in .env
   - Ensure PostgreSQL is running
   - Verify database exists

2. **CORS Issues**
   - Backend has CORS enabled for all origins
   - Check if frontend URL matches expected origin

3. **Frontend Build Issues**
   - Clear node_modules and reinstall
   - Check TypeScript configuration
   - Verify all dependencies are installed

4. **Port Conflicts**
   - Backend default: 3000
   - Frontend default: 5173
   - Change in package.json scripts if needed

## 📈 Performance Considerations

- **Database Indexing**: shortId is indexed for fast lookups
- **Connection Pooling**: Prisma handles connection pooling
- **Frontend Optimization**: Vite provides optimized builds
- **Caching**: Consider Redis for high-traffic scenarios

## 🔐 Security Features

- **Input Validation**: URL format validation
- **SQL Injection Protection**: Prisma ORM prevents SQL injection
- **CORS Configuration**: Configurable CORS settings
- **Error Handling**: No sensitive data in error responses

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For issues and questions:
1. Check the troubleshooting section
2. Review the API documentation
3. Open an issue on GitHub
4. Check the logs for error details

---

**Built with ❤️ using Bun, React, Express, and Prisma**
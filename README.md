
# Prithvi - Grow with precision.

A full-stack web application designed for Bangladesh's unique four micro-seasons. Prithvi provides dynamic plant care schedules activated by scanning QR codes on seed packets.

## Tech Stack
- **Frontend:** React 18, Vite, Tailwind CSS, HTML5-QRCode, Recharts
- **Backend:** Node.js, Express, MySQL 8, Node-Cron, JWT Auth

## Local Setup

### 1. Prerequisites
- Node.js 20+
- MySQL 8 installed and running locally

### 2. Database Setup
1. Create a MySQL database named `prithvi`
2. Run the SQL scripts in `server/db/schema.sql` followed by `server/db/seed.sql` to initialize tables and sample data.

### 3. Environment Variables
1. Navigate to the `server/` directory.
2. Copy `.env.example` to `.env`
3. Update `DB_PASS` and other vars if your local MySQL uses a different setup.

### 4. Installation
From the root directory, run:
```bash
npm run install:all
```

### 5. Running the App
From the root directory, run:
```bash
npm run dev
```
- Client runs at: `http://localhost:5173`
- Server runs at: `http://localhost:5000`

### 6. Admin Panel Access
- URL: `http://localhost:5173/admin/login`
- Email: `admin@prithvi.app`
- Password: `Admin1234`

## Deployment Notes (Railway / Render)
1. Provision a managed MySQL database instance.
2. Run the schema and seed scripts on the production DB.
3. Set the `.env` variables on your hosting provider.
4. For production builds, run `npm run build` in the client directory to generate the static files, and serve them via Express or a CDN, then start the server via `npm start`. Set `FRONTEND_URL` to your production domain to ensure QR codes route correctly.
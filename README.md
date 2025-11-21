## Setup & Run
### 1. Clone Repository
#### https://github.com/shevasatrian/meeting-scheduler
### 2. Install Dependencies
#### Backend
```
cd backend
npm install
```
#### Frontend
```
cd ../frontend
npm install
```
### 3. Run
#### Backend
```
cd backend
npm run dev
```
#### Frontend
```
cd frontend
npm run dev
```

## Architecture Overview
### Frontend (React + Vite + TailwindCSS)
#### SPA (Single Page Application) using react-router-dom
#### Pages:
```
- Booking page (user selects date + slot, submits booking)
- Dashboard bookings list (admin only)
- Settings (organizer working hours, blackout dates, meeting duration)
```
#### Components:
```
- Custom date picker
- Slot generator list
- Reusable modal UI
- Sidebar navigation layout
```
#### Calls backend using Axios (VITE_API_URL)
### Backend (Node.js + Express)
#### REST API architecture with routes:
```
- /bookings — CRUD + reschedule
- /settings — read/update organizer settings
- /slots — dynamically generated available time slots
```
#### Validation using Zod (schema-based)
### Database (PostgreSQL via Prisma ORM)
#### Main tables:
```
- booking
- organizerSettings
```

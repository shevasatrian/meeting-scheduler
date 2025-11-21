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

## Data Model Outline & Concurrency Approach
### Data Model (Prisma)
#### booking
| Field          | Type     | Description                |
| -------------- | -------- | -------------------------- |
| `id`           | Int (PK) | Auto-increment primary key |
| `inviteeName`  | String   | Nama pengundang            |
| `inviteeEmail` | String   | Email pengundang           |
| `startTime`    | DateTime | Waktu mulai pertemuan      |
| `endTime`      | DateTime | Waktu selesai pertemuan    |
| `createdAt`    | DateTime | Timestamp otomatis         |
#### organizerSettings
| Field               | Type     | Description                         |
| ------------------- | -------- | ----------------------------------- |
| `id`                | Int (PK) | Single-row settings                 |
| `workingHoursStart` | String   | Format `HH:mm`                      |
| `workingHoursEnd`   | String   | Format `HH:mm`                      |
| `meetingDuration`   | Int      | Durasi meeting dalam menit          |
| `minimumNotice`     | Int      | Minimal jarak waktu sebelum meeting |
| `blackoutDates`     | Json     | Array tanggal yang dilock           |
### Concurrency Approach
### 1. Atomic Transactions ($transaction)
#### Used in:
- createBooking
- rescheduleBooking
#### Inside each transaction:
- Check whether the requested time slot is already taken
- If yes → throw "Slot already booked"
- If not → create or update the booking within the same transaction
### 2. Stateless Slot Generator
#### Available slots are generated on each request based on:
- Working hours
- Meeting duration
- Minimum notice
- Existing bookings
- Blackout dates
#### Because slot generation is stateless:
- No shared mutable state
- No race conditions
- Always deterministic
- Cache-friendly if needed
### 3. Safe Rescheduling Logic
#### Rescheduling also uses:
- Atomic transactions
- Conflict detection
- Self-exclusion rule (NOT: { id })
- End time recalculation based on duration
#### This ensures:
- Old slot is released
- New slot is safely reserved
- No overlapping occurs

## Test Instructions
### 1. Run backend tests (API-level manual testing)
#### Test all endpoints manually using postman
#### 1. Load organizer settings
```
GET /settings
```
#### 2. Update organizer settings
```
PUT /settings
```
#### 3. Get available slots
```
GET /slots?start=2025-01-10T00:00:00&end=2025-01-10T23:59:59
```
#### 4. Create a booking
```
POST /bookings
```
#### 5. Reschedule a booking
```
PUT /bookings/:id/reschedule
```
#### 6. Delete a booking
```
DELETE /bookings/:id
```
### 2. Frontend Testing
#### Manual UI test checklist:
- Select a date (only up to 14 days allowed)
- Load available slots
- Create a booking
- Confirm booking appears in dashboard
- Apply date range filter
- Reschedule booking

## AI Usage Notes
#### This project was developed with assistance from ChatGPT to speed up implementation and improve code quality. AI was used as a coding partner, not as an auto-generator — all outputs were reviewed, tested, and manually adjusted.
#### Tools Used
- ChatGPT (OpenAI GPT-5.1)
### Where AI Was Used
### 1. Backend
#### AI helped with:
- Designing the Express.js route structure
- Drafting the Prisma schema for bookings and organizer settings
- Implementing concurrency-safe logic using prisma.$transaction()
- Creating the rescheduleBooking controller with conflict detection
- Suggesting improvements to slot generation architecture
#### Example tasks assisted by AI:
- Ensuring booking conflicts return 409
- Validating payloads using Zod
- Structuring API responses consistently
### 2. Frontend
#### AI assisted in:
- Building the React components (BookingPage, Dashboard, Settings)
- Improving UI structure and styling with Tailwind
- Creating a reusable Reschedule modal
- Implementing a Sidebar layout and navigation
- Handling date range selection using react-day-picker
- Improving slot selection and booking UX flows
#### Examples of AI-assisted components:
- The custom DatePicker
- RescheduleModal
- Pagination + filtering logic for Dashboard
- Improved loading states and error handling
### How Outputs Were Verified
#### Every response generated by ChatGPT was validated through manual testing:
- Running endpoints in Postman / browser
- Inspecting database results (Prisma Studio)
- Performing UI interaction tests directly in the browser
- Verifying expected vs actual slot generation
- Ensuring booking/rescheduling behaves correctly
- Cancel booking
- Update organizer settings and check if slots regenerate correctly

## Known Limitations & Future Improvements
### Known Limitations
- No authentication:
  - Anyone who knows the dashboard URL can modify bookings. A proper login system for organizers is needed
- No email notifications:
  - Booking confirmation, cancellation, or reschedule emails are not yet supported
### What I’d Tackle Next
- Add authentication (JWT)
- Send email notifications

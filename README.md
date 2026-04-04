# Maintenance Handover Tracker

A full-stack maintenance handover application to manage machinery, telehuts, remote levels, and shift notes — all in one place.

It provides a clear dashboard view and automatically generates a structured handover log for incoming crews.

---

## Live Demo

- **Frontend:** https://maintenance-handover-dashboard.vercel.app/
- **Backend:** https://maintenance-handover-dashboard.onrender.com/

---

## Overview

This application simplifies shift handovers by keeping operational data organized and visible.

Users can:
- Manage machinery and equipment status
- Track telehut operations
- Monitor remote levels
- Add notes for the next crew
- Generate a handover log automatically

The app uses a **separated frontend/backend architecture** with MongoDB as the database.

---

## Features

- Full CRUD for:
  - Machinery
  - Telehuts
  - Remote Levels
  - General Notes

- Status tracking:
  - Machinery → `available`, `in_progress`, `breakdown`
  - Telehuts → `running`, `standby`, `down`
  - Remote Levels → `active`, `inactive`, `in_progress`

- Dashboard with real-time stats
- Automatic handover log generation
- Editable handover period
- Remote-capable machinery view

---

## Tech Stack

**Frontend**
- JavaScript (ES Modules)
- HTML / CSS
- Webpack

**Backend**
- Node.js
- Express

**Database**
- MongoDB Atlas

**Deployment**
- Vercel (Frontend)
- Render (Backend)

---

## How It Works

- **Dashboard** → Displays key stats and allows adding notes  
- **Machineries** → Manage equipment and their status  
- **Teleremote** → Manage telehuts and remote levels  
- **Handover Log** → Automatically built from non-ideal statuses  

---

## API Endpoints

| Method | Endpoint |
|--------|---------|
| GET    | /machinery, /telehut, /remote-level, /general-note |
| POST   | /machinery, /telehut, /remote-level, /general-note |
| PUT    | /:resource/:id |
| DELETE | /:resource/:id |

---

## 🧪 Run Locally

```bash
git clone https://github.com/buildwithseb/maintenance-handover-dashboard.git
cd maintenance-handover-dashboard
```

---

## Backend

```bash
cd backend
npm install
cp .env.example .env
npm start
```

## Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

## Environment Variables

Backend
```bash
MONGODB_URI=your_connection_string
DB_NAME=your_db_name
PORT=3000
FRONTEND_URL=http://localhost:8081
```

Frontend
```bash
API_BASE_URL=http://localhost:3000
```

#### Deployment
	•	Frontend → Vercel
	•	Backend → Render
	•	Database → MongoDB Atlas

---

### Key Learnings
	•	Full-stack architecture (frontend + backend separation)
	•	REST API design
	•	MongoDB integration with Node.js
	•	Environment variables (local vs production)
	•	CORS configuration across deployments
	•	Modular JavaScript structure (controllers, services, models)

⸻

### Future Improvements
	•	Authentication & user accounts
	•	Search and filtering
	•	Better UI validation and error handling
	•	Mobile responsiveness
	•	Export handover reports (PDF / CSV)

---

### Author

Sébastien Champeau
https://github.com/buildwithseb

---

⭐ If you found this project useful, consider giving it a star!
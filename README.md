# Maintenance Handover Tracker

A full-stack maintenance handover application designed to help teams manage fleet equipment, telehuts, remote levels, and shift notes — all in one centralized dashboard.

It provides real-time visibility of operations and automatically generates a structured handover log for incoming crews.

---

## Live Demo

- **Frontend:** https://maintenance-handover-dashboard.vercel.app/
- **Backend:** https://maintenance-handover-dashboard.onrender.com/

---

## Overview

Maintenance Handover Tracker simplifies shift transitions by organizing operational data into a clear, actionable interface.

The application allows teams to:

- Manage machinery and equipment status
- Monitor telehut operations
- Track remote levels
- Add shift notes for the next crew
- Automatically generate handover reports

The project follows a **separated frontend/backend architecture**, deployed on:

- **Frontend:** Vercel
- **Backend:** Render
- **Database:** MongoDB Atlas

---

## Features

- Full CRUD operations for:
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
- Live synchronization with backend API

---

## Tech Stack

### Frontend
- JavaScript (ES Modules)
- HTML5 / CSS3
- Webpack

### Backend
- Node.js
- Express.js

### Database
- MongoDB Atlas

### Deployment
- Vercel (Frontend)
- Render (Backend)

---

## Project Structure

```bash
maintenance-handover-dashboard/
├── frontend/
│   ├── src/
│   ├── dist/
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   └── webpack.config.js
│
├── backend/
│   ├── config/
│   ├── routes/
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
└── README.md
```

---


## How It Works

Dashboard

The dashboard displays:
	•	total machines
	•	available machines
	•	breakdowns
	•	machines in progress

It also lets users:
	•	edit the handover period
	•	add general notes for the incoming crew

Machineries

Users can create, update, and remove machinery entries with:
	•	name / ID
	•	type
	•	status
	•	remote capability
	•	notes

Teleremote

The teleremote page includes:
	•	telehut management
	•	remote-capable machinery view
	•	remote level management

Handover Log

The handover log is built automatically from:
	•	machinery not marked as available
	•	telehuts not marked as running
	•	remote levels not marked as active

General notes added on the dashboard are also shown in the handover section.

⸻

API Endpoints

GET
	•	/machinery
	•	/telehut
	•	/remote-level
	•	/general-note

POST
	•	/machinery
	•	/telehut
	•	/remote-level
	•	/general-note

PUT
	•	/machinery/:id
	•	/telehut/:id
	•	/remote-level/:id
	•	/general-note/:id

DELETE
	•	/machinery/:id
	•	/telehut/:id
	•	/remote-level/:id
	•	/general-note/:id

⸻

Run Locally

1. Clone the repository

git clone https://github.com/buildwithseb/maintenance-handover-dashboard.git
cd maintenance-handover-dashboard

Backend Setup

Open a terminal:

cd backend
npm install

Create backend environment file

Rename:

.env.example

to:

.env

Backend .env example

MONGODB_URI=your_mongodb_connection_string
DB_NAME=your_database_name
PORT=3000
FRONTEND_URL=http://localhost:8081

Start backend

npm start

Backend runs on:

http://localhost:3000

Frontend Setup

Open a new terminal:

cd frontend
npm install

Create frontend environment file

Rename:

.env.example

to:

.env

Frontend .env example

API_BASE_URL=http://localhost:3000

Start frontend

npm run dev

Frontend runs on:

http://localhost:8081

Build for Production

Inside the frontend folder:

npm run build

This generates the production build inside:

frontend/dist

Environment Variables

Frontend

API_BASE_URL=http://localhost:3000

Backend

MONGODB_URI=your_mongodb_connection_string
DB_NAME=your_database_name
PORT=3000
FRONTEND_URL=http://localhost:8081

Deployment

Frontend Deployment (Vercel)

Deploy the frontend folder with:
	•	Build Command: npm run build
	•	Output Directory: dist

Set this environment variable in Vercel:

API_BASE_URL=https://maintenance-handover-dashboard.onrender.com

Backend Deployment (Render)

Deploy the backend folder to Render.

Set these environment variables in Render:

MONGODB_URI=your_mongodb_connection_string
DB_NAME=your_database_name
FRONTEND_URL=https://maintenance-handover-dashboard.vercel.app

PORT does not need to be manually set on Render, since Render provides it automatically.

⸻

Challenges & Learnings

This project helped me practice and improve my understanding of:
	•	full-stack app structure
	•	frontend and backend separation
	•	environment variables in local and production environments
	•	CORS configuration between Vercel and Render
	•	connecting Node.js to MongoDB Atlas
	•	CRUD operations with MongoDB
	•	working with ObjectId values
	•	modular JavaScript architecture with controllers, services, models, and views
	•	deploying real-world apps to cloud platforms

⸻

Future Improvements
	•	authentication and user accounts
	•	search and filtering
	•	better form validation
	•	improved error handling in the UI
	•	pagination for large datasets
	•	mobile responsiveness
	•	handover history / archived reports
	•	export to PDF or CSV

⸻

Author

Sébastien Champeau
	•	GitHub: https://github.com/buildwithseb

⸻

Support

If you found this project useful, consider giving it a ⭐ on GitHub.

A good next addition would be a **Screenshots** section near the top, because that makes GitHub projects look much stronger.

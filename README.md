# ChronoSync

A web-based, constraint-aware timetable scheduling system for higher education institutions, built for the Government of Jharkhand's Department of Higher & Technical Education smart-scheduling problem statement.

Uses a hybrid **Genetic Algorithm + Greedy Optimization** engine to generate conflict-free timetables that satisfy hard constraints (teacher/room/batch clashes) while optimizing soft constraints (faculty preferences, workload balance).

## Stack
- **Frontend:** React
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Scheduling engine:** Custom hybrid GA + Greedy algorithm

## Project structure
See [`docs/ChronoSync_Architecture_Plan.md`](docs/ChronoSync_Architecture_Plan.md) for the full architecture, data models, and API design.

```
chronosync/
├── client/     # React frontend (Admin, Teacher, Student portals)
├── server/     # Express API + scheduling engine
└── docs/       # Architecture plan, API spec, diagrams
```

## Getting started

### Prerequisites
- Node.js 18+
- MongoDB running locally or a connection URI (e.g. MongoDB Atlas)

### Backend
```bash
cd server
cp .env.example .env   # fill in MONGO_URI and JWT_SECRET
npm install
npm run dev
```

### Frontend
```bash
cd client
cp .env.example .env   # set REACT_APP_API_URL
npm install
npm start
```

## Roles
- **Admin** — manages departments, faculty, rooms, subjects, batches; triggers timetable generation; reviews and approves candidates.
- **Teacher** — submits availability/preferences; views assigned schedule.
- **Student** — views published timetable (read-only).

## Status
🚧 Early scaffold — core data models and engine skeleton in place, business logic in progress.

## License
MIT

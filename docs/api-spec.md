# ChronoSync API spec (v0)

Base URL: `/api`. All routes except `/auth/*` require `Authorization: Bearer <token>`.

## Auth
| Method | Route | Role | Body |
|---|---|---|---|
| POST | /auth/register | — | { name, email, password, role, faculty?, batch? } |
| POST | /auth/login | — | { email, password } |

## Master data (Department, Faculty, Room, Subject, Batch)
Each resource exposes the same CRUD shape, e.g. for `/faculty`:

| Method | Route | Role |
|---|---|---|
| GET | /faculty | any authenticated |
| GET | /faculty/:id | any authenticated |
| POST | /faculty | admin |
| PUT | /faculty/:id | admin, teacher (own record) |
| DELETE | /faculty/:id | admin |

Same pattern applies to `/departments`, `/rooms`, `/subjects`, `/batches` (admin-only writes).

## Timetable generation
| Method | Route | Role | Notes |
|---|---|---|---|
| POST | /timetable/generate | admin | body: { departmentId, semester } → returns { jobId } |
| GET | /timetable/:jobId/status | admin | returns { status: running\|complete\|failed } |
| GET | /timetable/:jobId/candidates | admin | returns array of candidate Timetable docs, sorted by fitness |
| POST | /timetable/:id/approve | admin | publishes the chosen candidate |
| GET | /timetable/published?batch=<id> | any authenticated | returns the live, published timetable (optionally filtered to one batch) |

## Response shape — Timetable
```json
{
  "_id": "...",
  "status": "published",
  "fitnessScore": 12,
  "hardViolations": 0,
  "assignments": [
    { "batch": "...", "subject": "...", "faculty": "...", "room": "...", "timeSlot": "..." }
  ]
}
```

# ChronoSync — Architecture & Build Plan

**Problem source:** Govt. of Jharkhand, Dept. of Higher & Technical Education — automated, constraint-aware timetable generation for higher-ed institutions.

**Stack:** ReactJS · Node.js · Express.js · MongoDB · Genetic Algorithm + Greedy Optimization

---

## 1. Scope & goals

Generate conflict-free, optimized timetables for a college/university given:
- Rooms/labs, faculty, subjects, batches, weekly load, faculty leave patterns, fixed-slot special classes.
- **Hard constraints** (must never be violated): no teacher/room/batch double-booking, room capacity ≥ batch size, lab subjects only in labs.
- **Soft constraints** (optimized, not guaranteed): faculty preferences, even workload spread, minimized gaps/idle periods, fixed slots honored.

Output: multiple candidate optimized timetables, an approval workflow, and regeneration when constraints can't be fully satisfied.

---

## 2. User roles

| Role | Capabilities |
|---|---|
| **Admin** | Define departments, subjects, faculty, rooms, batches, constraints; trigger generation; review/approve/reject candidate timetables; publish final version. |
| **Teacher** | Submit availability/preferences; view assigned schedule; request changes. |
| **Student** | View published timetable for their batch (read-only). |

---

## 3. Data models (MongoDB)

- **Department** — name, code, programs offered
- **Faculty** — name, department, subjects qualified to teach, max load/week, leave calendar, preferences (preferred slots, preferred subjects)
- **Room** — name, type (classroom/lab), capacity, department (if dedicated)
- **Subject** — name, code, department, semester, type (lecture/lab), classes/week, duration/slot
- **Batch** — name (e.g. "CSE-3A"), department, semester, strength, subjects enrolled
- **TimeSlot** — day, period number, start/end time, is it a fixed/special slot
- **Constraint** — type (hard/soft), scope (global/department/faculty), rule payload
- **Timetable** — status (draft/pending-approval/published), generation metadata (fitness score, generation number), array of `Assignment {batch, subject, faculty, room, timeSlot}`
- **User** — role, linked Faculty/Batch reference, auth credentials

---

## 4. Scheduling engine design

### Encoding
Each **chromosome** = one full timetable = an array of `Assignment` objects, one per (batch, subject-session) that needs to be scheduled for the week.

### Pipeline
1. **Greedy seeding** — build initial population by greedily placing each session into the first slot that satisfies hard constraints (fast, gives GA a legal-ish starting point instead of pure random).
2. **Genetic Algorithm loop:**
   - **Fitness function** = heavy penalty per hard-constraint violation (should trend to 0) + weighted penalty per soft-constraint violation (faculty preference mismatch, uneven load, gaps).
   - **Selection**: tournament selection on fitness.
   - **Crossover**: day-wise or batch-wise segment crossover between two parent timetables.
   - **Mutation**: randomly reassign a session to a different valid slot/room (probability ~5–10%).
   - **Repair function**: after crossover/mutation, run a fast pass that resolves any newly introduced hard-constraint clashes (greedy repair), so the population never regresses on hard constraints.
3. Run for N generations or until fitness plateaus; return top-K distinct timetables as candidates for Admin review.

### Why hybrid GA + Greedy
Pure GA from a random population wastes generations converging on legality. Greedy seeding + greedy repair keeps every candidate hard-constraint-clean (or near it) while GA optimizes the soft, "quality" layer — faculty happiness and workload balance.

---

## 5. Backend API surface (representative)

```
POST   /api/auth/login
GET    /api/departments
POST   /api/faculty            (admin)
POST   /api/rooms              (admin)
POST   /api/subjects           (admin)
POST   /api/batches            (admin)
PUT    /api/faculty/:id/preferences   (teacher)
POST   /api/timetable/generate         -> triggers GA job, returns job id
GET    /api/timetable/:jobId/status
GET    /api/timetable/:jobId/candidates
POST   /api/timetable/:id/approve      (admin)
GET    /api/timetable/published?batch=CSE-3A   (student/teacher view)
```

Generation is long-running → run as an async job (in-process queue or worker thread) and poll status, rather than blocking the HTTP request.

---

## 6. Suggested folder structure

```
chronosync/
  client/                # React app
    src/
      portals/admin/
      portals/teacher/
      portals/student/
      components/
      api/
  server/
    src/
      models/            # Mongoose schemas
      routes/
      controllers/
      engine/
        greedySeed.js
        fitness.js
        crossover.js
        mutation.js
        gaRunner.js
      jobs/               # async generation job queue
    server.js
```

---

## 7. Build roadmap

1. **Data layer** — Mongoose models + seed script with sample department data.
2. **Core engine** — greedy seeder + fitness function first (testable in isolation, no UI needed).
3. **GA loop** — selection/crossover/mutation/repair wrapped around the engine; validate against sample data.
4. **API** — CRUD endpoints, then the generate/status/approve endpoints.
5. **Admin portal** — data entry screens, then "generate → review candidates → approve" flow.
6. **Teacher/Student portals** — preferences form, read-only timetable view.
7. **Conflict detection & regeneration UX** — surface unresolved soft-constraint issues with suggested rearrangements.
8. **ERP integration hook** — stub an export endpoint (JSON/CSV) other systems can pull from.

---

## Next steps
Pick a piece from the roadmap above and we build it — I'd suggest starting with the data models + greedy seeder, since everything else depends on them.

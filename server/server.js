require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db');
const errorHandler = require('./src/middleware/errorHandler');

const authRoutes = require('./src/routes/authRoutes');
const departmentRoutes = require('./src/routes/departmentRoutes');
const facultyRoutes = require('./src/routes/facultyRoutes');
const roomRoutes = require('./src/routes/roomRoutes');
const subjectRoutes = require('./src/routes/subjectRoutes');
const batchRoutes = require('./src/routes/batchRoutes');
const timetableRoutes = require('./src/routes/timetableRoutes');

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.use('/api/auth', authRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/faculty', facultyRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/batches', batchRoutes);
app.use('/api/timetable', timetableRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`ChronoSync server running on port ${PORT}`));

module.exports = app;

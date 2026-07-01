import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDatabase, getMongoUri } from './database';
import { User, Team, Activity, Workout, Leaderboard } from './models';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT || 8000);
const MONGO_URI = getMongoUri();
const CODESPACE_NAME = process.env.CODESPACE_NAME;
const API_BASE_URL = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.app.github.dev`
  : `http://localhost:${PORT}`;

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'octofit-backend' });
});

app.get('/api', (_req, res) => {
  res.json({ message: 'OctoFit Tracker API is running', baseUrl: API_BASE_URL });
});

app.get('/api/users', async (_req, res) => {
  const users = await User.find().lean();
  res.json({ users });
});

app.post('/api/users', async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json({ user });
});

app.get('/api/teams', async (_req, res) => {
  const teams = await Team.find().populate('members').lean();
  res.json({ teams });
});

app.post('/api/teams', async (req, res) => {
  const team = await Team.create(req.body);
  res.status(201).json({ team });
});

app.get('/api/activities', async (_req, res) => {
  const activities = await Activity.find().populate('user').lean();
  res.json({ activities });
});

app.post('/api/activities', async (req, res) => {
  const activity = await Activity.create(req.body);
  res.status(201).json({ activity });
});

app.get('/api/leaderboard', async (_req, res) => {
  const leaderboard = await Leaderboard.find().populate('user').sort({ rank: 1 }).lean();
  res.json({ leaderboard });
});

app.get('/api/workouts', async (_req, res) => {
  const workouts = await Workout.find().lean();
  res.json({ workouts });
});

app.post('/api/workouts', async (req, res) => {
  const workout = await Workout.create(req.body);
  res.status(201).json({ workout });
});

async function startServer() {
  try {
    await connectDatabase();
    console.log('Connected to MongoDB');
    console.log('MongoDB URI:', MONGO_URI);
    console.log('Codespaces-aware API URL:', API_BASE_URL);

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Backend listening on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server', error);
    process.exit(1);
  }
}

startServer();

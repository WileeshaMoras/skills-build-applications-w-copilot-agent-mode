import dotenv from 'dotenv';
import { connectDatabase } from '../database';
import { User, Team, Activity, Workout, Leaderboard } from '../models';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';

async function seedDatabase() {
  console.log('Seed the octofit_db database with test data');

  await connectDatabase();
  console.log('Connected to MongoDB for seeding');

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    Workout.deleteMany({}),
    Leaderboard.deleteMany({}),
  ]);

  const users = await User.create([
    { name: 'Ari Johnson', email: 'ari.johnson@example.com', role: 'member' },
    { name: 'Mina Patel', email: 'mina.patel@example.com', role: 'captain' },
    { name: 'Jae Kim', email: 'jae.kim@example.com', role: 'member' },
  ]);

  const workouts = await Workout.create([
    {
      name: 'Core Blast',
      description: 'A quick core conditioning circuit for strength and stability.',
      difficulty: 'intermediate',
      durationMinutes: 30,
      focus: 'core',
    },
    {
      name: 'Endurance Run',
      description: 'A steady-state run to build endurance and consistent pacing.',
      difficulty: 'advanced',
      durationMinutes: 45,
      focus: 'cardio',
    },
    {
      name: 'Recovery Flow',
      description: 'Light mobility and stretching to support recovery.',
      difficulty: 'beginner',
      durationMinutes: 20,
      focus: 'recovery',
    },
  ]);

  const teams = await Team.create([
    {
      name: 'Sunrise Sprinters',
      description: 'A team focused on fast interval training and goal sprints.',
      members: [users[0]._id, users[1]._id],
    },
    {
      name: 'Evening Warriors',
      description: 'A supportive crew for strength, teamwork, and long-term progress.',
      members: [users[1]._id, users[2]._id],
    },
  ]);

  const activities = await Activity.create([
    {
      user: users[0]._id,
      type: 'running',
      durationMinutes: 35,
      distanceKm: 6.2,
      caloriesBurned: 420,
      occurredAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
    },
    {
      user: users[1]._id,
      type: 'strength',
      durationMinutes: 50,
      caloriesBurned: 510,
      occurredAt: new Date(Date.now() - 1000 * 60 * 60 * 48),
    },
    {
      user: users[2]._id,
      type: 'yoga',
      durationMinutes: 25,
      caloriesBurned: 190,
      occurredAt: new Date(Date.now() - 1000 * 60 * 60 * 12),
    },
  ]);

  const leaderboard = await Leaderboard.create([
    { user: users[1]._id, rank: 1, score: 1480, metric: 'weekly points' },
    { user: users[0]._id, rank: 2, score: 1320, metric: 'weekly points' },
    { user: users[2]._id, rank: 3, score: 1080, metric: 'weekly points' },
  ]);

  console.log('Seed complete:', {
    users: users.length,
    teams: teams.length,
    activities: activities.length,
    workouts: workouts.length,
    leaderboard: leaderboard.length,
  });

  await mongoose.disconnect();
  console.log('Disconnected from MongoDB after seeding');
}

seedDatabase().catch((error) => {
  console.error('Seed failed', error);
  process.exit(1);
});

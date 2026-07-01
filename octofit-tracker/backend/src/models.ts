import { Schema, model, Types } from 'mongoose';

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true, default: 'member' },
    joinedAt: { type: Date, default: () => new Date() },
  },
  { timestamps: true }
);

const TeamSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    members: [{ type: Types.ObjectId, ref: 'User' }],
    createdAt: { type: Date, default: () => new Date() },
  },
  { timestamps: true }
);

const ActivitySchema = new Schema(
  {
    user: { type: Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    distanceKm: { type: Number },
    caloriesBurned: { type: Number, required: true },
    occurredAt: { type: Date, default: () => new Date() },
  },
  { timestamps: true }
);

const WorkoutSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    difficulty: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    focus: { type: String, required: true },
    createdAt: { type: Date, default: () => new Date() },
  },
  { timestamps: true }
);

const LeaderboardSchema = new Schema(
  {
    user: { type: Types.ObjectId, ref: 'User', required: true },
    rank: { type: Number, required: true },
    score: { type: Number, required: true },
    metric: { type: String, required: true },
    updatedAt: { type: Date, default: () => new Date() },
  },
  { timestamps: true }
);

export const User = model('User', UserSchema);
export const Team = model('Team', TeamSchema);
export const Activity = model('Activity', ActivitySchema);
export const Workout = model('Workout', WorkoutSchema);
export const Leaderboard = model('Leaderboard', LeaderboardSchema);

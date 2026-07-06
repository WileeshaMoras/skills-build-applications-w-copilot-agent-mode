"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = Number(process.env.PORT || 8000);
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', service: 'octofit-backend' });
});
app.get('/api', (_req, res) => {
    res.json({ message: 'OctoFit Tracker API is running' });
});
async function startServer() {
    try {
        await mongoose_1.default.connect(MONGO_URI);
        console.log('Connected to MongoDB');
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`Backend listening on port ${PORT}`);
        });
    }
    catch (error) {
        console.error('Failed to start server', error);
        process.exit(1);
    }
}
startServer();

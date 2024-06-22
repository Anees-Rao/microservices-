import express from 'express';
import mongoose from 'mongoose';
import routes from './routes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(express.json());
app.use('/api/authentication/', routes);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI!).then(() => {
    console.log('Connected to MongoDB');
    // Start server
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

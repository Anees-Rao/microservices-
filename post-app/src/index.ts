import express from 'express';
import dotenv from 'dotenv';
import routes from './routes';
import { sequelize } from './config/database';

dotenv.config();

const app = express();
const port = process.env.PORT;
app.use(express.json());
app.use('/api/post', routes);

sequelize.authenticate()
    .then(() => {
        console.log('Connected to PostgreSQL database');
        sequelize.sync()
            .then(() => {
                console.log('Database synchronized');
                app.listen(port, () => {
                    console.log(`Server running at http://localhost:${port}`);
                });
            })
            .catch((error: any) => console.error('Error syncing database:', error));
    })
    .catch((error: any) => console.error('Error connecting to PostgreSQL:', error));

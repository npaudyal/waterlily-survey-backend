import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import routes from './routes';
import { errorHandler } from '@/middleware/errorHandler';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());

const corsOrigin = process.env.NEXT_PUBLIC_URL
    ? process.env.NEXT_PUBLIC_URL.replace(/\/$/, '')
    : 'http://localhost:3001';

console.log('CORS configured for origin:', corsOrigin);

app.use(cors({
    origin: corsOrigin,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
    exposedHeaders: ['Set-Cookie']
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'Our server is healthy' })
})

//All our API routes
app.use('/api', routes);

app.use(errorHandler);

const server = app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { clerkMiddleware } from '@clerk/express';
import routes from '@/routes/index';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors(
    {
        origin: process.env.NEXT_PUBLIC_URL,
        credentials: true
    }
));
app.use(helmet());
app.use(express.json());
app.use(clerkMiddleware());


app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'Our server is healthy' })
})

app.get('/api', routes);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})


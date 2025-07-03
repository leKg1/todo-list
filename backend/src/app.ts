import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import taskRoutes from './routes/taskRoutes';
import { errorHandler } from './middleware/errorHandler';
import { xssSanitizer } from './middleware/xssSanitizer';
import { setupSwagger } from './swagger';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);
app.use(xssSanitizer);
app.use(errorHandler);

setupSwagger(app);

export default app;

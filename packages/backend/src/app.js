import express from 'express';
import routes from './routes/index.js';

const app = express();

app.use(express.json());
app.use('/api', routes.authRoutes);
app.use('/api/import', routes.importRoutes);
app.use('/api/rooming-lists', routes.roomingListRoutes);

export default app;

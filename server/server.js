import express from 'express';

import { PORT } from './config/env.js';

import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';

const app = express();

app.use(express.json());

app.use('/api/crypto-minds/auth', authRouter);
app.use('/api/crypto-minds/users', userRouter);

app.get('/', (req, res) => {
    res.send('HOLA');
});

app.listen(PORT, () => {
    console.log(`${PORT}`);
});

export default app;
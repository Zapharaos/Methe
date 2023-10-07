import fs from 'node:fs/promises';
import express from 'express';
import { usersRouter } from './routes/users.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use('/users', usersRouter);

app.listen(process.env.SERVER_PORT, () => console.log('API server is running ...'));
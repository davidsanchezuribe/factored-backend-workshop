import express from 'express';
// libreria para permitir el accesso desde localhost:8000
import cors from 'cors';
import bodyParser from 'body-parser';

import employeeAPI from './employeeAPI';
import positionAPI from './positionAPI';
import avatarAPI from './avatarAPI';
import skillAPI from './skillAPI';
// @imports

const app = express();
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:7000' }));
app.use('/employee', employeeAPI);
app.use('/position', positionAPI);
app.use('/avatar', avatarAPI);
app.use('/skill', skillAPI);
// @APIs

export default app;

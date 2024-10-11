// libreria que recibe los llamados REST de la api
import express from 'express';
// librería para permitir el accesso desde localhost:8000
import cors from 'cors';
// libreria para detectar el formato json automáticamente
import bodyParser from 'body-parser';

import clientAPI from './clientAPI';
// @imports

const app = express();
app.use(bodyParser.json());
app.use(cors({ origin: 'localhost:8000' }));
app.use('/client', clientAPI);
// @APIs

export default app;

import * as dotenv from 'dotenv';
import fakeDatabase from './fakers/fakeDatabase';
import app from './server/app';
import 'reflect-metadata';
import { AppDataSource } from './AppDataSource';
// @imports

dotenv.config();
const {
  NODE_ENV,
  PROD_PORT,
  DEV_PORT,
  FAKE_DATABASE,
} = process.env;

const port = NODE_ENV === 'production'
  ? PROD_PORT
  : DEV_PORT;

app.listen(port, () => {
  // eslint-disable-next-line
  if (NODE_ENV !== 'production') console.log(`listen on port ${port}`);
});

AppDataSource.initialize()
  .then(() => {
    // eslint-disable-next-line
    console.log('initialized database');
    if (FAKE_DATABASE === 'true') {
      fakeDatabase();
    }
  }).catch((error: string) => {
    // eslint-disable-next-line
    console.log(error);
  });

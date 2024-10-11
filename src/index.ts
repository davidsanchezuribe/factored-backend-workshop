import * as dotenv from 'dotenv';
import app from './server/app';
// @imports

dotenv.config();
const { NODE_ENV, PROD_PORT, DEV_PORT } = process.env;

const port = NODE_ENV === 'production'
  ? PROD_PORT
  : DEV_PORT;

app.listen(port, () => {
  // eslint-disable-next-line
  if (NODE_ENV !== 'production') console.log(`listen on port ${port}`);
});

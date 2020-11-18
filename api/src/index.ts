import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { json } from 'body-parser';
import 'express-async-errors';
import config from './config';
import { connectDatabase } from './database';
import { initFirebase, requireAuth } from './auth';
import { organizationsRouter } from './organizations/routes';

async function startApp() {
  const app = express();
  app.use(helmet());
  app.use(cors());
  app.use(json());
  app.use(requireAuth);

  try {
    await connectDatabase();
    console.log('Connected to database.');
  } catch (error) {
    console.error(error);
    process.exit();
  }

  try {
    initFirebase();
    console.log('Firebase initialized.');
  } catch (error) {
    console.error(error);
    process.exit();
  }

  const v1Router = express.Router();
  app.use('/api', v1Router);
  v1Router.use('/organizations', organizationsRouter);

  app.listen(config.port, () =>
    console.log(`Server running and listening on port ${config.port}.`)
  );
}

startApp();

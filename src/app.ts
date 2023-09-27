import 'express-async-errors';
import express, { Application } from 'express';
import helmet from 'helmet';
import cors from 'cors';

import { metricsMiddleware, metricsController } from './metrics';
import errorHandler from './errors';

import tournamentController from './tournament/Controller';
import groupController from './group/Controller';
import matchController from './match/Controller';

export default async function bootstrap() {
  const app: Application = express();

  app.use(express.static('public'));
  app.use(express.json());
  app.use(helmet());
  app.use(cors({
    origin: '*',
    methods: ['OPTIONS', 'GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));

  app.use('/tournaments', metricsMiddleware, tournamentController);
  app.use('/groups', metricsMiddleware, groupController);
  app.use('/matches', metricsMiddleware, matchController);
  app.use('/metrics', metricsController);

  app.use(errorHandler);

  return app;
}

import 'reflect-metadata';
import { createConnection } from 'typeorm';
import config from './config';

export function connectDatabase() {
  return createConnection({
    type: 'postgres',
    url: `postgres://${config.pgUser}:${config.pgPassword}@${config.pgHost}:${config.pgPort}/${config.pgDatabase}`,
    entities: [],
    synchronize: true,
  });
}

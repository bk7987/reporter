import 'reflect-metadata';
import { createConnection } from 'typeorm';
import config from './config';
import { Organization } from './organizations/models';
import { Project } from './projects/models';

export function connectDatabase() {
  return createConnection({
    type: 'postgres',
    url: `postgres://${config.pgUser}:${config.pgPassword}@${config.pgHost}:${config.pgPort}/${config.pgDatabase}`,
    entities: [Organization, Project],
    synchronize: true,
  });
}

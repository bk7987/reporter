export default {
  port: parseInt(process.env.PORT || '3333', 10),

  pgUser: process.env.PG_USER || 'postgres',
  pgPassword: process.env.PG_PASSWORD || 'password',
  pgHost: process.env.PG_HOST || 'localhost',
  pgPort: process.env.PG_PORT || '5432',
  pgDatabase: process.env.PG_DATABASE || 'reporter',

  firebaseDatabaseUrl: process.env.FIREBASE_DATABASE_URL || '',
};

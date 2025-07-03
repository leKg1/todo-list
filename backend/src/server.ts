import 'reflect-metadata';
import app from './app';
import dataSource from './ormconfig';
import { seedAdmin } from './utils/seedAdmin';

const PORT = process.env.PORT || 4000;

dataSource.initialize().then(async () => {
  await seedAdmin();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch((err) => {
  console.error('Failed to initialize database', err);
});

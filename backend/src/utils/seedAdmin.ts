import dataSource from '../ormconfig';
import { User } from '../entities/User';
import bcrypt from 'bcryptjs';

export async function seedAdmin() {
  const userRepo = dataSource.getRepository(User);
  const admin = await userRepo.findOne({ where: { username: 'admin' } });
  if (!admin) {
    const hashed = await bcrypt.hash('123', 10);
    const newAdmin = userRepo.create({ username: 'admin', email: 'admin@admin.com', password: hashed, role: 'admin' });
    await userRepo.save(newAdmin);
    console.log('Admin user seeded');
  } else {
    console.log('Admin user already exists');
  }
} 
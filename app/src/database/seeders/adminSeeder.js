import bcrypt from 'bcryptjs';
import { User } from '../models/index.js';

export const seedAdmin = async () => {
  try {
    const adminEmail = 'admin@gmail.com';
    const adminUsername = 'admin';
    const adminPassword = 'Admin@123';
    const adminRole = 'admin';

    const existingAdmin = await User.findOne({
      where: { email: adminEmail, role: adminRole },
    });

    if (existingAdmin) {
      console.log('Admin already exists');
      return;
    }

    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    await User.create({
      username: adminUsername,
      email: adminEmail,
      password: hashedPassword,
      role: adminRole,
    });

    console.log(' Admin user created successfully!');
  } catch (error) {
    console.error('Failed to seed admin:', error.message);
  }
};

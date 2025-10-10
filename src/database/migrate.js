import { testConnection, syncDatabase } from './database.js';
const migrate = async () => {
  try {
    console.log('Starting Syncing...\n');
    const connected = await testConnection();
    if (!connected) {
      console.error(' Migration failed: Could not connect to database');
      process.exit(1);
    }
    await syncDatabase({ alter: true });
    process.exit(0);
  } catch (error) {
    console.error(' Syncing error:', error);
    process.exit(1);
  }
};

migrate();

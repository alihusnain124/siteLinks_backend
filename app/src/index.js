import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import config from './config/config.js';
import { testConnection, syncDatabase } from './database/database.js';
import routes from './routes/index.js';
import { errorHandler, notFoundHandler } from './utils/errorHandler.js';
import { seedAdmin } from './database/seeders/adminSeeder.js';

const app = express();

app.use(helmet());
app.use(cors(config.cors));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (config.nodeEnv === 'development') {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
  });
}

app.use('/api', routes);

app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Smart Link API is running',
    timestamp: new Date().toISOString(),
  });
});

app.use(notFoundHandler);
app.use(errorHandler);

const startServer = async () => {
  try {
    const dbConnected = await testConnection();

    if (!dbConnected) {
      console.error('Failed to connect to database. Please check your configuration.');
      process.exit(1);
    }
    // Uncomment to sync DB on startup (use with caution in prod)
    await syncDatabase({ alter: false });
    await seedAdmin();
    const PORT = config.port;
    app.listen(PORT, () => {
      console.log(` Server is running on port ${PORT}.`);
    });
  } catch (error) {
    console.error(' Error starting server:', error);
    process.exit(1);
  }
};

startServer();

export default app;

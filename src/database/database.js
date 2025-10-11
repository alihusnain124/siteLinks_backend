import { Sequelize } from 'sequelize';
import config from '../config/config.js';

const sequelize = new Sequelize(
  config.database.name,
  config.database.user,
  config.database.password,
  {
    host: config.database.host,
    port: config.database.port,
    dialect: config.database.dialect,
    logging: config.database.logging,
    pool: config.database.pool,
    define: {
      timestamps: true,
      underscored: false,
      freezeTableName: true,
    },
  },
);

export const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully.');
    return true;
  } catch (error) {
    console.error(' Unable to connect to the database:', error.message);
    return false;
  }
};

export const syncDatabase = async (options = {}) => {
  try {
    await sequelize.sync(options);
    console.log('Database synchronized successfully.');
    return true;
  } catch (error) {
    console.error(' Error synchronizing database:', error.message);
    return false;
  }
};

export { sequelize };

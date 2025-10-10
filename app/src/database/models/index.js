import { sequelize } from '../database.js';
import createUserModel from './User.js';
import createSiteLinkModel from './SiteLink.js';

const User = createUserModel(sequelize);
const SiteLink = createSiteLinkModel(sequelize);

export {
  sequelize,
  User,
  SiteLink
};

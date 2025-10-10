import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const SiteLink = sequelize.define('SiteLink', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    siteUrl: {
      type: DataTypes.STRING(500),
      allowNull: false,
      validate: {
        notNull: { msg: 'Site URL is required' },
        notEmpty: { msg: 'Site URL cannot be empty' },
        isUrl: { msg: 'Must be a valid URL' },
      },
    },
    title: {
      type: DataTypes.STRING(200),
      allowNull: false,
      validate: {
        notNull: { msg: 'Title is required' },
        notEmpty: { msg: 'Title cannot be empty' },
        len: {
          args: [1, 200],
          msg: 'Title must be between 1 and 200 characters',
        },
      },
    },
    coverImage: {
      type: DataTypes.STRING(500),
      allowNull: true,
      validate: {
        isUrl: { msg: 'Cover image must be a valid URL' },
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: { msg: 'Description is required' },
        notEmpty: { msg: 'Description cannot be empty' },
      },
    },
    category: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notNull: { msg: 'Category is required' },
        notEmpty: { msg: 'Category cannot be empty' },
        isIn: {
          args: [['Technology', 'Design', 'News', 'Education', 'Entertainment', 'Business', 'Health', 'Sports', 'Science', 'Other']],
          msg: 'Invalid category',
        },
      },
    },
  }, {
    tableName: 'site_links',
    timestamps: true,
  });

  SiteLink.prototype.toJSON = function () {
    const values = { ...this.get() };
    return values;
  };

  return SiteLink;
};

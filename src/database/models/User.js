import { DataTypes } from 'sequelize';
import bcrypt from 'bcryptjs';

export default (sequelize) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: {
          name: 'unique_username',
          msg: 'Username already exists',
        },
        validate: {
          notNull: { msg: 'Username is required' },
          notEmpty: { msg: 'Username cannot be empty' },
          len: {
            args: [3, 50],
            msg: 'Username must be between 3 and 50 characters',
          },
        },
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: {
          name: 'unique_email',
          msg: 'Email already exists',
        },
        validate: {
          notNull: { msg: 'Email is required' },
          notEmpty: { msg: 'Email cannot be empty' },
          isEmail: { msg: 'Must be a valid email address' },
        },
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          notNull: { msg: 'Password is required' },
          notEmpty: { msg: 'Password cannot be empty' },
          len: {
            args: [6, 255],
            msg: 'Password must be at least 6 characters',
          },
        },
      },
      role: {
        type: DataTypes.ENUM('admin', 'user'),
        allowNull: false,
        defaultValue: 'user',
        validate: {
          isIn: {
            args: [['admin', 'user']],
            msg: 'Role must be either admin or user',
          },
        },
      },
    },
    {
      tableName: 'users',
      timestamps: true,
      hooks: {
        beforeCreate: async (user) => {
          if (user.password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
          }
        },
        beforeUpdate: async (user) => {
          if (user.changed('password')) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
          }
        },
      },
    },
  );

  User.prototype.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
  };

  User.prototype.toJSON = function () {
    const values = { ...this.get() };
    delete values.password;
    return values;
  };

  return User;
};

import jwt from 'jsonwebtoken';
import { User } from '../database/models/index.js';
import config from '../config/config.js';

class AuthService {
  async signup(userData) {
    try {
      const { username, email, password, role } = userData;

      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) throw new Error('User with this email already exists');
      const existingUsername = await User.findOne({ where: { username } });
      if (existingUsername) throw new Error('Username is already taken');
      const user = await User.create({
        username,
        email,
        password,
        role: role || 'user',
      });
      const token = this.generateToken(user);
      return {
        user: user.toJSON(),
        token,
      };
    } catch (error) {
      throw error;
    }
  }

  async login(credentials) {
    try {
      const { email, password, role } = credentials;
      const user = await User.findOne({
        where: { email, role },
      });
      if (!user) throw new Error('User not exists');
      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) throw new Error('Invalid password');
      const token = this.generateToken(user);
      return {
        user: user.toJSON(),
        token,
      };
    } catch (error) {
      throw error;
    }
  }

  generateToken(user) {
    const payload = {
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
    };

    return jwt.sign(payload, config.jwt.secret, {
      expiresIn: config.jwt.expiresIn,
    });
  }

  verifyToken(token) {
    try {
      return jwt.verify(token, config.jwt.secret);
    } catch {
      throw new Error('Invalid or expired token');
    }
  }
}

export default new AuthService();

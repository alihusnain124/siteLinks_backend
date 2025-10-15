import jwt from 'jsonwebtoken';
import { User } from '../database/models/index.js';
import config from '../config/config.js';
import { ApiError } from '../utils/responseHandler.js';

class AuthService {
  async signup(userData) {
    const { username, email, password, role, token } = userData;
    await this.verifyCloudflareToken(token);
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) throw ApiError(400, 'User with this email already exists');
    const existingUsername = await User.findOne({ where: { username } });
    if (existingUsername) throw ApiError(400, 'Username is already taken');
    const user = await User.create({
      username,
      email,
      password,
      role: role || 'user',
    });
    const jwtToken = this.generateToken(user);
    return {
      user: user.toJSON(),
      token: jwtToken,
    };
  }

  async verifyCloudflareToken(token) {
    const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${process.env.TURNSTILE_SECRET_KEY}&response=${token}`,
    });
    const outcome = await verifyRes.json();
    if (!outcome.success) throw ApiError(400, 'Captcha failed');
    return true;
  }

  async login(credentials) {
    const { email, password, role, token } = credentials;
    await this.verifyCloudflareToken(token);
    const user = await User.findOne({
      where: { email, role },
    });
    if (!user) throw ApiError(400, 'User not found');
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) throw ApiError(400, 'Invalid password');
    const jwtToken = this.generateToken(user);
    return {
      user: user.toJSON(),
      token: jwtToken,
    };
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
    return jwt.verify(token, config.jwt.secret);
  }
}

export default new AuthService();

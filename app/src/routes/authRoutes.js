import express from 'express';
import * as authController from '../controllers/authController.js';
import { authValidators } from '../middlewares/validators.js';

const router = express.Router();

router.post('/signup', authValidators.signup, authController.signup);
router.post('/login', authValidators.login, authController.login);

export default router;

import express from 'express';
import authRoutes from './authRoutes.js';
import siteRoutes from './siteRoutes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/sites', siteRoutes);

export default router;

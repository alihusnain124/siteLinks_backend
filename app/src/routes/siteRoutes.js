import express from 'express';
import * as siteController from '../controllers/siteController.js';
import { siteValidators } from '../middlewares/validators.js';
import { authenticate } from '../middlewares/authMiddleware.js';
import { isAdmin } from '../middlewares/roleMiddleware.js';

const router = express.Router();

router.post('/', authenticate, isAdmin, siteValidators.create, siteController.createSite);
router.get('/', authenticate, siteValidators.getAll, siteController.getAllSites);
router.get('/:id', authenticate, siteValidators.getById, siteController.getSiteById);
router.put('/:id', authenticate, isAdmin, siteValidators.update, siteController.updateSite);
router.delete('/:id', authenticate, isAdmin, siteController.deleteSite);

/////ai 

router.post('/generate-desc', authenticate, isAdmin, siteController.generateDesc);


export default router;

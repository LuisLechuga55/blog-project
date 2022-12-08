import express from 'express';
import { adminController } from '../controllers/index.js';

const router = express.Router();

router
  .route('/register')
  .post(adminController.register);

router
  .route('/login')
  .post(adminController.login);

router
  .route('/')
  .get(adminController.getAllAdmin);

export default router;

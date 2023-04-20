import express from 'express'
import { registerContoller,loginController } from '../controllers/authController.js';
import { isLoggedIn } from '../middlewares/authMiddleWare.js';

const router = express.Router();

router.post('/register',registerContoller)
router.post('/login',isLoggedIn,loginController)

export default router;
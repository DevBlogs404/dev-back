const express = require('express');
const { registerContoller, loginController } = require('../controllers/authController');
const { isLoggedIn } = require('../middlewares/authMiddleWare');

const router = express.Router();

router.post('/register',registerContoller)
router.post('/login',isLoggedIn,loginController)

module.exports = router;
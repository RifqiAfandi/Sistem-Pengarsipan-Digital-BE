const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticateToken } = require('../middlewares/authMiddleware');

router.post('/login', authController.login);
router.post('/logout', authenticateToken, authController.logout);
router.get('/users', authenticateToken, authController.getAllUsers);
router.get('/users/:id', authenticateToken, authController.getUserById);

module.exports = router;
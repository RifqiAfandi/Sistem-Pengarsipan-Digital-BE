const express = require('express');
const router = express.Router();
const arsipController = require('../controllers/arsipController');
const { authenticateToken } = require('../middlewares/authMiddleware');
const { uploader } = require('../middlewares/uploader');

router.post('/arsip', authenticateToken, uploader.single('file'), arsipController.createArsip);
router.get('/arsip', authenticateToken, arsipController.getAllArsips);
router.get('/arsip/:id', authenticateToken, arsipController.getArsipById);
router.put('/arsip/:id', authenticateToken, uploader.single('file'), arsipController.updateArsip);
router.delete('/arsip/:id', authenticateToken, arsipController.deleteArsip);

module.exports = router;
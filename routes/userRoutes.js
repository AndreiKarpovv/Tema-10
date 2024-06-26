const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, userController.getAllUsers); 
router.get('/:id', authMiddleware, userController.getUserById); 
router.get('/search', authMiddleware, userController.searchUsers); 

router.put('/:id', authMiddleware, userController.updateUser); 
router.put('/:id/password', authMiddleware, userController.updateUserPassword);

router.delete('/:id, authMiddleware, userController.deleteUser);

module.exports = router;

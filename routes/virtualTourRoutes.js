const express = require('express');
const router = express.Router();
const virtualTourController = require('../controllers/virtualTourController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', virtualTourController.getAllTours);
router.get('/:id', virtualTourController.getTourById);
router.get('/title/:title', virtualTourController.getTourByTitle);

router.post('/', authMiddleware, virtualTourController.createTour);
router.put('/:id', authMiddleware, virtualTourController.updateTour);
router.delete('/:id', authMiddleware, virtualTourController.deleteTour);

module.exports = router;

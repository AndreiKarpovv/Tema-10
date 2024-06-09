const express = require('express');
const router = express.Router();
const exhibitController = require('../controllers/exhibitController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', exhibitController.getAllExhibits);
router.get('/search', exhibitController.searchExhibits); // Добавьте этот маршрут
router.get('/:id', exhibitController.getExhibitById);

router.post('/', authMiddleware, exhibitController.createExhibit);
router.put('/:id', authMiddleware, exhibitController.updateExhibit);
router.delete('/:id', authMiddleware, exhibitController.deleteExhibit);

module.exports = router;

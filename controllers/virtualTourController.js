const db = require('../models');
const { VirtualTour } = db;


exports.getAllTours = async (req, res) => {
  try {
    const tours = await VirtualTour.findAll();
    res.json(tours);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getTourById = async (req, res) => {
  const { id } = req.params;
  try {
    const tour = await VirtualTour.findByPk(id);
    if (!tour) {
      return res.status(404).json({ error: 'Tour not found' });
    }
    res.json(tour);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getTourByTitle = async (req, res) => {
  const { title } = req.params;
  try {
    const tour = await VirtualTour.findOne({ where: { title } });
    if (!tour) {
      return res.status(404).json({ error: 'Tour not found' });
    }
    res.json(tour);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.createTour = async (req, res) => {
  const { title, description, photo1, photo2, video1, audio1 } = req.body;
  try {
    const tour = await VirtualTour.create({
      title,
      description,
      photo1,
      photo2,
      video1,
      audio1
    });
    res.status(201).json(tour);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.updateTour = async (req, res) => {
  const { id } = req.params;
  const { title, description, photo1, photo2, video1, audio1 } = req.body;
  try {
    const tour = await VirtualTour.findByPk(id);
    if (!tour) {
      return res.status(404).json({ error: 'Tour not found' });
    }
    await tour.update({
      title,
      description,
      photo1,
      photo2,
      video1,
      audio1
    });
    res.json(tour);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.deleteTour = async (req, res) => {
  const { id } = req.params;
  try {
    const tour = await VirtualTour.findByPk(id);
    if (!tour) {
      return res.status(404).json({ error: 'Tour not found' });
    }
    await tour.destroy();
    res.json({ message: 'Tour deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

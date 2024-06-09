const { Exhibit } = require('../models');

exports.createExhibit = async (req, res) => {
  try {
    const { name, description, image, category, yearCreated } = req.body;
    await Exhibit.create({ name, description, image, category, yearCreated });
    res.status(201).send('Exhibit created');
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.getAllExhibits = async (req, res) => {
  try {
    const exhibits = await Exhibit.findAll();
    res.json(exhibits);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.updateExhibit = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, image, category, yearCreated } = req.body;
    await Exhibit.update({ name, description, image, category, yearCreated }, { where: { id } });
    res.send('Exhibit updated');
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.getExhibitById = async (req, res) => {
  try {
    const { id } = req.params;
    const exhibit = await Exhibit.findByPk(id);
    if (!exhibit) {
      return res.status(404).send('Exhibit not found');
    }
    res.json(exhibit);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.deleteExhibit = async (req, res) => {
  try {
    const { id } = req.params;
    await Exhibit.destroy({ where: { id } });
    res.send('Exhibit deleted');
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.searchExhibits = async (req, res) => {
  try {
    const { category, yearCreated } = req.query;
    const query = {};

    if (category) {
      query.category = category;
    }

    if (yearCreated) {
      query.yearCreated = yearCreated;
    }

    const exhibits = await Exhibit.findAll({ where: query });
    res.json(exhibits);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

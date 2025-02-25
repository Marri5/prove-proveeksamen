const Reindeer = require('../models/Reindeer');

exports.addReindeer = async (req, res) => {
  try {
    const { serialNumber, name, herd, birthDate } = req.body;
    const reindeer = new Reindeer({ serialNumber, name, herd, birthDate, owner: req.user.userId });
    await reindeer.save();
    res.status(201).json({ message: 'Reindeer registered successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllReindeer = async (req, res) => {
  try {
    const reindeers = await Reindeer.find().populate('owner', 'name email');
    res.json(reindeers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const mongoose = require('mongoose');

const ReindeerSchema = new mongoose.Schema({
  serialNumber: {
    type: String,
    required: [true, 'Please add a serial number'],
    unique: true
  },
  name: {
    type: String,
    required: [true, 'Please add a name']
  },
  flokk: {
    type: mongoose.Schema.ObjectId,
    ref: 'Herd',
    required: true
  },
  birthDate: {
    type: Date,
    required: [true, 'Please add a birth date']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Reindeer', ReindeerSchema);
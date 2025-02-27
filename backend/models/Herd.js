const mongoose = require('mongoose');

const HerdSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: 'Owner',
    required: true
  },
  name: {
    type: String,
    required: [true, 'Please add a herd name']
  },
  serialDivision: {
    type: String,
    required: [true, 'Please add a serial division']
  },
  buemerke_name: {
    type: String,
    required: [true, 'Please add a buemerke name']
  },
  buemerke_image: {
    type: String,
    default: 'no-image.jpg'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Herd', HerdSchema);
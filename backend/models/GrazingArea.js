const mongoose = require('mongoose');

const GrazingAreaSchema = new mongoose.Schema({
  primaryArea: {
    type: String,
    enum: ['NORD', 'SØR', 'LULE', 'PITE', 'UME', 'ENARE', 'SKOLT', 'KILDIN', 'AKKALA', 'TER'],
    required: [true, 'Please select a primary area']
  },
  counties: {
    type: [String],
    required: [true, 'Please add at least one county']
  }
});

module.exports = mongoose.model('GrazingArea', GrazingAreaSchema);
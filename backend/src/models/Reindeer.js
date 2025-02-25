const mongoose = require('mongoose');

const ReindeerSchema = new mongoose.Schema({
  serialNumber: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  herd: { type: String, required: true },
  birthDate: { type: Date, required: true },
});

module.exports = mongoose.model('Reindeer', ReindeerSchema);

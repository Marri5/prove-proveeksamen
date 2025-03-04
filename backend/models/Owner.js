const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const OwnerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name']
  },
  uuid: {
    type: String,
    required: [true, 'Please add a unique identifier'],
    unique: true
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6,
    select: false
  },
  contactLanguage: {
    type: String,
    enum: ['NORD', 'SØR', 'LULE', 'PITE', 'UME', 'ENARE', 'SKOLT', 'KILDIN', 'AKKALA', 'TER'],
    required: [true, 'Please select a contact language']
  },
  phoneNumber: {
    type: String,
    required: [true, 'Please add a phone number']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

OwnerSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

OwnerSchema.methods.getSignedJwtToken = function() {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

OwnerSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('Owner', OwnerSchema);
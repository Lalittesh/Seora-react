const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String
  },
  image: {
    type: String
  }
}, {
  timestamps: true
});

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;

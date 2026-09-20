const mongoose = require('mongoose');

const technicianSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    required: true
  },
  experience: {
    type: Number,
    default: 0
  },
  hourlyRate: {
    type: Number,
    required: true
  },
  availability: {
    type: Boolean,
    default: true
  },
  rating: {
    type: Number,
    default: 0
  },
  totalRatings: {
    type: Number,
    default: 0
  },
  bio: {
    type: String
  }
}, {
  timestamps: true
});

const Technician = mongoose.model('Technician', technicianSchema);

module.exports = Technician;

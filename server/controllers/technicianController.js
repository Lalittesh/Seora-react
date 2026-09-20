const Technician = require('../models/Technician');
const User = require('../models/User');
const Service = require('../models/Service');

const getTechnicians = async (req, res) => {
  try {
    const { service } = req.query;
    
    let query = {};
    if (service) {
      const serviceObj = await Service.findOne({ name: service });
      if (serviceObj) {
        query.service = serviceObj._id;
      } else {
        return res.json([]); 
      }
    }

    const technicians = await Technician.find(query)
      .populate('user', '-password')
      .populate('service');
      
    res.json(technicians);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const getMyProfile = async (req, res) => {
  try {
    const technician = await Technician.findOne({ user: req.user._id })
      .populate('user', '-password')
      .populate('service');

    if (technician) {
      res.json(technician);
    } else {
      res.status(404).json({ message: 'Technician profile not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const updateMyProfile = async (req, res) => {
  try {
    const { name, phone, location, service, experience, hourlyRate, availability, bio } = req.body;

    if (experience !== undefined && experience < 0) {
      return res.status(400).json({ message: 'Experience cannot be negative' });
    }
    if (hourlyRate !== undefined && hourlyRate < 0) {
      return res.status(400).json({ message: 'Hourly rate cannot be negative' });
    }

    const technician = await Technician.findOne({ user: req.user._id });

    if (!technician) {
      return res.status(404).json({ message: 'Technician profile not found' });
    }

    const user = await User.findById(req.user._id);
    if (name) user.name = name;
    if (phone) user.phone = phone;
    if (location !== undefined) user.location = location;
    await user.save();

    if (service) {
      const serviceObj = await Service.findOne({ name: service });
      if (!serviceObj) {
        return res.status(400).json({ message: 'Invalid service' });
      }
      technician.service = serviceObj._id;
    }

    if (experience !== undefined) technician.experience = experience;
    if (hourlyRate !== undefined) technician.hourlyRate = hourlyRate;
    if (availability !== undefined) technician.availability = availability;
    if (bio !== undefined) technician.bio = bio;

    await technician.save();

    const updatedTechnician = await Technician.findById(technician._id)
      .populate('user', '-password')
      .populate('service');

    res.json(updatedTechnician);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const getTechnicianById = async (req, res) => {
  try {
    const technician = await Technician.findById(req.params.id)
      .populate('user', '-password')
      .populate('service');

    if (technician) {
      res.json(technician);
    } else {
      res.status(404).json({ message: 'Technician not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getTechnicians,
  getTechnicianById,
  getMyProfile,
  updateMyProfile
};

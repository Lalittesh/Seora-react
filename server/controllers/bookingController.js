const Booking = require('../models/Booking');
const Technician = require('../models/Technician');
const Service = require('../models/Service');

const createBooking = async (req, res) => {
  try {
    const { technician: technicianId, service: serviceId, date, time, hours, serviceAddress } = req.body;

    if (!technicianId || !serviceId || !date || !time || hours === undefined || hours === null || !serviceAddress) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const parsedHours = Number(hours);
    if (!Number.isFinite(parsedHours) || parsedHours <= 0) {
      return res.status(400).json({ message: 'Hours must be greater than 0' });
    }

    const bookingDate = new Date(date);
    if (Number.isNaN(bookingDate.getTime())) {
      return res.status(400).json({ message: 'Invalid date' });
    }

    if (typeof time !== 'string' || !time.trim()) {
      return res.status(400).json({ message: 'Valid time is required' });
    }

    if (typeof serviceAddress !== 'string' || !serviceAddress.trim()) {
      return res.status(400).json({ message: 'Service address is required' });
    }

    const technician = await Technician.findById(technicianId).populate('service');
    if (!technician) {
      return res.status(404).json({ message: 'Technician not found' });
    }

    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    const techServiceId = technician.service._id
      ? technician.service._id.toString()
      : technician.service.toString();
    if (techServiceId !== service._id.toString()) {
      return res.status(400).json({ message: 'Technician does not belong to the selected service' });
    }

    const totalAmount = technician.hourlyRate * parsedHours;

    const booking = await Booking.create({
      customer: req.user._id,
      technician: technicianId,
      service: serviceId,
      date: bookingDate,
      time: time.trim(),
      hours: parsedHours,
      serviceAddress: serviceAddress.trim(),
      totalAmount,
      status: 'pending'
    });

    const populatedBooking = await Booking.findById(booking._id)
      .populate('customer', '-password')
      .populate({ path: 'technician', populate: { path: 'user', select: '-password' } })
      .populate('service');

    res.status(201).json(populatedBooking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const getCustomerBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ customer: req.user._id })
      .populate('customer', '-password')
      .populate({ path: 'technician', populate: { path: 'user', select: '-password' } })
      .populate('service')
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('customer', '-password')
      .populate({ path: 'technician', populate: { path: 'user', select: '-password' } })
      .populate('service');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    const isCustomer = booking.customer._id.toString() === req.user._id.toString();
    
    let isTechnician = false;
    if (req.user.role === 'technician') {
       isTechnician = booking.technician.user._id.toString() === req.user._id.toString();
    }

    if (!isCustomer && !isTechnician) {
      return res.status(403).json({ message: 'Not authorized to view this booking' });
    }

    res.json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (booking.customer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to cancel this booking' });
    }

    if (booking.status !== 'pending' && booking.status !== 'accepted') {
      return res.status(400).json({ message: `Cannot cancel booking with status: ${booking.status}` });
    }

    booking.status = 'cancelled';
    await booking.save();

    res.json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const getTechnicianRequests = async (req, res) => {
  try {
    const technician = await Technician.findOne({ user: req.user._id });
    if (!technician) return res.status(404).json({ message: 'Technician profile not found' });

    const bookings = await Booking.find({ technician: technician._id, status: 'pending' })
      .populate('customer', '-password')
      .populate({ path: 'technician', populate: { path: 'user', select: '-password' } })
      .populate('service')
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const updateBookingStatus = async (req, res, currentStatus, newStatus) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    const technician = await Technician.findOne({ user: req.user._id });
    if (!technician || booking.technician.toString() !== technician._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to modify this booking' });
    }

    if (booking.status !== currentStatus) {
      return res.status(400).json({ message: `Invalid status transition from ${booking.status} to ${newStatus}` });
    }

    booking.status = newStatus;
    await booking.save();

    res.json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const acceptBooking = (req, res) => updateBookingStatus(req, res, 'pending', 'accepted');
const rejectBooking = (req, res) => updateBookingStatus(req, res, 'pending', 'rejected');
const startJob = (req, res) => updateBookingStatus(req, res, 'accepted', 'in-progress');
const completeJob = (req, res) => updateBookingStatus(req, res, 'in-progress', 'completed');

const getTechnicianJobs = async (req, res) => {
  try {
    const technician = await Technician.findOne({ user: req.user._id });
    if (!technician) return res.status(404).json({ message: 'Technician profile not found' });

    const bookings = await Booking.find({ 
      technician: technician._id, 
      status: { $in: ['accepted', 'in-progress', 'completed'] } 
    })
      .populate('customer', '-password')
      .populate({ path: 'technician', populate: { path: 'user', select: '-password' } })
      .populate('service')
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const getBookingHistory = async (req, res) => {
  try {
    let query = { status: { $in: ['completed', 'rejected', 'cancelled'] } };
    
    if (req.user.role === 'customer') {
      query.customer = req.user._id;
    } else if (req.user.role === 'technician') {
      const technician = await Technician.findOne({ user: req.user._id });
      if (!technician) return res.status(404).json({ message: 'Technician profile not found' });
      query.technician = technician._id;
    }

    const bookings = await Booking.find(query)
      .populate('customer', '-password')
      .populate({ path: 'technician', populate: { path: 'user', select: '-password' } })
      .populate('service')
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  createBooking,
  getCustomerBookings,
  getBookingById,
  cancelBooking,
  getTechnicianRequests,
  acceptBooking,
  rejectBooking,
  getTechnicianJobs,
  startJob,
  completeJob,
  getBookingHistory
};

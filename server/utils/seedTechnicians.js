const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Technician = require('../models/Technician');
const { findServiceByName } = require('./serviceLookup');

const SEED_PASSWORD = 'SeoraTech2026!';

const SEED_TECHNICIANS = [
  {
    serviceName: 'Plumber',
    name: 'Marcus Rivera',
    email: 'marcus.rivera@seora.demo',
    phone: '555-0101',
    location: 'Downtown',
    experience: 9,
    hourlyRate: 68,
    rating: 4.9,
    availability: true
  },
  {
    serviceName: 'Plumber',
    name: 'Elena Voss',
    email: 'elena.voss@seora.demo',
    phone: '555-0102',
    location: 'Westside',
    experience: 6,
    hourlyRate: 62,
    rating: 4.7,
    availability: true
  },
  {
    serviceName: 'Electrician',
    name: 'David Chen',
    email: 'david.chen@seora.demo',
    phone: '555-0201',
    location: 'Midtown',
    experience: 11,
    hourlyRate: 75,
    rating: 4.8,
    availability: true
  },
  {
    serviceName: 'Electrician',
    name: 'Priya Nair',
    email: 'priya.nair@seora.demo',
    phone: '555-0202',
    location: 'North Hills',
    experience: 7,
    hourlyRate: 70,
    rating: 4.6,
    availability: true
  },
  {
    serviceName: 'Carpenter',
    name: 'Roberto Silva',
    email: 'roberto.silva@seora.demo',
    phone: '555-0301',
    location: 'East End',
    experience: 12,
    hourlyRate: 72,
    rating: 4.9,
    availability: true
  },
  {
    serviceName: 'Carpenter',
    name: 'Hannah Brooks',
    email: 'hannah.brooks@seora.demo',
    phone: '555-0302',
    location: 'Riverside',
    experience: 5,
    hourlyRate: 58,
    rating: 4.5,
    availability: true
  },
  {
    serviceName: 'Cleaner',
    name: 'Amara Okonkwo',
    email: 'amara.okonkwo@seora.demo',
    phone: '555-0401',
    location: 'Uptown',
    experience: 4,
    hourlyRate: 45,
    rating: 4.8,
    availability: true
  },
  {
    serviceName: 'Cleaner',
    name: 'Liam Fitzgerald',
    email: 'liam.fitzgerald@seora.demo',
    phone: '555-0402',
    location: 'South Bay',
    experience: 8,
    hourlyRate: 52,
    rating: 4.7,
    availability: true
  }
];

const PLUMBER_PLACEHOLDER_NAMES = [
  'Book Tech',
  'P4 Tech',
  'Updated Name',
  'UpdatedName',
  'Tech One'
];

const removePlumberPlaceholderTechnicians = async () => {
  const plumberService = await findServiceByName('Plumber');
  if (!plumberService) {
    return;
  }

  const placeholderUsers = await User.find({
    role: 'technician',
    name: { $in: PLUMBER_PLACEHOLDER_NAMES }
  });

  for (const user of placeholderUsers) {
    const technician = await Technician.findOne({
      user: user._id,
      service: plumberService._id
    });
    if (!technician) {
      continue;
    }

    await Technician.deleteOne({ _id: technician._id });
    await User.deleteOne({ _id: user._id });
    console.log(`Removed placeholder Plumber technician: ${user.name}`);
  }
};

const seedTechnicians = async () => {
  try {
    await removePlumberPlaceholderTechnicians();

    const hashedPassword = await bcrypt.hash(SEED_PASSWORD, await bcrypt.genSalt(10));

    for (const spec of SEED_TECHNICIANS) {
      const service = await findServiceByName(spec.serviceName);
      if (!service) {
        console.warn(`seedTechnicians: service not found: ${spec.serviceName}`);
        continue;
      }

      const email = spec.email.toLowerCase();
      let user = await User.findOne({ email });

      if (!user) {
        user = await User.create({
          name: spec.name,
          email,
          phone: spec.phone,
          password: hashedPassword,
          role: 'technician',
          location: spec.location
        });
        console.log(`Seeded technician user: ${spec.name}`);
      } else if (user.role === 'technician') {
        user.name = spec.name;
        user.phone = spec.phone;
        user.location = spec.location;
        await user.save();
      } else {
        console.warn(`seedTechnicians: skipped ${email} (not a technician account)`);
        continue;
      }

      let technician = await Technician.findOne({ user: user._id });
      if (!technician) {
        await Technician.create({
          user: user._id,
          service: service._id,
          experience: spec.experience,
          hourlyRate: spec.hourlyRate,
          availability: spec.availability,
          rating: spec.rating,
          totalRatings: 24
        });
        console.log(`Seeded technician profile: ${spec.name} (${spec.serviceName})`);
      } else {
        technician.service = service._id;
        technician.experience = spec.experience;
        technician.hourlyRate = spec.hourlyRate;
        technician.availability = spec.availability;
        technician.rating = spec.rating;
        await technician.save();
      }
    }
  } catch (error) {
    console.error('Error seeding technicians:', error);
  }
};

module.exports = seedTechnicians;

const Service = require('../models/Service');

const seedServices = async () => {
  try {
    const services = [
      { name: 'Plumber', description: 'Professional plumbing services' },
      { name: 'Electrician', description: 'Expert electrical services' },
      { name: 'Carpenter', description: 'Reliable carpentry and woodwork' },
      { name: 'Cleaner', description: 'Deep cleaning services for home and office' }
    ];

    for (const service of services) {
      const exists = await Service.findOne({ name: service.name });
      if (!exists) {
        await Service.create(service);
        console.log(`Seeded service: ${service.name}`);
      }
    }
  } catch (error) {
    console.error('Error seeding services:', error);
  }
};

module.exports = seedServices;

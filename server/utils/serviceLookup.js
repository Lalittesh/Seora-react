const Service = require('../models/Service');

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const findServiceByName = (name) => {
  if (!name || typeof name !== 'string') {
    return null;
  }
  return Service.findOne({
    name: { $regex: new RegExp(`^${escapeRegex(name.trim())}$`, 'i') }
  });
};

module.exports = { findServiceByName };

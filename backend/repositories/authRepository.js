const User = require("../models/User");
const NGO = require("../models/NGO");

const findUserByEmail = (email) => User.findOne({ email });
const findNGOByEmail = (email) => NGO.findOne({ email });

const createUser = (userData) => User.create(userData);
const createNGO = (ngoData) => NGO.create(ngoData);

module.exports = {
  findUserByEmail,
  findNGOByEmail,
  createUser,
  createNGO,
};

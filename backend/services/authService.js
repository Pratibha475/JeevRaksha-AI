const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authRepository = require("../repositories/authRepository");

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

const sanitizeDocument = (doc) => {
  const result = doc.toObject();
  delete result.password;
  return result;
};

const registerUser = async ({ name, email, password }) => {
  const existingUser = await authRepository.findUserByEmail(email);
  if (existingUser) {
    const error = new Error("User already exists");
    error.statusCode = 400;
    throw error;
  }

  const hashedPassword = await hashPassword(password);
  const user = await authRepository.createUser({
    name,
    email,
    password: hashedPassword,
    role: "user",
  });

  return {
    ...sanitizeDocument(user),
    token: generateToken(user._id, "user"),
    role: "user",
  };
};

const registerNGO = async ({ name, email, password }) => {
  const existingNGO = await authRepository.findNGOByEmail(email);
  if (existingNGO) {
    const error = new Error("NGO already exists");
    error.statusCode = 400;
    throw error;
  }

  const hashedPassword = await hashPassword(password);
  const ngo = await authRepository.createNGO({
    name,
    email,
    password: hashedPassword,
    role: "ngo",
  });

  return {
    ...sanitizeDocument(ngo),
    token: generateToken(ngo._id, "ngo"),
    role: "ngo",
  };
};

const loginUser = async ({ email, password }) => {
  const user = await authRepository.findUserByEmail(email);
  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 400;
    throw error;
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    const error = new Error("Invalid credentials");
    error.statusCode = 400;
    throw error;
  }

  return {
    ...user.toObject(),
    token: generateToken(user._id, "user"),
    role: "user",
  };
};

const loginNGO = async ({ email, password }) => {
  const ngo = await authRepository.findNGOByEmail(email);
  if (!ngo) {
    const error = new Error("NGO not found");
    error.statusCode = 400;
    throw error;
  }

  const isMatch = await bcrypt.compare(password, ngo.password);
  if (!isMatch) {
    const error = new Error("Invalid credentials");
    error.statusCode = 400;
    throw error;
  }

  return {
    ...ngo.toObject(),
    token: generateToken(ngo._id, "ngo"),
    role: "ngo",
  };
};

module.exports = {
  registerUser,
  registerNGO,
  loginUser,
  loginNGO,
};

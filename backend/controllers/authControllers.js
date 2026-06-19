const authService = require("../services/authService");

const sendError = (res, error) => {
  const status = error.statusCode || 500;
  res.status(status).json({ message: error.message || "Server Error" });
};

exports.registerUser = async (req, res) => {
  try {
    const data = await authService.registerUser(req.body);

    res.status(201).json({
      success: true,
      token: data.token,
      role: data.role,
      user: {
        id: data._id,
        name: data.name,
        email: data.email,
      },
    });
  } catch (error) {
    console.error("❌ REGISTER USER ERROR", error);
    sendError(res, error);
  }
};

exports.registerNGO = async (req, res) => {
  try {
    const data = await authService.registerNGO(req.body);

    res.status(201).json({
      success: true,
      token: data.token,
      role: data.role,
      ngo: {
        id: data._id,
        name: data.name,
        email: data.email,
      },
    });
  } catch (error) {
    console.error("❌ REGISTER NGO ERROR", error);
    sendError(res, error);
  }
};

exports.loginUser = async (req, res) => {
  try {
    const data = await authService.loginUser(req.body);

    res.status(200).json({
      success: true,
      token: data.token,
      role: data.role,
      user: {
        id: data._id,
        name: data.name,
        email: data.email,
      },
    });
  } catch (error) {
    console.error("❌ USER LOGIN ERROR", error);
    sendError(res, error);
  }
};

exports.loginNGO = async (req, res) => {
  try {
    const data = await authService.loginNGO(req.body);

    res.status(200).json({
      success: true,
      token: data.token,
      role: data.role,
      ngo: {
        id: data._id,
        name: data.name,
        email: data.email,
      },
    });
  } catch (error) {
    console.error("❌ NGO LOGIN ERROR", error);
    sendError(res, error);
  }
};

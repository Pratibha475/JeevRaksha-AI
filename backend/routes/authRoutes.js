const express = require("express");
const router = express.Router();
const authService = require("../services/authService");

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

router.post(
  "/register/user",
  asyncHandler(async (req, res) => {
    const data = await authService.registerUser(req.body);
    res.status(201).json({ success: true, token: data.token, role: data.role, user: { id: data._id, name: data.name, email: data.email } });
  })
);

router.post(
  "/register/ngo",
  asyncHandler(async (req, res) => {
    const data = await authService.registerNGO(req.body);
    res.status(201).json({ success: true, token: data.token, role: data.role, ngo: { id: data._id, name: data.name, email: data.email } });
  })
);

router.post(
  "/login/user",
  asyncHandler(async (req, res) => {
    const data = await authService.loginUser(req.body);
    res.status(200).json({ success: true, token: data.token, role: data.role, user: { id: data._id, name: data.name, email: data.email } });
  })
);

router.post(
  "/login/ngo",
  asyncHandler(async (req, res) => {
    const data = await authService.loginNGO(req.body);
    res.status(200).json({ success: true, token: data.token, role: data.role, ngo: { id: data._id, name: data.name, email: data.email } });
  })
);

module.exports = router;

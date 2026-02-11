const User = require("../models/user");

// GET PROFILE
exports.getProfile = async (req, res, next) => {
  try {
    res.json(req.user);
  } catch (err) {
    next(err);
  }
};

// UPDATE PROFILE
exports.updateProfile = async (req, res, next) => {
  try {
    const { name } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name },
      { new: true }
    ).select("-password");

    res.json(user);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getProfile: exports.getProfile,
  updateProfile: exports.updateProfile,
};
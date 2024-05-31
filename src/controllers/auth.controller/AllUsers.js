const User = require("../../models/user.model");

module.exports = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({ count: users.length, users });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while retrieving users" });
  }
};

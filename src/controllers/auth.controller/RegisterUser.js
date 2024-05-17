const bcrypt = require("bcrypt");
const User = require("../../models/user.model");
const envConstants = require("../../configs/constants");
const checkPasswordStrength = require("../../utils/helper");

module.exports = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password)
    return res.status(400).json({ msg: "Please fill in all fields." });

  try {
    // Check if email is allowed
    const allowedEmails = envConstants.ALLOWED_EMAILS.split(",");

    if (!allowedEmails.includes(email)) {
      return res.status(401).send("Unauthorized");
    }

    //checks if user already exists
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res
        .status(409)
        .json({ error: "User already exist", statusText: "fail" });
    }

    // Check if password is strong
    const isPasswordStrong = checkPasswordStrength(password);
    if (!isPasswordStrong) {
      return res.status(400).json({ msg: "Password is not strong" });
    }

    //hash password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    return res
      .status(201)
      .json({ statusText: "User created successfully", data: user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const bcrypt = require("bcrypt");
const User = require("../../models/user.model");
const envConstants = require("../../configs/constants");

module.exports = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password)
    return res.status(400).json({ msg: "Please fill in all fields." });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ msg: "Invalid email format." });
  }

  try {
    // Check if email is allowed
    const allowedEmails = envConstants.ALLOWED_EMAILS.split(",").map((e) =>
      e.toLowerCase(),
    );

    if (!allowedEmails.includes(email.toLowerCase())) {
      return res.status(401).json({ msg: "This email is Unauthorized" });
    }

    //checks if user already exists
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res
        .status(409)
        .json({ error: "User already exist", statusText: "fail" });
    }

    if (password.length < 6)
      return res
        .status(400)
        .json({ msg: "Password must be at least 6 characters." });

    //hash password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    if (!user) {
      console.log("error");
      return;
    }

    return res
      .status(201)
      .json({ statusText: "User created successfully", data: user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

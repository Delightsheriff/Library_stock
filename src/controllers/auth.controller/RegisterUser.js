const bcrypt = require("bcrypt");
const User = require("../../models/user.model");
const envConstants = require("../../configs/constants");
const checkPasswordStrength = require("../../utils/helper");

module.exports = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password)
      return res.status(400).json({ msg: "Please fill in all fields." });

    const allowedEmails = envConstants.ALLOWED_EMAILS.split(",");

    if (!allowedEmails.includes(email)) {
      return res.status(401).send("Unauthorized");
    }

    const passwordStrengthMessage = checkPasswordStrength(password);
    if (passwordStrengthMessage) {
      return res.status(400).json({ msg: passwordStrengthMessage });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    if (!user) {
      console.error("Error creating user:", err);
      return;
    }
    console.log(user);
    return res
      .status(201)
      .json({ statusText: "User created successfully", data: user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

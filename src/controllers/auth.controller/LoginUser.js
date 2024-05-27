const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
const User = require("../../models/user.model");
const envConstants = require("../../configs/constants");

module.exports = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ msg: "Please fill in all fields." });

  try {
    // Check if email is allowed
    const allowedEmails = envConstants.ALLOWED_EMAILS.split(",");

    if (!allowedEmails.includes(email)) {
      return res.status(401).send("Unauthorized");
    }

    const userExist = await User.findOne({ email: req.body.email }).select(
      "+password",
    );
    if (!userExist) {
      return res.status(400).json({
        error: "Invalid Email/password combination ",
        statusText: "fail",
      });
    }

    const isMatch = await bcrypt.compare(req.body.password, userExist.password);

    if (!isMatch) {
      return res.status(400).json({
        error: "Invalid Email/password combination ",
        statusText: "fail",
      });
    }

    const jwt = await sign(
      { id: userExist._id, username: userExist.username },
      envConstants.JWT_SECRET_KEY,
    );

    const refreshToken = sign(
      { id: userExist._id, username: userExist.username },
      envConstants.JWT_REFRESH_SECRET_KEY,
    );

    return res
      .status(201)
      .json({
        statusText: "Login Success",
        jwt,
        refreshToken,
        user: { ...userExist._doc, password: "hidden" },
      });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

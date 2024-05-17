const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    select: false, // Hide password by default
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
});

const User = model("User", UserSchema);
module.exports = User;

module.exports = function checkPasswordStrength(password) {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (regex.test(password)) {
    return "Password is strong";
  } else {
    return "Password is not strong";
  }
};

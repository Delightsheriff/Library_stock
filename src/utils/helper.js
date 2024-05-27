module.exports = function checkPasswordStrength(password) {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return {
    isValid: passwordRegex.test(password),
    message: getPasswordStrengthMessage(password),
  };
};

function getPasswordStrengthMessage(password) {
  if (!password) return "Password is required";
  if (password.length < 8) return "Password must be at least 8 characters long";
  if (!/[a-z]/.test(password))
    return "Password must contain at least one lowercase letter";
  if (!/[A-Z]/.test(password))
    return "Password must contain at least one uppercase letter";
  if (!/\d/.test(password)) return "Password must contain at least one number";
  if (!/[@$!%*?&]/.test(password))
    return "Password must contain at least one special character";
  return "Password is strong";
}

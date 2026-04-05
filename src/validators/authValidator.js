const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  // Au moins 8 caractères, 1 majuscule, 1 minuscule, 1 chiffre
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return passwordRegex.test(password);
};

const validateRegister = (data) => {
  const errors = {};

  if (!data.email || !data.email.trim()) {
    errors.email = 'Email est requis';
  } else if (!validateEmail(data.email)) {
    errors.email = 'Email invalide';
  }

  if (!data.password || !data.password.trim()) {
    errors.password = 'Mot de passe est requis';
  } else if (!validatePassword(data.password)) {
    errors.password = 'Le mot de passe doit contenir au moins 8 caractères, 1 majuscule, 1 minuscule et 1 chiffre';
  }

  if (!data.nom || !data.nom.trim()) {
    errors.nom = 'Nom est requis';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

const validateLogin = (data) => {
  const errors = {};

  if (!data.email || !data.email.trim()) {
    errors.email = 'Email est requis';
  } else if (!validateEmail(data.email)) {
    errors.email = 'Email invalide';
  }

  if (!data.password || !data.password.trim()) {
    errors.password = 'Mot de passe est requis';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

module.exports = {
  validateRegister,
  validateLogin,
  validateEmail,
  validatePassword
};

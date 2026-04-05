const authService = require('../services/authService');
const { validateRegister, validateLogin } = require('../validators/authValidator');

const register = async (req, res, next) => {
  try {
    const { email, password, nom, prenom } = req.body;

    // Valider les données
    const validation = validateRegister({ email, password, nom });
    if (!validation.isValid) {
      return res.status(400).json({
        error: 'Erreur de validation',
        details: validation.errors
      });
    }

    // Appeler le service
    const result = await authService.register(email, password, nom, prenom);

    res.status(201).json(result);
  } catch (error) {
    if (error.message === 'Cet email est déjà utilisé') {
      return res.status(400).json({
        error: error.message
      });
    }
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Valider les données
    const validation = validateLogin({ email, password });
    if (!validation.isValid) {
      return res.status(400).json({
        error: 'Erreur de validation',
        details: validation.errors
      });
    }

    // Appeler le service
    const result = await authService.login(email, password);

    res.status(200).json(result);
  } catch (error) {
    if (error.message === 'Email ou mot de passe incorrect') {
      return res.status(401).json({
        error: error.message
      });
    }
    next(error);
  }
};

module.exports = {
  register,
  login
};

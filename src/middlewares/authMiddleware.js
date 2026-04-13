const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const expectedToken = process.env.API_TOKEN;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token d\'authentification manquant' });
  }

  const token = authHeader.split(' ')[1];

  if (expectedToken && token === expectedToken) {
    req.user = { authType: 'api-token' };
    return next();
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'your-secret-key-change-in-production'
    );

    req.user = decoded;
    return next();
  } catch (error) {
    return res.status(401).json({ error: 'Token d\'authentification invalide' });
  }
};

module.exports = authMiddleware;

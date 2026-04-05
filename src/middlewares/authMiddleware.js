const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const expectedToken = process.env.API_TOKEN || 'my-secret-token';

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token d\'authentification manquant' });
  }

  const token = authHeader.split(' ')[1];
  if (token !== expectedToken) {
    return res.status(401).json({ error: 'Token d\'authentification invalide' });
  }

  next();
};

module.exports = authMiddleware;
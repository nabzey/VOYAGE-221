const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Zod validation errors
  if (err.name === 'ZodError') {
    return res.status(400).json({
      error: 'Données invalides',
      details: err.errors.map(e => ({
        field: e.path.join('.'),
        message: e.message
      }))
    });
  }

  // Prisma errors
  if (err.code) {
    switch (err.code) {
      case 'P2002':
        return res.status(409).json({ error: 'Contrainte d\'unicité violée' });
      case 'P2025':
        return res.status(404).json({ error: 'Ressource non trouvée' });
      default:
        return res.status(500).json({ error: 'Erreur de base de données' });
    }
  }

  // Default error
  res.status(500).json({ error: err.message || 'Erreur interne du serveur' });
};

module.exports = errorHandler;
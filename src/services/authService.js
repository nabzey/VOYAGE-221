const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../config/prisma');

const generateToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET || 'your-secret-key-change-in-production',
    { expiresIn: '7d' }
  );
};

const register = async (email, password, nom, prenom) => {
  // Vérifier si l'utilisateur existe déjà
  const existingUser = await prisma.user.findUnique({
    where: { email }
  });

  if (existingUser) {
    throw new Error('Cet email est déjà utilisé');
  }

  // Hasher le mot de passe
  const hashedPassword = await bcrypt.hash(password, 10);

  // Créer l'utilisateur
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      nom,
      prenom: prenom || ''
    },
    select: {
      id: true,
      email: true,
      nom: true,
      prenom: true
    }
  });

  // Générer le token JWT
  const token = generateToken(user.id);

  return {
    success: true,
    message: 'Utilisateur créé avec succès',
    token,
    user
  };
};

const login = async (email, password) => {
  // Rechercher l'utilisateur
  const user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user) {
    throw new Error('Email ou mot de passe incorrect');
  }

  // Vérifier le mot de passe
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error('Email ou mot de passe incorrect');
  }

  // Générer le token JWT
  const token = generateToken(user.id);

  return {
    success: true,
    message: 'Connexion réussie',
    token,
    user: {
      id: user.id,
      email: user.email,
      nom: user.nom,
      prenom: user.prenom
    }
  };
};

module.exports = {
  register,
  login,
  generateToken
};

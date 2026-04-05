const { z } = require('zod');

const clientSchema = z.object({
  prenom: z.string().min(1, 'Le prénom est requis'),
  nom: z.string().min(1, 'Le nom est requis'),
  email: z.string().email('Email invalide'),
  telephone: z.string().optional(),
  numeroPasseport: z.string().min(1, 'Le numéro de passeport est requis')
});

const clientUpdateSchema = clientSchema.partial();

module.exports = {
  clientSchema,
  clientUpdateSchema
};
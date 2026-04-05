const { z } = require('zod');

const circuitSchema = z.object({
  nom: z.string().min(1, 'Le nom est requis'),
  destinationId: z.number().int().positive('ID destination invalide'),
  duree: z.number().int().positive('Durée invalide'),
  prixParPersonne: z.number().positive('Prix invalide'),
  placesMax: z.number().int().positive('Places max invalides')
});

const circuitUpdateSchema = circuitSchema.partial();

module.exports = {
  circuitSchema,
  circuitUpdateSchema
};
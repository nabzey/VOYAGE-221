const { z } = require('zod');

const destinationSchema = z.object({
  code: z.string().min(1, 'Le code est requis'),
  pays: z.string().min(1, 'Le pays est requis'),
  ville: z.string().min(1, 'La ville est requise'),
  description: z.string().optional()
});

const destinationUpdateSchema = destinationSchema.partial();

module.exports = {
  destinationSchema,
  destinationUpdateSchema
};
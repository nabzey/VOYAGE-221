const { z } = require('zod');

const reservationSchema = z.object({
  clientId: z.number().int().positive('ID client invalide'),
  circuitId: z.number().int().positive('ID circuit invalide'),
  dateReservation: z.string().refine((date) => !isNaN(Date.parse(date)), 'Date invalide'),
  nombreParticipants: z.number().int().positive('Nombre de participants invalide'),
  montantTotal: z.number().positive('Montant total invalide'),
  statut: z.enum(['CONFIRMEE', 'ANNULEE', 'EN_ATTENTE']).optional()
});

const reservationUpdateSchema = reservationSchema.partial();

module.exports = {
  reservationSchema,
  reservationUpdateSchema
};
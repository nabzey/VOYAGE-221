const reservationRepository = require('../repositories/reservationRepository');
const clientRepository = require('../repositories/clientRepository');
const circuitRepository = require('../repositories/circuitRepository');
const { reservationSchema, reservationUpdateSchema } = require('../validators/reservationValidator');

class ReservationService {
  async create(data) {
    // Validate data
    reservationSchema.parse(data);

    // Check if client exists
    const client = await clientRepository.findById(data.clientId);
    if (!client) {
      throw new Error('Le client doit exister');
    }

    // Check if circuit exists
    const circuit = await circuitRepository.findById(data.circuitId);
    if (!circuit) {
      throw new Error('Le circuit doit exister');
    }

    if (data.nombreParticipants <= 0) {
      throw new Error('Le nombre de participants doit être > 0');
    }

    // Check if client already has confirmed reservation for this circuit
    const existingReservations = await reservationRepository.findByClient(data.clientId);
    const confirmedForCircuit = existingReservations.filter(r => r.circuitId === data.circuitId && r.statut === 'CONFIRMEE');
    if (confirmedForCircuit.length > 0) {
      throw new Error('Un client ne peut pas réserver deux fois le même circuit avec statut CONFIRMEE');
    }

    // Check available places
    const allReservations = await reservationRepository.findByCircuit(data.circuitId);
    const confirmedReservations = allReservations.filter(r => r.statut === 'CONFIRMEE');
    const totalParticipants = confirmedReservations.reduce((sum, res) => sum + res.nombreParticipants, 0);
    const availablePlaces = circuit.placesMax - totalParticipants;

    if (data.nombreParticipants > availablePlaces) {
      throw new Error(`Pas assez de places disponibles. Places disponibles: ${availablePlaces}`);
    }

    // Check date
    const reservationDate = new Date(data.dateReservation);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (reservationDate > today) {
      throw new Error('La date de reservation doit être inférieure ou égale à aujourd\'hui');
    }

    // Calculate montantTotal if not provided
    if (!data.montantTotal) {
      data.montantTotal = data.nombreParticipants * circuit.prixParPersonne;
    }

    data.statut = data.statut || 'CONFIRMEE';

    return await reservationRepository.create(data);
  }

  async findAll() {
    return await reservationRepository.findAll();
  }

  async findById(id) {
    const reservation = await reservationRepository.findById(id);
    if (!reservation) {
      throw new Error('Reservation non trouvée');
    }
    return reservation;
  }

  async update(id, data) {
    // Validate data
    reservationUpdateSchema.parse(data);

    // Check if reservation exists
    await this.findById(id);

    // Additional validations if needed
    if (data.clientId) {
      const client = await clientRepository.findById(data.clientId);
      if (!client) {
        throw new Error('Le client doit exister');
      }
    }

    if (data.circuitId) {
      const circuit = await circuitRepository.findById(data.circuitId);
      if (!circuit) {
        throw new Error('Le circuit doit exister');
      }
    }

    return await reservationRepository.update(id, data);
  }

  async delete(id) {
    // Check if reservation exists
    await this.findById(id);

    return await reservationRepository.delete(id);
  }

  async findByClient(clientId) {
    return await reservationRepository.findByClient(clientId);
  }

  async findByCircuit(circuitId) {
    return await reservationRepository.findByCircuit(circuitId);
  }
}

module.exports = new ReservationService();
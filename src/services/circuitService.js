const circuitRepository = require('../repositories/circuitRepository');
const destinationRepository = require('../repositories/destinationRepository');
const { circuitSchema, circuitUpdateSchema } = require('../validators/circuitValidator');

class CircuitService {
  async create(data) {
    // Validate data
    circuitSchema.parse(data);

    // Check if destination exists
    const destination = await destinationRepository.findById(data.destinationId);
    if (!destination) {
      throw new Error('La destination doit exister');
    }

    return await circuitRepository.create(data);
  }

  async findAll() {
    return await circuitRepository.findAll();
  }

  async findById(id) {
    const circuit = await circuitRepository.findById(id);
    if (!circuit) {
      throw new Error('Circuit non trouvé');
    }
    return circuit;
  }

  async update(id, data) {
    // Validate data
    circuitUpdateSchema.parse(data);

    // Check if circuit exists
    await this.findById(id);

    // Check destination if updating
    if (data.destinationId) {
      const destination = await destinationRepository.findById(data.destinationId);
      if (!destination) {
        throw new Error('La destination doit exister');
      }
    }

    return await circuitRepository.update(id, data);
  }

  async delete(id) {
    // Check if circuit exists
    await this.findById(id);

    // Check if has confirmed reservations
    const reservations = await circuitRepository.findReservations(id);
    const confirmedReservations = reservations.filter(r => r.statut === 'CONFIRMEE');
    if (confirmedReservations.length > 0) {
      throw new Error('Impossible de supprimer un circuit avec des reservations confirmees');
    }

    return await circuitRepository.delete(id);
  }
}

module.exports = new CircuitService();
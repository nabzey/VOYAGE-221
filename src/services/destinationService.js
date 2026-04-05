const destinationRepository = require('../repositories/destinationRepository');
const { destinationSchema, destinationUpdateSchema } = require('../validators/destinationValidator');

class DestinationService {
  async create(data) {
    // Validate data
    destinationSchema.parse(data);

    // Check if code exists
    const existingDestination = await destinationRepository.findByCode(data.code);
    if (existingDestination) {
      throw new Error('Le code doit être unique');
    }

    return await destinationRepository.create(data);
  }

  async findAll() {
    return await destinationRepository.findAll();
  }

  async findById(id) {
    const destination = await destinationRepository.findById(id);
    if (!destination) {
      throw new Error('Destination non trouvée');
    }
    return destination;
  }

  async update(id, data) {
    // Validate data
    destinationUpdateSchema.parse(data);

    // Check if destination exists
    await this.findById(id);

    // Check code uniqueness if updating code
    if (data.code) {
      const existingDestination = await destinationRepository.findByCode(data.code);
      if (existingDestination && existingDestination.id !== id) {
        throw new Error('Le code doit être unique');
      }
    }

    return await destinationRepository.update(id, data);
  }

  async delete(id) {
    // Check if destination exists
    await this.findById(id);

    // Check if has circuits
    const circuits = await destinationRepository.findCircuits(id);
    if (circuits.length > 0) {
      throw new Error('Impossible de supprimer une destination avec des circuits');
    }

    return await destinationRepository.delete(id);
  }
}

module.exports = new DestinationService();
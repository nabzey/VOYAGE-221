const clientRepository = require('../repositories/clientRepository');
const { clientSchema, clientUpdateSchema } = require('../validators/clientValidator');

class ClientService {
  async create(data) {
    // Validate data
    clientSchema.parse(data);

    // Check if email exists
    const existingClient = await clientRepository.findByEmail(data.email);
    if (existingClient) {
      throw new Error('L\'email doit être unique');
    }

    return await clientRepository.create(data);
  }

  async findAll() {
    return await clientRepository.findAll();
  }

  async findById(id) {
    const client = await clientRepository.findById(id);
    if (!client) {
      throw new Error('Client non trouvé');
    }
    return client;
  }

  async update(id, data) {
    // Validate data
    clientUpdateSchema.parse(data);

    // Check if client exists
    await this.findById(id);

    // Check email uniqueness if updating email
    if (data.email) {
      const existingClient = await clientRepository.findByEmail(data.email);
      if (existingClient && existingClient.id !== id) {
        throw new Error('L\'email doit être unique');
      }
    }

    return await clientRepository.update(id, data);
  }

  async delete(id) {
    // Check if client exists
    await this.findById(id);

    // Check if has reservations
    const reservations = await clientRepository.findReservations(id);
    if (reservations.length > 0) {
      throw new Error('Impossible de supprimer un client avec des reservations');
    }

    return await clientRepository.delete(id);
  }
}

module.exports = new ClientService();
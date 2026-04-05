const prisma = require('../config/prisma');

class DestinationRepository {
  async create(data) {
    return await prisma.destination.create({ data });
  }

  async findAll() {
    return await prisma.destination.findMany();
  }

  async findById(id) {
    return await prisma.destination.findUnique({
      where: { id }
    });
  }

  async findByCode(code) {
    return await prisma.destination.findUnique({
      where: { code }
    });
  }

  async update(id, data) {
    return await prisma.destination.update({
      where: { id },
      data
    });
  }

  async delete(id) {
    return await prisma.destination.delete({
      where: { id }
    });
  }

  async findCircuits(id) {
    return await prisma.circuit.findMany({
      where: { destinationId: id }
    });
  }
}

module.exports = new DestinationRepository();
const prisma = require('../config/prisma');

class CircuitRepository {
  async create(data) {
    return await prisma.circuit.create({ data });
  }

  async findAll() {
    return await prisma.circuit.findMany({
      include: { destination: true }
    });
  }

  async findById(id) {
    return await prisma.circuit.findUnique({
      where: { id },
      include: { destination: true }
    });
  }

  async update(id, data) {
    return await prisma.circuit.update({
      where: { id },
      data
    });
  }

  async delete(id) {
    return await prisma.circuit.delete({
      where: { id }
    });
  }

  async findReservations(id) {
    return await prisma.reservation.findMany({
      where: { circuitId: id }
    });
  }
}

module.exports = new CircuitRepository();
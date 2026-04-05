const prisma = require('../config/prisma');

class ReservationRepository {
  async create(data) {
    return await prisma.reservation.create({ data });
  }

  async findAll() {
    return await prisma.reservation.findMany({
      include: { client: true, circuit: true }
    });
  }

  async findById(id) {
    return await prisma.reservation.findUnique({
      where: { id },
      include: { client: true, circuit: true }
    });
  }

  async update(id, data) {
    return await prisma.reservation.update({
      where: { id },
      data
    });
  }

  async delete(id) {
    return await prisma.reservation.delete({
      where: { id }
    });
  }

  async findByClient(clientId) {
    return await prisma.reservation.findMany({
      where: { clientId },
      include: { circuit: true }
    });
  }

  async findByCircuit(circuitId) {
    return await prisma.reservation.findMany({
      where: { circuitId },
      include: { client: true }
    });
  }
}

module.exports = new ReservationRepository();
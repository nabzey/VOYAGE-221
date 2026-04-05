const prisma = require('../config/prisma');

class ClientRepository {
  async create(data) {
    return await prisma.client.create({ data });
  }

  async findAll() {
    return await prisma.client.findMany();
  }

  async findById(id) {
    return await prisma.client.findUnique({
      where: { id }
    });
  }

  async findByEmail(email) {
    return await prisma.client.findUnique({
      where: { email }
    });
  }

  async update(id, data) {
    return await prisma.client.update({
      where: { id },
      data
    });
  }

  async delete(id) {
    return await prisma.client.delete({
      where: { id }
    });
  }

  async findReservations(id) {
    return await prisma.reservation.findMany({
      where: { clientId: id }
    });
  }
}

module.exports = new ClientRepository();
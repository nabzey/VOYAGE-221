const reservationService = require('../services/reservationService');

const reservationController = {
  async create(req, res) {
    try {
      const reservation = await reservationService.create(req.body);
      res.status(201).json(reservation);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async findAll(req, res) {
    try {
      const reservations = await reservationService.findAll();
      res.json(reservations);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async findById(req, res) {
    try {
      const { id } = req.params;
      const reservation = await reservationService.findById(parseInt(id));
      res.json(reservation);
    } catch (error) {
      if (error.message === 'Reservation non trouvée') {
        return res.status(404).json({ error: error.message });
      }
      res.status(500).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const reservation = await reservationService.update(parseInt(id), req.body);
      res.json(reservation);
    } catch (error) {
      if (error.message.includes('non trouvée') || error.message.includes('doit exister')) {
        return res.status(400).json({ error: error.message });
      }
      res.status(500).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      await reservationService.delete(parseInt(id));
      res.json({ message: 'Reservation supprimée' });
    } catch (error) {
      if (error.message.includes('non trouvée')) {
        return res.status(400).json({ error: error.message });
      }
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = reservationController;

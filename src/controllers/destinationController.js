const destinationService = require('../services/destinationService');

const destinationController = {
  async create(req, res) {
    try {
      const destination = await destinationService.create(req.body);
      res.status(201).json(destination);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async findAll(req, res) {
    try {
      const destinations = await destinationService.findAll();
      res.json(destinations);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async findById(req, res) {
    try {
      const { id } = req.params;
      const destination = await destinationService.findById(parseInt(id));
      res.json(destination);
    } catch (error) {
      if (error.message === 'Destination non trouvée') {
        return res.status(404).json({ error: error.message });
      }
      res.status(500).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const destination = await destinationService.update(parseInt(id), req.body);
      res.json(destination);
    } catch (error) {
      if (error.message.includes('non trouvée') || error.message.includes('unique')) {
        return res.status(400).json({ error: error.message });
      }
      res.status(500).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      await destinationService.delete(parseInt(id));
      res.json({ message: 'Destination supprimée' });
    } catch (error) {
      if (error.message.includes('non trouvée') || error.message.includes('Impossible')) {
        return res.status(400).json({ error: error.message });
      }
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = destinationController;

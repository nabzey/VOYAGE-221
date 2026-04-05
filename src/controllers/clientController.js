const clientService = require('../services/clientService');

const clientController = {
  async create(req, res) {
    try {
      const client = await clientService.create(req.body);
      res.status(201).json(client);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async findAll(req, res) {
    try {
      const clients = await clientService.findAll();
      res.json(clients);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async findById(req, res) {
    try {
      const { id } = req.params;
      const client = await clientService.findById(parseInt(id));
      res.json(client);
    } catch (error) {
      if (error.message === 'Client non trouvé') {
        return res.status(404).json({ error: error.message });
      }
      res.status(500).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const client = await clientService.update(parseInt(id), req.body);
      res.json(client);
    } catch (error) {
      if (error.message.includes('non trouvé') || error.message.includes('unique')) {
        return res.status(400).json({ error: error.message });
      }
      res.status(500).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      await clientService.delete(parseInt(id));
      res.json({ message: 'Client supprimé' });
    } catch (error) {
      if (error.message.includes('non trouvé') || error.message.includes('Impossible')) {
        return res.status(400).json({ error: error.message });
      }
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = clientController;

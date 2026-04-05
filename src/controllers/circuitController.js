const circuitService = require('../services/circuitService');

const circuitController = {
  async create(req, res) {
    try {
      const circuit = await circuitService.create(req.body);
      res.status(201).json(circuit);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async findAll(req, res) {
    try {
      const circuits = await circuitService.findAll();
      res.json(circuits);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async findById(req, res) {
    try {
      const { id } = req.params;
      const circuit = await circuitService.findById(parseInt(id));
      res.json(circuit);
    } catch (error) {
      if (error.message === 'Circuit non trouvé') {
        return res.status(404).json({ error: error.message });
      }
      res.status(500).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const circuit = await circuitService.update(parseInt(id), req.body);
      res.json(circuit);
    } catch (error) {
      if (error.message.includes('non trouvé') || error.message.includes('doit exister')) {
        return res.status(400).json({ error: error.message });
      }
      res.status(500).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      await circuitService.delete(parseInt(id));
      res.json({ message: 'Circuit supprimé' });
    } catch (error) {
      if (error.message.includes('non trouvé') || error.message.includes('Impossible')) {
        return res.status(400).json({ error: error.message });
      }
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = circuitController;

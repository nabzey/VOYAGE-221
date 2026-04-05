const express = require('express');
const circuitController = require('../controllers/circuitController');
const authMiddleware = require('../middlewares/authMiddleware');
const { validateRequest } = require('../middlewares/helpers');
const { circuitSchema, circuitUpdateSchema } = require('../validators/circuitValidator');

const router = express.Router();

router.post('/', authMiddleware, validateRequest(circuitSchema), circuitController.create);
router.get('/', authMiddleware, circuitController.findAll);
router.get('/:id', authMiddleware, circuitController.findById);
router.put('/:id', authMiddleware, validateRequest(circuitUpdateSchema), circuitController.update);
router.delete('/:id', authMiddleware, circuitController.delete);

module.exports = router;

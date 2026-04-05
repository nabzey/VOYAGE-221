const express = require('express');
const clientController = require('../controllers/clientController');
const authMiddleware = require('../middlewares/authMiddleware');
const { validateRequest } = require('../middlewares/helpers');
const { clientSchema, clientUpdateSchema } = require('../validators/clientValidator');

const router = express.Router();

router.post('/', authMiddleware, validateRequest(clientSchema), clientController.create);
router.get('/', authMiddleware, clientController.findAll);
router.get('/:id', authMiddleware, clientController.findById);
router.put('/:id', authMiddleware, validateRequest(clientUpdateSchema), clientController.update);
router.delete('/:id', authMiddleware, clientController.delete);

module.exports = router;

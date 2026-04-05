const express = require('express');
const destinationController = require('../controllers/destinationController');
const authMiddleware = require('../middlewares/authMiddleware');
const { validateRequest } = require('../middlewares/helpers');
const { destinationSchema, destinationUpdateSchema } = require('../validators/destinationValidator');

const router = express.Router();

router.post('/', authMiddleware, validateRequest(destinationSchema), destinationController.create);
router.get('/', authMiddleware, destinationController.findAll);
router.get('/:id', authMiddleware, destinationController.findById);
router.put('/:id', authMiddleware, validateRequest(destinationUpdateSchema), destinationController.update);
router.delete('/:id', authMiddleware, destinationController.delete);

module.exports = router;

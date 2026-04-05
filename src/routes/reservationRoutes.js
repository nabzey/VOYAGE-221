const express = require('express');
const reservationController = require('../controllers/reservationController');
const authMiddleware = require('../middlewares/authMiddleware');
const { validateRequest } = require('../middlewares/helpers');
const { reservationSchema, reservationUpdateSchema } = require('../validators/reservationValidator');

const router = express.Router();

router.post('/', authMiddleware, validateRequest(reservationSchema), reservationController.create);
router.get('/', authMiddleware, reservationController.findAll);
router.get('/:id', authMiddleware, reservationController.findById);
router.put('/:id', authMiddleware, validateRequest(reservationUpdateSchema), reservationController.update);
router.delete('/:id', authMiddleware, reservationController.delete);

module.exports = router;

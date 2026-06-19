import {Router} from 'express';
import {
    createCar,
    getCars,
    getCarById,
    updateCar,
    deleteCar,
    getCarsLowMileage,
    getNewCars,
    getMostExpensiveCar,
} from '../controllers/car.controller';

const router = Router();

// Specified routes
router.get('/low-mileage', getCarsLowMileage);
router.get('/new', getNewCars);
router.get('/most-expensive', getMostExpensiveCar);

// CRUD routes
router.get('/', getCars);
router.get('/:id', getCarById);
router.post('/', createCar);
router.put('/:id', updateCar);
router.delete('/:id', deleteCar);

export default router;
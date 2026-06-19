import {Router} from 'express';
import {
    createBuyer,
    getBuyers,
    getBuyerById,
    updateBuyer,
    deleteBuyer,
    getBuyersByCarParams,
} from '../controllers/buyer.controller';

const router = Router();

// Specified routes
router.get('/search-by-car-params', getBuyersByCarParams);

// CRUD routes
router.get('/', getBuyers);
router.get('/:id', getBuyerById);
router.post('/', createBuyer);
router.put('/:id', updateBuyer);
router.delete('/:id', deleteBuyer);

export default router;
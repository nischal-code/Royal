import { Router } from 'express';
import { asyncHandler } from '../middleware/errorHandler.js';
import { createEnquiry, listEnquiries, updateEnquiryStatus } from '../controllers/contactController.js';

const router = Router();

router.post('/', asyncHandler(createEnquiry));
router.get('/', asyncHandler(listEnquiries));
router.patch('/:id/status', asyncHandler(updateEnquiryStatus));

export default router;

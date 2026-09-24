import { Router } from 'express';
import { upload } from '../middleware/upload.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import {
  createPlannerBrief,
  listPlannerBriefs,
  getPlannerBrief,
  downloadPlannerBriefPdf,
  updatePlannerBriefStatus,
} from '../controllers/plannerController.js';

const router = Router();

router.post('/', upload.array('references', 15), asyncHandler(createPlannerBrief));
router.get('/', asyncHandler(listPlannerBriefs));
router.get('/:id', asyncHandler(getPlannerBrief));
router.get('/:id/pdf', asyncHandler(downloadPlannerBriefPdf));
router.patch('/:id/status', asyncHandler(updatePlannerBriefStatus));

export default router;

import { Router } from 'express';
import { TaskController } from '../controllers/taskController';
import { authMiddleware } from '../middleware/authMiddleware';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();

router.post('/', asyncHandler(TaskController.create));
router.get('/', asyncHandler(TaskController.list));
router.put('/:id', authMiddleware, asyncHandler(TaskController.update));

export default router; 
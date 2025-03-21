import { updateBalance } from '#controllers/user.controller.js';
import { handleValidationErrors } from '#middlewares/handleValidationErrors.middleware.js';
import { updateBalanceValidator } from '#middlewares/validation.middleware.js';
import { Router } from 'express';


const router = Router();

router.post('/update-balance', updateBalanceValidator, handleValidationErrors, updateBalance);

export default router;
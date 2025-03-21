import { updateUserBalance } from '#services/user.service.js';
import { NextFunction, Request, Response } from 'express';

interface RequestBody {
    amount: number;
    userId: number;
}

export async function updateBalance(req: Request, res: Response, next: NextFunction) {
    try {
        const { amount, userId } = req.body as RequestBody;
        const updatedUser = await updateUserBalance(userId, amount);
        res.json({ message: 'Баланс обновлён', user: updatedUser });
    } catch (error) {
        next(error);
    }
}

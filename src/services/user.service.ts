import { sequelize } from '#config/db.config.js';
import User from '#models/user.model.js';
import { HTTPError } from '#types.js';
import { Op, Transaction } from 'sequelize';


export async function updateUserBalance(userId: number, amount: number) {
    if (!Number.isFinite(amount)) {
        throw new HTTPError(400, 'Сумма должна быть числом');
    }
    return sequelize.transaction(async (transaction: Transaction) => {
        const user = await User.findByPk(userId, { transaction });

        if (!user) {
            throw new HTTPError(404, 'Пользователь не найден');
        }

        if (amount < 0) {
            const canWithdraw = await User.findOne({
                transaction,
                where: {
                    balance: { [Op.gte]: Math.abs(amount) },
                    id: userId
                }
            });

            if (!canWithdraw) {
                throw new HTTPError(400, 'Недостаточно средств');
            }
        }

        await User.increment('balance', { by: amount, transaction, where: { id: userId } });

        const updatedUser = await User.findByPk(userId, { transaction });
        return updatedUser;
    });

}

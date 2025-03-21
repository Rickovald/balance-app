import app from '#app.js';
import { sequelize } from '#config/db.config.js';
import User from '#models/user.model.js';
import request from 'supertest';
import { beforeAll, describe, expect, it } from 'vitest';


describe('Обновление баланса пользователя (нагрузочный тест)', () => {
    beforeAll(async () => {
        await sequelize.sync({ force: true });
        await User.create({ balance: 10000 });
    });

    it('При одновременном снятии 2 единиц 10000 запросами должно пройти ровно 5000', async () => {
        const successResponses = [];
        const errorResponses = [];

        for (let i = 0; i < 10000; i++) {
            const response = await request(app).post('/users/update-balance').send({ amount: -2, userId: 1 });
            if (response.status === 200) {
                successResponses.push(response);
            } else {
                errorResponses.push(response);
            }
        }

        expect(successResponses.length).toBe(5000);
        expect(errorResponses.length).toBe(5000);
    }, 60000);
});

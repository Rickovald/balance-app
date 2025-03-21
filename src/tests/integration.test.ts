import app from '#app.js';
import { sequelize } from '#config/db.config.js';
import User from '#models/user.model.js';
import request from 'supertest';
import { beforeEach, describe, expect, it } from 'vitest';

interface UpdateBalanceResponse {
    errors?: unknown; // Если валидация не прошла
    message: string;
    user: { balance: number; };
}

describe('Интеграционные тесты обновления баланса', () => {
    beforeEach(async () => {
        // Обновляем базу для каждого теста
        await sequelize.sync({ force: true });
        await User.create({ balance: 10000 });
    });

    it('Успешное обновление баланса с корректными данными', async () => {
        const res = await request(app)
            .post('/users/update-balance')
            .send({ amount: -500, userId: 1 });
        const body = res.body as UpdateBalanceResponse;
        expect(res.status).toBe(200);
        expect(body).toHaveProperty('message', 'Баланс обновлён');
        expect(body.user.balance).toBe(9500);
    });

    it('Ошибка валидации при некорректном userId', async () => {
        const res = await request(app)
            .post('/users/update-balance')
            .send({ amount: -500, userId: 'abc' });
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('errors');
    });

    it('Ошибка при попытке списать больше, чем доступно', async () => {
        const res = await request(app)
            .post('/users/update-balance')
            .send({ amount: -20000, userId: 1 });
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('message', 'Недостаточно средств');
    });
});

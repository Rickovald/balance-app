import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Отключаем параллельное выполнение тестов
    concurrent: false,
    // Устанавливаем таймаут на выполнение каждого теста (по умолчанию 5000мс)
    timeout: 10000, // Увеличиваем таймаут, если нужно больше времени
  },
});

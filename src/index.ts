import app from '#app.js';
import dotenv from 'dotenv';
import cluster from 'node:cluster';
import os from 'node:os';

dotenv.config();

const port = process.env.PORT ?? 3000;

if (cluster.isPrimary) {
    const numCPUs = os.cpus().length;

    console.log(`Мастер процесс ${process.pid.toString()} запущен`);

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker,) => {
        console.log(`Рабочий процесс ${worker.process.pid?.toString() ?? 'unknown'} завершен`);
    });
} else {
    app.listen(port, () => {
        console.log(`Сервер запущен на порту ${String(port)}. Процесс ${process.pid.toString()}`);
    });
}
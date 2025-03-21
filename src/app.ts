import { umzug } from '#config/db.config.js';
import { errorHandler } from '#middlewares/errorHandler.middleware.js';
import userRouter from '#routes/user.routes.js';
import { HTTPError } from '#types.js';
import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';

const app = express();
app.use(morgan('combined'));
app.use(express.json());

app.use('/users', userRouter);

app.use(
  errorHandler as (
    err: Error | HTTPError,
    req: Request,
    res: Response,
    next: NextFunction
  ) => void
);

umzug
  .up()
  .then(() => {
    console.log('Миграции выполнены');
  })
  .catch((err: unknown) => {
    console.error('Ошибка миграций:', err);
  });

export default app;
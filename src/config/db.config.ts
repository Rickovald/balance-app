import { config } from 'dotenv';
import { Sequelize } from 'sequelize';
import { SequelizeStorage, Umzug } from 'umzug';


config();

export const sequelize = new Sequelize(
    process.env.DB_NAME ?? 'testdb',
    process.env.DB_USER ?? 'postgres',
    process.env.DB_PASSWORD ?? 'postgres',
    {
        dialect: 'postgres',
        host: process.env.DB_HOST,
        logging: false,
        port: Number(process.env.DB_PORT),
    }
);

export const umzug = new Umzug({
    context: sequelize,
    logger: console,
    migrations: { glob: 'src/migrations/*.ts' },
    storage: new SequelizeStorage({ sequelize }),
});

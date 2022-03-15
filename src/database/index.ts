import { Sequelize } from 'sequelize';
import { config } from 'dotenv';
import pg from 'pg';
import cls from 'cls-hooked';

config();

const {
  HOST = '',
  USERNAME = '',
  PASSWORD = '',
  DBNAME = '',
  NODE_ENV = '',
  LAMBDA_FUNCTION_TIMEOUT = 15000,
  MAX_CONNECTIONS_POOL = 1,
} = process.env;

const namespace = cls.createNamespace(NODE_ENV);
Sequelize.useCLS(namespace);

const sequelize = NODE_ENV === 'test' ? new Sequelize('sqlite::memory:', { logging: false }) : new Sequelize(DBNAME, USERNAME, PASSWORD, {
  host: HOST,
  dialect: 'postgres',
  dialectModule: pg,
  pool: {
    min: 0,
    max: Number(MAX_CONNECTIONS_POOL),
    idle: 150,
    evict: Number(LAMBDA_FUNCTION_TIMEOUT),
  },
  dialectOptions: {
    supportBigNumbers: true,
  },
  logging: false,
});

export default sequelize;

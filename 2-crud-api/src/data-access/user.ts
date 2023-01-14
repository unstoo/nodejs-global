import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.PG) {
  process.stderr.write('Missing PG config details.\n');
  process.exit(1);
}

export const sequelize = new Sequelize(process.env.PG);

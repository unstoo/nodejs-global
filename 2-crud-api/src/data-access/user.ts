import { Sequelize } from 'sequelize';

if (!process.env.PG) {
  process.stderr.write('Missing PG config details.\n');
  process.exit(1);
}

export const sequelize = new Sequelize(process.env.PG);

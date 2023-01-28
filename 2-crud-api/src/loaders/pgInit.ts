import fs from 'node:fs';
import { Sequelize } from 'sequelize';

export const pgInit = async () => {
  if (!process.env.PG || !process.env.PG_INIT_SQL) {
    process.stderr.write('Missing PG config details.\n');
    process.exit(1);
  }
  
  const sqlString = fs.readFileSync(process.env.PG_INIT_SQL, 'utf8');
  const sequelize = new Sequelize(process.env.PG);
  await sequelize.query(sqlString);
  process.stdout.write('Finished initializing database.\n');
};
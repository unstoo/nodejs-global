import fs from 'node:fs';
import { Sequelize } from 'sequelize';

export const pgInit = async () => {
  try {
    if (!process.env.PG || !process.env.PG_INIT_USERS || !process.env.PG_INIT_GROUPS) {
      process.stderr.write('Missing PG config details.\n');
      process.exit(1);
    }
    const sequelize = new Sequelize(process.env.PG);
    
    const sqlUsers = fs.readFileSync(process.env.PG_INIT_USERS, 'utf8');
    await sequelize.query(sqlUsers);
    process.stdout.write('Finished initializing users table.\n');
  
    const sqlGroups = fs.readFileSync(process.env.PG_INIT_GROUPS, 'utf8');
    await sequelize.query(sqlGroups);
    process.stdout.write('Finished initializing groups table.\n');
    return sequelize;
  } catch (err) {
    process.stderr.write('Failed to init DB:\n');
    process.stderr.write(err + '\n');
    process.exit(1);
  }
}
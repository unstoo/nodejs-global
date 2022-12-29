import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
  res.send('Express TypeScript Server: ' + uuidv4());
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
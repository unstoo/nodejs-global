import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
import { NewUserDTO, addUserSchema, AddUserSchema, patchUserSchema, PatchUserSchema, autoSuggestSchema, AutoSuggestSchema } from './models';
import { users } from './data';
import { ValidatedRequest } from 'express-joi-validation';
import {
  StatusCodes,
} from 'http-status-codes';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  const { id } = req.query;
  const user = users[id as string];
  const data = (!user || user.isDeleted) ?? user;
  res.status(StatusCodes.OK).json(data);
});

app.post('/addUser', addUserSchema, (req: ValidatedRequest<AddUserSchema>, res: Response
  ) => {
  const { login, password, age } = req.body as NewUserDTO
  const id = uuidv4();
  users[id] = {
    id,
    login,
    password,
    age,
    isDeleted: false,
  };

  res.status(StatusCodes.OK).json(id);
});

app.patch('/patchUser', patchUserSchema, (req: ValidatedRequest<PatchUserSchema>, res: Response) => {
  const { id, login, password, age } = req.body
  const user = users[id];
  if (!user || user.isDeleted) {
    return res.status(StatusCodes.BAD_REQUEST).json(false);
  }

  user.login = login;
  user.password = password;
  user.age = age;
  res.status(StatusCodes.OK).json(true);
});

app.delete('/deleteUser', (req: Request, res: Response) => {
  const { id } = req.body;
  const user = users[id as string];
  if (!user || user.isDeleted) {
    return res.status(StatusCodes.BAD_REQUEST).json(false);
  }

  user.isDeleted = true;
  res.status(StatusCodes.OK).json(true);
});

app.get('/autoSuggest', autoSuggestSchema, (req: ValidatedRequest<AutoSuggestSchema>, res: Response) => {
  const { loginSubstring, limit } = req.query;

  const result = Object
    .values(users)
    .filter(user => user.login.includes(loginSubstring) && !user.isDeleted)
    .sort((a, b) => a.login.localeCompare(b.login))
    .slice(0, limit);

  res.status(StatusCodes.OK).json(result);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
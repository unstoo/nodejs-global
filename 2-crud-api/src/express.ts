import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
import { UserDTO, NewUserDTO, addUserSchema, AddUserSchema, patchUserSchema, PatchUserSchema } from './models';
import { users } from './data';
import { ValidatedRequest } from 'express-joi-validation'

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  const { id } = req.query;
  const user = users[id as string];
  const data = !user || user.isDeleted ? null : user;
  res.json(data);
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

  res.json(id);
});

app.patch('/patchUser', patchUserSchema, (req: ValidatedRequest<PatchUserSchema>, res: Response) => {
  const { id, login, password, age } = req.body as UserDTO
  const user = users[id];
  if (!user || user.isDeleted) {
    return res.json(false);
  }

  user.login = login;
  user.password = password;
  user.age = age;
  res.json(true);
});

app.delete('/deleteUser', (req: Request, res: Response) => {
  const { id } = req.body;
  const user = users[id as string];
  if (!user || user.isDeleted) {
    return res.json(false);
  }

  user.isDeleted = true;
  res.json(true);
});

app.get('/autoSuggest', (req: Request, res: Response) => {
  const { loginSubstring, limit } = req.query;
  const stringParsed = String(loginSubstring).trim();
  const limitParsed = Number(limit);

  if (stringParsed === '' || !Number.isSafeInteger(limitParsed) || limitParsed < 1) {
    return res.json([]);
  }

  const result = Object
    .values(users)
    .filter(user => user.login.includes(stringParsed) && !user.isDeleted)
    .sort((a, b) => a.login.localeCompare(b.login))
    .slice(0, limitParsed);

  res.json(result);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
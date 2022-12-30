import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
import { UserDTO, NewUserDTO } from './models';

dotenv.config();

const users: Record<string, UserDTO> = {
  ['test_uuid']: {
    id: 'test_uuid',
    login: 'admin',
    password: '42',
    age: '112',
    isDeleted: false,
  },
  ['test_uuid2']: {
    id: 'test_uuid2',
    login: 'usera',
    password: '42',
    age: '112',
    isDeleted: false,
  },
  ['test_uuid3']: {
    id: 'test_uuid3',
    login: 'userb',
    password: '42',
    age: '112',
    isDeleted: true,
  },
};

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  const { id } = req.query;
  const user = users[id as string];
  const data = !user || user.isDeleted ? null : user;
  res.json(data);
});

app.post('/addUser', (req: Request, res: Response) => {
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

app.patch('/patchUser', (req: Request, res: Response) => {
  const { id, login, password, age } = req.body as UserDTO
  const user = users[id];
  if (!user || user.isDeleted) {
    return res.json(false);
  }

  if (login) user.login = login;
  if (password) user.password = password;
  if (age) user.age = age;
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
import { UserDTO, NewUserDTO } from './models';

export const users: Record<string, UserDTO> = {
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
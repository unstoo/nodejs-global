export type UserDTO = {
  id: string;
  login: string;
  password: string;
  age: string;
  isDeleted: boolean;
}

export type NewUserDTO = {
  login: string;
  password: string;
  age: string;
}
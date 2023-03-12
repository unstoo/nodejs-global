import { StatusCodes } from 'http-status-codes';
import { request } from './lib';
import {
  getTokenAndUserId,
} from './utils';
import { userRoutes } from './endpoints';

const createUserDto = {
  login: 'login',
  password: 'testpwd5555',
  age: 55,
};

describe('Users (e2e)', () => {
  const unauthorizedRequest = request;
  const commonHeaders = { 
    Accept: 'application/json',
    Authorization: '',
   };

  beforeAll(async () => {
    const result = await getTokenAndUserId(unauthorizedRequest);
    commonHeaders.Authorization = result.token;
  });

  describe('GET', () => {
    it('should auto suggest user list given hint and result limit', async () => {
      const response = await unauthorizedRequest
        .get(userRoutes.suggestUsers('j', 5))
        .set(commonHeaders);
      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body).toBeInstanceOf(Array);
    });

    it('should correctly get user by id', async () => {
      console.log(commonHeaders)
      const creationResponse = await unauthorizedRequest
        .post(userRoutes.addUser)
        .set(commonHeaders)
        .send(createUserDto);

        
      const { user_id } = creationResponse.body;

      expect(creationResponse.statusCode).toBe(StatusCodes.CREATED);

      const searchResponse = await unauthorizedRequest
        .get(userRoutes.getUser(user_id))
        .set(commonHeaders);

      expect(searchResponse.statusCode).toBe(StatusCodes.OK);
      expect(searchResponse.body).toBeInstanceOf(Object);

      const cleanupResponse = await unauthorizedRequest
        .delete(userRoutes.deleteUser)
        .set(commonHeaders)
        .send({
          id: user_id
        });

      expect(cleanupResponse.statusCode).toBe(StatusCodes.NO_CONTENT);
    });
  });
});

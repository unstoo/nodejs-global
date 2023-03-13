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

const patchUserDto = {
  ...createUserDto,
  age: 100
};

const nonExistentUuid = 'fa3ef97d-0000-aaaa-0000-ef069ba78cd0';

describe('/user (e2e)', () => {
  const unauthorizedRequest = request;
  const commonHeaders = { 
    Accept: 'application/json',
    Authorization: '',
   };
  let createdUserId = '';

  beforeAll(async () => {
    const result = await getTokenAndUserId(unauthorizedRequest);
    commonHeaders.Authorization = result.token;
  });

  describe('User Entity', () => {
    it('should auto suggest users list given hint and result limit', async () => {
      const response = await unauthorizedRequest
        .get(userRoutes.suggestUsers('j', 5))
        .set(commonHeaders);
      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body).toBeInstanceOf(Array);
    });

    it('should correctly create user', async () => {
      const creationResponse = await unauthorizedRequest
        .post(userRoutes.addUser)
        .set(commonHeaders)
        .send(createUserDto);

        
      const { user_id } = creationResponse.body;
      createdUserId = user_id;

      expect(creationResponse.statusCode).toBe(StatusCodes.CREATED);
    });

    it('should correctly get user by id', async () => {
      const searchResponse = await unauthorizedRequest
        .get(userRoutes.getUser(createdUserId))
        .set(commonHeaders);

      expect(searchResponse.statusCode).toBe(StatusCodes.OK);
      expect(searchResponse.body).toBeInstanceOf(Object);
    });

    it('should correctly handle get with absent uuid', async () => {
      const searchResponse = await unauthorizedRequest
        .get(userRoutes.getUser(''))
        .set(commonHeaders);

      expect(searchResponse.statusCode).toBe(StatusCodes.BAD_REQUEST);
    });
    it('should correctly handle get with non-existing uuid', async () => {
      const searchResponse = await unauthorizedRequest
        .get(userRoutes.getUser(nonExistentUuid))
        .set(commonHeaders);

      expect(searchResponse.statusCode).toBe(StatusCodes.OK);
      expect(searchResponse.body).toBe(null);
    });

    it('should correctly patch user', async () => {
      const patchResponse = await unauthorizedRequest
        .patch(userRoutes.patchUser)
        .set(commonHeaders)
        .send({
          id: createdUserId,
          ...patchUserDto,
        });

      expect(patchResponse.statusCode).toBe(StatusCodes.OK);
    });

    it('should correctly delete user', async () => {
      const cleanupResponse = await unauthorizedRequest
        .delete(userRoutes.deleteUser)
        .set(commonHeaders)
        .send({
          id: createdUserId
        });

      expect(cleanupResponse.statusCode).toBe(StatusCodes.NO_CONTENT);
    });
  });
});

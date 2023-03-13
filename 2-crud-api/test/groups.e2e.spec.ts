import { StatusCodes } from 'http-status-codes';
import { request } from './lib';
import {
  getAuthToken,
} from './utils';
import { groupRoutes } from './endpoints';

const createGroupDto = {
  name: 'empty_group',
  permissions: [],
};

const patchGroupDto = {
  ...createGroupDto,
  permissions: ['SHARE'],
}

const nonExistentUuid = 'fa3ef97d-0000-aaaa-0000-ef069ba78cd0';


describe('/group (e2e)', () => {
  const unauthorizedRequest = request;
  const commonHeaders = { 
    Accept: 'application/json',
    Authorization: '',
   };
  let createdGroupId = '';

  beforeAll(async () => {
    const result = await getAuthToken(unauthorizedRequest);
    commonHeaders.Authorization = result.token;
  });

  describe('Group Entity', () => {
    it('should get group list', async () => {
      const response = await unauthorizedRequest
        .get(groupRoutes.getGroupList)
        .set(commonHeaders);

      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body).toBeInstanceOf(Array);
    });

    it('should correctly create group', async () => {
      const creationResponse = await unauthorizedRequest
        .post(groupRoutes.addGroup)
        .set(commonHeaders)
        .send(createGroupDto);

      const { group_id } = creationResponse.body;
      createdGroupId = group_id;

      expect(creationResponse.statusCode).toBe(StatusCodes.CREATED);
    });

    it('should correctly get group by id', async () => {
      const searchResponse = await unauthorizedRequest
        .get(groupRoutes.getGroup(createdGroupId))
        .set(commonHeaders);

      expect(searchResponse.statusCode).toBe(StatusCodes.OK);
      expect(searchResponse.body).toBeInstanceOf(Object);
    });

    it('should correctly handle get with absent uuid', async () => {
      const searchResponse = await unauthorizedRequest
        .get(groupRoutes.getGroup(''))
        .set(commonHeaders);

      expect(searchResponse.statusCode).toBe(StatusCodes.BAD_REQUEST);
    });
    it('should correctly handle get with non-existing uuid', async () => {
      const searchResponse = await unauthorizedRequest
        .get(groupRoutes.getGroup(nonExistentUuid))
        .set(commonHeaders);

      expect(searchResponse.statusCode).toBe(StatusCodes.OK);
      expect(searchResponse.body).toBe(null);
    });

    it('should correctly patch group', async () => {
      const patchResponse = await unauthorizedRequest
        .patch(groupRoutes.patchGroup)
        .set(commonHeaders)
        .send({
          id: createdGroupId,
          ...patchGroupDto,
        });

      expect(patchResponse.statusCode).toBe(StatusCodes.OK);
    });

    it('should correctly delete group', async () => {
      const cleanupResponse = await unauthorizedRequest
        .delete(groupRoutes.deleteGroup)
        .set(commonHeaders)
        .send({
          id: createdGroupId
        });

      expect(cleanupResponse.statusCode).toBe(StatusCodes.NO_CONTENT);
    });    
  });
});

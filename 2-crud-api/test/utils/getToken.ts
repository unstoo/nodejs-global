import { authRoutes } from '../endpoints';
const mockUserLogin = 'john';
const mockUserPassword = 'security55';

const getAuthToken = async (request: any) => {
  const {
    body: { accessToken },
  } = await request
      .get(authRoutes.login + `?login=${mockUserLogin}&password=${mockUserPassword}`)
      .set('Accept', 'application/json');

  if (accessToken === undefined) {
    throw new Error('Authorization failed');
  }

  const token = `Bearer ${accessToken}`;

  return { token };
};

export default getAuthToken;

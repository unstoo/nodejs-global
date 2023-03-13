import { authRoutes } from '../endpoints';
const mockUserLogin = process.env.TEST_LOGIN;
const mockUserPassword = process.env.TEST_PASSWORD;

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

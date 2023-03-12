import { authRoutes } from '../endpoints';

const getTokenAndUserId = async (request: any) => {

  // get token
  const mockUserLogin = 'john';
  const {
    body: { accessToken },
  } = await request
      .get(authRoutes.login + `?login=${mockUserLogin}&password=security55`)
      .set('Accept', 'application/json');

  if (accessToken === undefined) {
    throw new Error('Authorization failed');
  }

  const token = `Bearer ${accessToken}`;

  return { token, mockUserLogin };
};

export default getTokenAndUserId;

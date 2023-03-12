export const userRoutes = {
  addUser: '/user/addUser',
  getUser: (userId: string) => `/user?id=${userId}`,
  updateUser: '/user/patchUser',
  deleteUser: '/user/deleteUser',
  suggestUsers: (loginSubstring: string, limit: number) => `/user/autoSuggest?loginSubstring=${loginSubstring}&limit=${limit}`,
};

export const authRoutes = {
  login: '/auth/login',
  register: '/auth/register',
};

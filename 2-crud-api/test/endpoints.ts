export const userRoutes = {
  addUser: '/user/addUser',
  getUser: (userId: string) => `/user?id=${userId}`,
  patchUser: '/user/patchUser',
  deleteUser: '/user/deleteUser',
  suggestUsers: (loginSubstring: string, limit: number) => `/user/autoSuggest?loginSubstring=${loginSubstring}&limit=${limit}`,
};

export const groupRoutes = {
  getGroup: (groupId: string) => `/group/getGroup?id=${groupId}`,
  addGroup: '/group/addGroup',
  patchGroup:  '/group/patchGroup',
  deleteGroup: '/group/deleteGroup',
  getGroupList: '/group/getGroupList',
};

export const authRoutes = {
  login: '/auth/login',
  register: '/auth/register',
};

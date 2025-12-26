export const urls = {
  auth: {
    refresh: "auth/refresh",
    login: "auth/login",
    logout: "auth/logout",
    register: "auth/signup",
    me: "auth/me",
    update: (id: string) => `auth/update/${id}`,
  },
  group: {
    find: "group/mine",
    create: "group",
  },
  upload: "upload",
};

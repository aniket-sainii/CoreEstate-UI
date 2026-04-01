export const API_ENDPOINTS = {
    AUTH: {
    BASE: '/auth',
    LOGIN: '/auth/login',
    REGISTER: '/auth/register'
  },
  PROJECTS: {
    GET_ALL: '/project',
    UPDATE: (id: number) => `/project/${id}`
  }
};
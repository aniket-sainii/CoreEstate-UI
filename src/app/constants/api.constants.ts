export const API_ENDPOINTS = {
  AUTH: {
    BASE: '/auth',
    LOGIN: '/auth/login',
    REGISTER: '/auth/register'
  },
  PROJECTS: {
    GET_ALL: '/project',
    GET_BY_ID: '/project/{id}',
    UPDATE: (id: number) => `/project/full-update/${id}`
  }
};
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
  },
  FLATS: {
    GET_BY_BUILDING_ID: (buildingId: number) => `/flat/GetFlatByBuilding/${buildingId}`,
    GET_BY_ID: (id: number) => `/flat/${id}`,
    CREATE: '/flat',
    UPDATE: '/flat'
  },
  GRAPHQL: {
    GET_MASTER_DATA: '/Graphql'
  }
};
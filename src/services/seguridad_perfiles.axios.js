import { axiosBase } from './axios';

export const SEGURIDAD_PERFILES_INDEX_AXIOS = (path, body) => axiosBase.get(path, body);
export const SEGURIDAD_PERFILES_SHOW_AXIOS = (path, body) => axiosBase.get(path, body);
import axios from './axios';

export const SEGURIDAD_PERFILES_INDEX_AXIOS = (path, body) => axios.get(path, body);
export const SEGURIDAD_PERFILES_SHOW_AXIOS = (path, body) => axios.get(path, body);
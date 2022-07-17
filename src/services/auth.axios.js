import axios from './axios';

export const authLogin = (path, body) => axios.post(path, body);
export const authAccess = (path, body) => axios.get(path, body);
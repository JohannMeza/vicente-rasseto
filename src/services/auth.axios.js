import { axiosBase } from './axios';

export const authLogin = (path, body) => axiosBase.post(path, body);
export const authAccess = (path, body) => axiosBase.get(path, body);
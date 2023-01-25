import { axiosBase } from './axios';

export const listMenu = (path, body) => axiosBase.post(path, body)
export const searchSubpaginas = (path, body) => axiosBase.post(path, body);
export const showMenu = (path, body) => axiosBase.get(path, body)
export const saveMenu = (path, body) => axiosBase.post(path, body)
export const deleteMenu = (path, body) => axiosBase.delete(path, body)
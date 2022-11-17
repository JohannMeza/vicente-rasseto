import axios from './axios';

export const listMenu = (path, body) => axios.post(path, body)
export const searchSubpaginas = (path, body) => axios.post(path, body);
export const showMenu = (path, body) => axios.get(path, body)
export const saveMenu = (path, body) => axios.post(path, body)
export const deleteMenu = (path, body) => axios.delete(path, body)
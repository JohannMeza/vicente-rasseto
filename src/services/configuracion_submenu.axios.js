import axios from './axios';

export const listSubmenu = (path, body) => axios.post(path, body)
export const searchSubmenuByIds = (path, body) => axios.post(path, body)
export const saveSubmenu = (path, body) => axios.post(path, body)
export const deleteSubmenu = (path, body) => axios.delete(path, body)
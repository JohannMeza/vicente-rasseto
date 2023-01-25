import { axiosBase } from './axios';

export const listSubmenu = (path, body) => axiosBase.post(path, body)
export const searchSubmenuByIds = (path, body) => axiosBase.post(path, body)
export const saveSubmenu = (path, body) => axiosBase.post(path, body)
export const deleteSubmenu = (path, body) => axiosBase.delete(path, body)
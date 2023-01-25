import { axiosBase } from './axios';

export const SEGURIDAD_PERFILES_MENU_SUBMENU_STORE_AXIOS = (path, body) => axiosBase.post(path, body)
export const SEGURIDAD_PERFILES_MENU_SUBMENU_SHOW_AXIOS = (path, body) => axiosBase.get(path, body)
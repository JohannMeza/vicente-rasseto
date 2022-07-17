import axios from './axios';

export const SEGURIDAD_PERFILES_MENU_SUBMENU_STORE_AXIOS = (path, body) => axios.post(path, body)
export const SEGURIDAD_PERFILES_MENU_SUBMENU_SHOW_AXIOS = (path, body) => axios.get(path, body)
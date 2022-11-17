import axios from './axios';

export const SERVICES_GET = (path, body) => axios.get(path, body);
export const SERVICES_POST = (path, body) => axios.post(path, body);
export const SERVICES_PUT = (path, body) => axios.put(path, body);
export const SERVICES_DELETE = (path, body) => axios.delete(path, body);
import { axiosBase, axiosReport } from './axios';

export const SERVICES_GET = (path, body) => axiosBase.get(path, body);
export const SERVICES_POST = (path, body) => axiosBase.post(path, body);
export const SERVICES_PUT = (path, body) => axiosBase.put(path, body);
export const SERVICES_DELETE = (path, body) => axiosBase.delete(path, body);

export const REPORT_POST = (path, body) => axiosReport.post(path, body);
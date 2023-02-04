import axios from 'axios';
import { EnvConstant } from '../util/EnvConstant';

export const axiosBase = axios.create({
<<<<<<< HEAD
  baseURL: baseUrlServer,
=======
  baseURL: EnvConstant.RASSETO_BASE_URL,
>>>>>>> 47824821176af20374c24e6f2f4f5a15bcebdcd3
  header: { 'Content-Type': 'application/json' },
  headers: { 'Authorization': `${localStorage.getItem('TOKEN_BIBLIOTECA_VIRTUAL')}` }
})

export const axiosReport = axios.create({
<<<<<<< HEAD
  baseURL: baseUrlServer,
=======
  baseURL: EnvConstant.RASSETO_BASE_URL,
>>>>>>> 47824821176af20374c24e6f2f4f5a15bcebdcd3
  responseType: 'arraybuffer', 
  header: { 'Content-Type': 'application/json' },
  headers: { 'Authorization': `${localStorage.getItem('TOKEN_BIBLIOTECA_VIRTUAL')}`}
})
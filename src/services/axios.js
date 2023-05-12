import axios from 'axios';
import { EnvConstant } from '../util/EnvConstant';

export const axiosBase = axios.create({
  baseURL: EnvConstant.REACT_APP_BASE_URL,
  header: { 'Content-Type': 'application/json' },
  headers: { 'Authorization': `${localStorage.getItem('TOKEN_BIBLIOTECA_VIRTUAL')}` }
})

export const axiosReport = axios.create({
  baseURL: EnvConstant.REACT_APP_BASE_URL,
  responseType: 'arraybuffer', 
  header: { 'Content-Type': 'application/json' },
  headers: { 'Authorization': `${localStorage.getItem('TOKEN_BIBLIOTECA_VIRTUAL')}`}
})
import axios from 'axios';

const baseUrlLocal = "http://localhost:4010/api";
const baseUrlServer = "https://vicente-rasseto.onrender.com/api";

export const axiosBase = axios.create({
  baseURL: baseUrlLocal,
  header: { 'Content-Type': 'application/json' },
  headers: { 'Authorization': `${localStorage.getItem('TOKEN_BIBLIOTECA_VIRTUAL')}` }
})

export const axiosReport = axios.create({
  baseURL: baseUrlLocal,
  responseType: 'arraybuffer', 
  header: { 'Content-Type': 'application/json' },
  headers: { 'Authorization': `${localStorage.getItem('TOKEN_BIBLIOTECA_VIRTUAL')}`}
})
import axios from 'axios';

const axiosConfig = axios.create({
  baseURL: "https://vicente-rasseto.onrender.com/api",
  // baseURL: "http://localhost:4010/api",
  header: {
    'Content-Type': 'application/json'
  },
  headers: {
    'Authorization': `${localStorage.getItem('TOKEN_BIBLIOTECA_VIRTUAL')}`
  }
})

export default axiosConfig;
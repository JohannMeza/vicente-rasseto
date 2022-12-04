import axios from 'axios';

const axiosConfig = axios.create({
  // baseURL: "https://biblioteca-virtual-peru.herokuapp.com/api",
  baseURL: "http://localhost:4010/api",
  header: {
    'Content-Type': 'application/json'
  },
  headers: {
    'Authorization': `${localStorage.getItem('TOKEN_BIBLIOTECA_VIRTUAL')}`
  }
})

export default axiosConfig;
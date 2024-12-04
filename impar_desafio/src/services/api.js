import axios from 'axios';

const api = axios.create({
    baseURL: "https://localhost:7062" //"https://app-silasreis-api.azurewebsites.net"
})

export default api;
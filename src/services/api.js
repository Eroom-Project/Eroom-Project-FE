import axios from "axios";

const api = axios.create({
    headers: {
        'Access-Control-Allow-Origin': '*'},
    baseURL: process.env.REACT_APP_SERVER_URL,
    withCredentials: true,
})

export default api
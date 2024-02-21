import axios from "axios";

const api = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
    withCredentials: true,
})

api.interceptors.response.use(
    response => {
        console.log(`인터셉터 ${response.status}응답 잘 들어왔습니다.`)
        return response
    },

    async error => {
        if( error.response && error.response.status === 401){
                console.log(`인터셉터 ${error.response.status}응답 accessToken 재요청.`)
                try {
                    const res = await api.post(`/api/token`,{})
                    console.log(res)
                } catch(error){
                    console.log('accessToken 재요청 실패:', error)
                }
        }
        return Promise.reject(error)
    }
)
export default api
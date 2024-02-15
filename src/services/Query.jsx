import api from "./api";

const getProfile = async() => {
    const res = await api.get("/api/mypage")
    console.log(`res => ${res}`)
    return res.data
}

export {getProfile}
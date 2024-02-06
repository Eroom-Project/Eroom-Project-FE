import api from "./api";

const getProfile = async() => {
    const res = await api.get("/api/member/profile")
    console.log(res)
    return res.data
}

export {getProfile}
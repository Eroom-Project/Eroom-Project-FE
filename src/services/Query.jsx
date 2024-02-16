import api from "./api";

const getProfile = async() => {
    const res = await api.get("/api/mypage")
    return res.data.data
}
const getChallengeDetail = async(challengeId) => {
    const res = await api.get(`/api/challenge/${challengeId}`)
    return res.data.data
}


export {getProfile, getChallengeDetail}
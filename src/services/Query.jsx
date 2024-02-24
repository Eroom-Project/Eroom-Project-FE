import api from "./api";

const getProfile = async() => {
    const res = await api.get("/api/mypage")
    return res.data.data
}
const getChallengeDetail = async(challengeId) => {
    const res = await api.get(`/api/challenge/${challengeId}`)
    // console.log(res.data.data)
    return res.data.data
}

/// 챌린지 삭제 완료
const deleteChallenge = async(challengeId) => {
    
    try{
        const resToken = await api.post(`/api/token`,{})
        const res = await api.delete(`/api/challenge/${challengeId}`)
        console.log("챌린지 삭제 서버 통신 연결")
        console.log(res)
    }catch(error){
        console.log("챌린지 삭제 서버 통신 에러")
    }
}

/// 비밀번호 확인
const checkPassword = async(value) => {
    const res = await api.get("/api/member/password",{
        params:{password: value}
    })
    console.log(res)
    try{
        if(res.data.status === "OK"){
            console.log("비밀번호가 확인되었습니다.")
            return res.data.status
        } else {
            console.log("잘못된 비밀번호입니다.")
        }
    }catch(error){
        console.log("비밀번호 확인 =>"+ error)
    }
}
// 프로필 수정 완료
const changeProfileDatas = async (nameauthinput) => {
    console.log(nameauthinput)
    const resToken = await api.post(`/api/token`,{})
    switch (nameauthinput.name) {
        case "image":
            if (nameauthinput.auth.image) {
                const formDataImage = new FormData();
                formDataImage.append('profileImageUrl', nameauthinput.input.image)
                const resImage = await api.put("/api/member/profile/image", formDataImage)
                console.log(resImage.data)
                console.log("이미지 수정이 완료됐습니다.")
                break
            } else {
                console.log("이미지 유효성을 확인해주세요")
                break
            }
        // case "email":
        //     const formDataEmail = new FormData();
        //     formDataEmail.append('profileImageUrl', input.image)
        //     const resEmail = await api.put("/api/member/profile", formDataEmail)
        //     console.log(resEmail.data)
        //     console.log("프로필  수정이 완료됐습니다.")
        //     break
        // ; charset=utf-8
        case "nickname":
            if (nameauthinput.auth.nickname) {
                console.log('nnnnnnnnn',nameauthinput)
                const formDataNickname = new FormData();
                formDataNickname.append('profileNickname', new Blob([JSON.stringify(nameauthinput.input.nickname)], { type: 'application/json' }))
                const resNickname = await api.put(`/api/member/profile/nickname?profileNickname=${nameauthinput.input.nickname}`, nameauthinput.input.nickname)
                console.log(resNickname.data)
                console.log("닉네임 수정이 완료됐습니다.")
                break
            } else {
                console.log("닉네임 유효성을 확인해주세요")
                break
            }
        case "password":
            if (nameauthinput.auth.password && nameauthinput.auth.checkPassword) {
                console.log('ppppppp',nameauthinput)
                // const updatePassword = new FormData();
                // updatePassword.append('profilePassword', nameauthinput.input.password)
                const resPassword = await api.put("/api/member/profile/password", {password: nameauthinput.input.password})
                console.log(resPassword.data)
                console.log("비밀번호 수정이 완료됐습니다.")
                break
            } else {
                console.log("비밀번호 유효성을 확인해주세요")
                break
            }

        default:
            console.log("프로필 수정에 맞는 케이스가 없습니다.")
    }
}

export {getProfile, getChallengeDetail, deleteChallenge, checkPassword, changeProfileDatas}
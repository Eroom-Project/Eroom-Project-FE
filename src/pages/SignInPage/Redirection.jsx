import React, { useEffect } from 'react'
import api from '../../services/api'
import { useNavigate, useOutletContext } from 'react-router-dom';
import SignBacks from '../../components/SignPage/SignBacks';

function Redirection() {
    const navigate = useNavigate()
    // window.location.href현재 페이지 url에서 searchParams params를 추적 
    // .get('code') code를 빼온다.
    let code = new URL(window.location.href).searchParams.get('code')
    
    // 카카오 코드 주는 주소 백에서 알려달라하기 api수정할 수도..
    // 토큰 어떻게 들어오는지 보기
    // Authorization: Bearer <token>
    const { setAccessState, setWithExpire } = useOutletContext();
    const postKakao = async () => {
        try {
            const res = await api.get("/auth/callback/kakao",
                { params: { code } })
                if (res.status === 200) {
                    setWithExpire("localRefresh", true, 10080)
                    setAccessState(true)
                    navigate("/")
                }
        } catch (error) {
            console.log("Kakao Login failed:", error)
        }
    }

    useEffect(() => {
        postKakao()
    }, [])

    return (
        <SignBacks />
    )
}

export default Redirection
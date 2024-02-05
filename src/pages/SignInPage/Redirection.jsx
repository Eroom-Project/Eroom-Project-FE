import React, { useEffect } from 'react'
import api from '../../services/api'
import { useNavigate } from 'react-router-dom';
import { setCookie } from '../../services/Cookie';

function Redirection() {
    const navigate = useNavigate()
    // window.location.href현재 페이지 url에서 searchParams params를 추적 
    // .get('code') code를 빼온다.
    let code = new URL(window.location.href).searchParams.get('code')

    // 카카오 코드 주는 주소 백에서 알려달라하기 api수정할 수도..
    // 토큰 어떻게 들어오는지 보기
    // Authorization: Bearer <token>
    const postKakao = async () => {
        try {
            const res = await api.post("", code)
            console.log(res.data.token)
            res.data.token && setCookie("oToken", `JWT ${res.data.token}`, {
                path: "/",
                httpyOnly: true,
                secure: true
            })
            navigate("/")
        } catch (error) {
            console.log("Login failed:", error)
        }
    }
    
    useEffect(()=> {
        postKakao()
    },[])

    return (
        <div>
            로그인 중입니다.
        </div>
    )
}

export default Redirection
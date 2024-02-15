import React from 'react'
import styled from 'styled-components';

function KakaoSignIn() {
    const CLIENT_ID = "8fdb806fb9ab6efe73c78638a985c28b"
    const REDIRECT_URI = " https://eroom-challenge.com/auth/callback/kakao"
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

    const kakaoLoginBtn = () => {
        window.location.href = KAKAO_AUTH_URL
    }

    return (
        <KakaoBtn onClick={kakaoLoginBtn}>
            <Img src="/img/kakaoLogo.png" alt="kakaologo" />
            <span>카카오로 3초만에 시작하기</span>
        </KakaoBtn>
    )
}

export default KakaoSignIn

const KakaoBtn = styled.button`
    font-family: 'Noto Sans KR', sans-serif;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 48px;
    border: none;
    border-radius: 10px;
    background-color: #FEE500;
    color: #201D00;
    font-weight: 700;
    font-size: 12px;
    cursor: pointer;
    &:hover{
    background-color: #ffd900;
    }
`

const Img = styled.img`
    height: 35%;
    margin-right: 8px;
`

import React, { useState } from 'react'
import styled from 'styled-components'
import { getCookie } from '../../services/Cookie'
function NavBar() {

const [cookie, setCookie] =useState({
    cookies: false,
    cookiesR: false
})

        const cookies = getCookie("Authorization");
        if (cookies) {
            console.log("Authorization cookie:", cookie);
            setCookie({
                ...cookie,
                cookie: true
            })
        } else {
            console.log("Authorization cookie not found");
        }
        
        const cookiesR = getCookie("Refresh-token");
        if (cookiesR) {
            console.log("Refresh-token cookie:", cookiesR);
            setCookie({
                ...cookie,
                cookieR: true
            })
        } else {
            console.log("Refresh-token cookie not found");
        }


    const currentUrl = window.location.href
    console.log(currentUrl)
    return (
        <>
            {
                currentUrl !== "http://localhost:3000/signin" &&
                    currentUrl !== "http://localhost:3000/signup" &&
                    currentUrl !== "https://eroom-project-fe.vercel.app/signin" &&
                    currentUrl !== "https://eroom-project-fe.vercel.app/signup"
                    ?
                    <MainBox>
                        <Main>
                            <Info>
                                <Span> <a href='/'>E-Room</a></Span>
                                <Span> <a href='/main'>챌린지 리스트 </a></Span>
                                <Span> <a href='/create'>챌린지 생성하기</a> </Span>
                            </Info>
                            <SignIn>
                                {
                                    cookie.cookies && cookie.cookiesR?
                                        <Span><a href='/mypage'>마이페이지</a></Span>
                                        :
                                        ""
                                }
                                {
                                    cookie.cookies && cookie.cookiesR ?
                                        <Span>로그아웃</Span>
                                        :
                                        <Span><a href='/signin'>로그인</a></Span>
                                }
                            </SignIn>
                        </Main>
                        <Hr />
                    </MainBox>
                    :
                    ""
            }
        </>
    )
}

export default NavBar

const MainBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: sticky;
    top: 0px;
    background-color: white;
    width: 100%;
    margin-bottom: 50px;
`
const Main = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    max-width: 1200px;
    width: 100%;
    height: 50px;
`
const Hr = styled.div`
    width: 100%;
    border: none;
    border-bottom: 1px solid gray;
`
const Info = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`
const SignIn = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`

const Span = styled.span`
    margin: 0px 5px;
`
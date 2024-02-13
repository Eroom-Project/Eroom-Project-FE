import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getCookie, removeCookie } from '../../services/Cookie'
import { useNavigate } from 'react-router-dom'
function NavBar() {
    const [cookie, setCookie] = useState({
        cookies: false,
        cookiesR: false
    })

    console.log(cookie)

    const isCookie = async() => {
        const cookies = await getCookie("Authorization");
        const cookiesR = await getCookie("Refresh-Token");
        if (cookies && cookiesR) {
            console.log("Authorization cookie:", cookies);
            console.log("Authorization cookie:", cookiesR);
            setCookie({
                ...cookie,
                cookies: true,
                cookiesR: true
            })
        } else {
            console.log("Authorization cookie not found");
        }
    }

    useEffect(() => {
        isCookie()
    }, [])


    const removeCookies = () => {
        removeCookie("Authorization")
        removeCookie("Refresh-Token")
        window.location.href= "https://eroom-project-fe.vercel.app/home"
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
                                        <>
                                            <Span><a href='/mypage'>마이페이지</a></Span>
                                            <Span onClick={removeCookies}>로그아웃</Span>
                                        </>
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
    cursor: pointer;
`
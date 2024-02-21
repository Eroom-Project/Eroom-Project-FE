import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getCookie, removeCookie } from '../../services/Cookie'
import { Link, useNavigate } from 'react-router-dom'
import api from '../../services/api'
function NavBar() {

    const navigate = useNavigate()

    const [accessState, setAccessState] = useState(false)

    const isCookie = async () => {
        const localaccess = await window.localStorage.getItem("localaccess");
        if (localaccess) {
            setAccessState(true)
        } else {
            console.log("localaccess cookie not found");

        }
    }

    useEffect(() => {
        isCookie()
    }, [])

    const removeCookies = async () => {
        console.log(accessState)
        if (accessState === true) {
            const res = await api.post('/api/logout', {})
            console.log(res)
            if (res.status === 200) {
                window.localStorage.removeItem("localaccess")
                setAccessState(false)
                alert(res.data.message)
                navigate("/")
            }
        }
    }

    return (
        <>
            <MainBox>
                <Main>
                    <Info>
                        <Link to="/"><Span> E-Room</Span></Link>
                        <Link to="/main"><Span> 챌린지 리스트</Span></Link>
                        <Link to="/create"><Span> 챌린지 생성하기</Span></Link>
                    </Info>
                    <SignIn>
                        {
                            accessState === true ?
                                <>
                                    <Link to="/mypage"><Span> 마이페이지</Span></Link>
                                    <Span onClick={removeCookies}>로그아웃</Span>
                                </>
                                :
                                <Link to="/signin"><Span> 로그인</Span></Link>
                        }
                    </SignIn>
                </Main>
                <Hr />
            </MainBox>

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
    z-index: 1000;
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
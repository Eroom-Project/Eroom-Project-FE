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
            const resToken = await api.post(`/api/token`, {})
            const res = await api.post('/api/logout', {})

            console.log(resToken)
            console.log(res)
            if (res.status === 200) {
                window.localStorage.removeItem("localaccess")
                setAccessState(false)
                navigate("/")
            }
        }
    }

    return (
        <>
            <MainBox>
                <Main>
                    <Info>
                        <Link to="/"><Logo src="/img/NavBar/Logo.png" alt="logo" /></Link>
                        <Link to="/main"><Span> E-Room 리스트</Span></Link>
                        {accessState === true && <Link to="/create"><Span> E-Room 생성하기</Span></Link>
}
                    </Info>
                    {
                        accessState === true ?
                                <SignIn>
                                    <Link to="/mypage"><User src="/img/NavBar/user.png" alt="user" /></Link>
                                    <Sign src="/img/NavBar/log-in.png" alt="sign" onClick={removeCookies}/>
                                </SignIn>
                            :
                            <SignIn>
                                <Link to="/signin"><Span> 로그인</Span></Link>
                            </SignIn>
                    }
                </Main>
                <Hr />
            </MainBox>

        </>
    )
}

export default NavBar

const Logo = styled.img`
    width: 130px;
    margin-right: 20px;
`
const Sign = styled.img`
    width: 20px;
    cursor: pointer;
`
const User = styled.img`
    width: 20px;
    margin-right: 20px;
    cursor: pointer;
`
const MainBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: sticky;
    top: 0px;
    width: 100%;
    z-index: 1000;
    background-color: white;
`
const Main = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    max-width: 1200px;
    width: 100%;
    padding: 25px 0px;
`
const Hr = styled.div`
    width: 100%;
    border: none;
    border-bottom: 1px solid #F2F2F2;
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
    margin: 0px 10px;
    cursor: pointer;
`
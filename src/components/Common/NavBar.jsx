import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
function NavBar({ accessState, removeCookies }) {

    return (
        <>
            <MainBox>
                <Main>
                    <Link to="/"><Logo src="/img/Logo.png" alt="logo" /></Link>
                    <NavWeb>
                        <Info>
                            <a href="/main"><Span> 이룸 리스트</Span></a>
                            {accessState === true && <Link to="/create"><Span> 이룸 생성하기</Span></Link>
                            }
                        </Info>
                        {accessState === true ?
                            <SignIn>
                                <Link to="/mypage"><User src="/img/NavBar/user.png" alt="user" /></Link>
                                <Sign src="/img/NavBar/log-in.png" alt="sign" onClick={removeCookies} />
                            </SignIn>
                            :
                            <SignIn>
                                <Link to="/signin"><Span> 로그인</Span></Link>
                            </SignIn>}
                    </NavWeb>

                </Main>
                <Hr />
            </MainBox>

        </>
    )
}

export default NavBar

const Logo = styled.img`
    width: 80%;
    margin-right: 40px;
`
const Sign = styled.img`
    width: 22px;
    cursor: pointer;
`
const User = styled.img`
    width: 22px;
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
    font-size: 16px;
    font-weight: 700;
    width: 100%;
    min-height: 50px;
    padding: 2%;
    z-index: 3;
    background-color: white;
`
const Main = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    max-width: 1200px;
    width: 100%;
    padding: 0px 3%;
`
const NavWeb = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100%;

`
const Hr = styled.div`
    position: absolute;
    bottom: 0;
    width: 100%;
    border: none;
    border-bottom: 1px solid #F2F2F2;
`
const Info = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-right: auto;
`
const SignIn = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`

const Span = styled.span`
    margin: 0px 12px;
    cursor: pointer;
`
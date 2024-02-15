import React from 'react'
import styled from 'styled-components'
import Isometric from '../../components/MyPage/Isometric'
import Profile from '../../components/MyPage/Profile'
import Chellange from '../../components/MyPage/Chellange'


function MyPage() {

    return (
        <>
            <H1Box>
                <H1>마이 페이지</H1>
            </H1Box>
            <Hr />
            <MainBox>
                <ProfileBox>
                    <Profile />
                    <Isometric />
                </ProfileBox>
                <ChellangeBox>
                    <Chellange />
                </ChellangeBox>
            </MainBox>
        </>
    )
}

export default MyPage

const H1Box = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-width: 1200px;
    width: 100%;
    margin: 0px auto;
`
const H1 = styled.div`
    font-size: 28px;
    font-weight: 600;
    margin: 0px auto;
`
const Hr = styled.div`
    width: 100%;
    border: none;
    border-bottom: 1px solid #F2F2F2;
    margin: 40px 0px;
`
const MainBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0% 10%;
`
const ProfileBox = styled.div`
    display: flex;
    width: 100%;
    max-width: 1200px;
    gap: 60px;
`

const ChellangeBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 1200px;
    width: 100%;
    margin-top: 40px;
`
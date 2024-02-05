import React from 'react'
import Isometric from '../../components/Common/Isometric'
import styled from 'styled-components'

function MyPage() {
    return (
        <MainBox>
            <Profile>

            </Profile>
            <Isometric/>
        </MainBox>
    )
}

export default MyPage

const MainBox =styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

`
const ProfileBox = styled.div`
    
`
const Profile = styled.div`
    display: flex;
`
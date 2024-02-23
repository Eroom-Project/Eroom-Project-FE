import React from 'react'
import { useQuery } from 'react-query'
import styled from 'styled-components'
import { getProfile } from '../../services/Query'

function Isometric() {
    const chellangeData = useQuery('chellangeData', getProfile)
    if (chellangeData.data) {
        // console.log(chellangeData.data.myroomInfo.floor)
    }
    if (chellangeData.isLoading) {
        console.log("로딩중입니다.")
    }
    if (chellangeData.isError) {
        console.log("에러!")
    }
    return (
        <MainBox>
            <H6>E-ROOM</H6>
            <MyRoom>
                <Img src={"/img/MyPage/BackGround.png"} alt="Room" />
            </MyRoom>
            <H6>BRICK</H6>
            <Brick>
                <Img src={"/img/characters.png"} alt="" />
            </Brick>
        </MainBox>
    )
}

export default Isometric

const MainBox = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`
const MyRoom = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 574px;
    min-width: 440px;
    height: 450px;
    /* border: 1px solid gray; */
    border-radius: 8px;
    margin-bottom: 25px;

    overflow: hidden;
`
const Brick = styled.div`
    width: 100%;
    min-width: 440px;
    height: 150px;
    border: 1px solid gray;
    border-radius: 8px;
    overflow: hidden;
    
`
const Img = styled.img`
    object-fit: cover;
    width: 100%;
    height: 100%;
`

const H6 = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    margin: 0px 0px 10px 0px;
    font-weight: 500;
`
import React from 'react'
import { useQuery } from 'react-query'
import styled from 'styled-components'
import { getProfile } from '../../services/Query'

function Isometric() {
    const chellangeData = useQuery('chellangeData', getProfile)
    if (chellangeData.data) {
        console.log(chellangeData.data.myroomInfo.floor)
    }
    if (chellangeData.isLoading) {
        console.log("로딩중입니다.")
    }
    if (chellangeData.isError) {
        console.log("에러!")
    }
    return (
        <MainBox>
            <H6>My-Room</H6>
            <MyRoom>
                {
                chellangeData.data&&
                <Img src={chellangeData.data.myroomInfo.floor} alt="" />
                }
            </MyRoom>
            <H6>My-Brick</H6>
            <Brick>
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
    min-width: 440px;
    height: 450px;
    border: 1px solid gray;
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
    
`
const Img = styled.img`
    object-fit: cover;
`

const H6 = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    font-size: 12px;
    margin: 0px 0px 10px 0px;
`
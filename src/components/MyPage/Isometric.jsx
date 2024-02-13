import React from 'react'
import styled from 'styled-components'

function Isometric() {
    return (
        <MainBox>
            <Block>
                벽돌 공간
            </Block>
            <H6>My-Room</H6>
            <MyRoom>
                <Img src="/img/r3.jpg" alt="" />
            </MyRoom>
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
    height: 440px;
    border: 1px solid gray;
    overflow: hidden;
`
const Block = styled.div`
    width: 100%;
    min-width: 440px;
    height: 182px;
    border: 1px solid gray;
`
const Img = styled.img`
    width: 100%;
`

const H6 = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    font-size: 12px;
    margin: 20px 0px 10px 0px;
`
import React from 'react'
import styled from 'styled-components'

function Isometric() {
    return (
        <MainBox>
            <HeaderBox>
                아이소 매트릭 공간
            </HeaderBox>
            <BottomBox>
                벽돌 공간
            </BottomBox>
        </MainBox>
    )
}

export default Isometric

const MainBox = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 30px;
`
const HeaderBox = styled.div`
    width: 550px;
    height: 400px;
    border: 1px solid gray;
`
const BottomBox = styled.div`
    width: 550px;
    height: 170px;
    margin-top: 10px;
    border: 1px solid gray;
`
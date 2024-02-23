import React from 'react'
import styled from 'styled-components'

function ModalRemove() {
    return (
        <>
            <BackGround>
            </BackGround>
            <ContentsBox>
                123123
            </ContentsBox>
        </>
    )
}

export default ModalRemove

const BackGround = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(10px);
    background-color: rgba(116, 116, 116, 0.281);
`
const ContentsBox = styled.div`
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    width: 390px;
    height: 250px;
    border-radius: 10px;
`
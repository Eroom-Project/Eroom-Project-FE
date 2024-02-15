import React from 'react'
import styled from 'styled-components'

function Chellange() {
    return (
        <>
            <SortBox>
                <div>내가 참여중인 챌린지</div>
                <div>참여 종료된 챌린지</div>
            </SortBox>
            <ContentsBox>
                <ContentsGrid>
                    <Contents>
                        <ContentsImg>
                            <Img src="/img/r3.jpg" alt="img" />
                        </ContentsImg>
                        <ContentsTitle>
                            <p>제목입니다.</p>
                            <p>주 3회</p>
                        </ContentsTitle>
                    </Contents>
                    <Contents>
                        <ContentsImg></ContentsImg>
                        <ContentsTitle></ContentsTitle>
                    </Contents>
                    <Contents>
                        <ContentsImg></ContentsImg>
                        <ContentsTitle></ContentsTitle>
                    </Contents>
                    <Contents>
                        <ContentsImg></ContentsImg>
                        <ContentsTitle></ContentsTitle>
                    </Contents>
                    <Contents>
                        <ContentsImg></ContentsImg>
                        <ContentsTitle></ContentsTitle>
                    </Contents>

                </ContentsGrid>
            </ContentsBox>
        </>
    )
}

export default Chellange

const SortBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-right: auto;
    gap: 10px;
`

const ContentsBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    border: 1px solid gray;
`
const ContentsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    margin-bottom: 20px;
    margin: 0 auto;
    width: 100%;
    margin-top: 40px;
    gap: 20px 10px;
`
const Contents = styled.div`
    width: 100%;
    border: 1px solid red;
    justify-self: center;
`
const ContentsImg = styled.div`
    width: 100%;
    padding-bottom: 70%;
    background-color: gray;
    overflow: hidden;
    position: relative;
`
const Img =styled.img`
    width: 100%;
    height: 100%;
    position: absolute;
    object-fit: cover;
`
const ContentsTitle = styled.div`
    padding: 24px 25px;
`
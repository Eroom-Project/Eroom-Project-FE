import React from 'react'
import styled from 'styled-components'
import { getProfile } from '../../services/Query'
import { useQuery } from 'react-query'

function Chellange() {

    const chellangeData = useQuery('chellangeData', getProfile)

    if (chellangeData.data) {
        console.log(`profileData => ${chellangeData.data}`)
    }

    if (chellangeData.isLoading) {
        console.log("로딩중입니다.")
    }
    if (chellangeData.isError) {
        console.log("에러!")
    }

    return (
        <>
            <SortBox>
                <H3>진행중 챌린지</H3>
                <H3>생성한 챌린지</H3>
                <H3>종료된 챌린지</H3>
            </SortBox>
            <ContentsBox>
                <ContentsGrid>
                    <Contents>
                        <ContentsTop>
                            <Img src="/img/r3.jpg" alt="img" />
                            <CurrentUsers>
                                3/6명
                            </CurrentUsers>
                        </ContentsTop>
                        <ContentsBottom>
                            <Title>
                                <p>제목입니다.</p>
                            </Title>
                            <Day>
                                <p>주 3회</p>
                            </Day>
                        </ContentsBottom>
                    </Contents>


                </ContentsGrid>
            </ContentsBox>
        </>
    )
}

export default Chellange

const H3 =styled.div`
    font-size: 14px;
    font-weight: 500;
    margin-right: 26px;
`
const SortBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 80px auto 40px 0px;
    
`
const ContentsBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-bottom: 20px;
`
const ContentsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    margin-bottom: 20px;
    margin: 0 auto;
    width: 100%;
    gap: 20px 10px;
`
const Contents = styled.div`
    width: 100%;
    border: 1px solid #636363;
    justify-self: center;
    border-radius: 10px;
`
const ContentsTop = styled.div`
    width: 100%;
    padding-bottom: 70%;
    overflow: hidden;
    position: relative;
`
const Img = styled.img`
    width: 100%;
    height: 100%;
    position: absolute;
    object-fit: cover;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
`
const ContentsBottom = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px 10px;
`
const Title = styled.div`
    font-size: 18px;
    font-weight: 600;
`
const Day = styled.div`
    margin-top: 5%;
    margin-left: auto;
    padding: 3px;
    color: #FFFFFF;
    background-color: #636363;
    border-radius: 3px;
`
const CurrentUsers = styled.div`
    margin: 10px;
    padding: 3px;
    color: #FFFFFF;
    background-color: #636363;
    border-radius: 3px;
    position: absolute;
    right: 0;
`
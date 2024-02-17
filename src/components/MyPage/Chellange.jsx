import React, { useState } from 'react'
import styled from 'styled-components'
import { getProfile } from '../../services/Query'
import { useQuery } from 'react-query'
import { MyPageModalPotal } from './Potal'
import MyDetailPage from '../../pages/MyDetailPage/MyDetailPage'

function Chellange() {

    const chellangeData = useQuery('chellangeData', getProfile)

    if (chellangeData.data) {
        console.log(chellangeData.data.challengeList)
    }
    if (chellangeData.isLoading) {
        console.log("로딩중입니다.")
    }
    if (chellangeData.isError) {
        console.log("에러!")
    }

    const [chellangeState, setChellangeState] = useState({
        create: false,
        finish: false
    })

    const [modalState, setModalState] = useState(false)
    const [modalChallengeId, setModalChallengeId] = useState()

    const modalOpen = (challengeId) => {
        setModalChallengeId(challengeId)
        return (
            modalState ? setModalState(false) : setModalState(true)
        )
    }

    const chellange = () => {
        // console.log(chellangeData.data)
        // console.log(currunt)
        if (chellangeData.data) {
            if (chellangeState.create === true) {
                return (
                    chellangeData.data.challengeList
                        .filter((value) => value.challengerRole === "LEADER")
                        .map((value) => {
                            return (
                                <>
                                    <Contents key={value.challengeId}
                                        onClick={() => { modalOpen(value.challengeId) }}
                                    >
                                        <ContentsTop>
                                            <Img src={value.thumbnailImageUrl} alt="img" />
                                            <CurrentUsers>
                                                {value.currentAttendance}/{value.limitAttendance}
                                            </CurrentUsers>
                                        </ContentsTop>
                                        <ContentsBottom>
                                            <Title>
                                                {value.title}
                                            </Title>
                                            <Day>
                                                {value.frequency}
                                            </Day>
                                        </ContentsBottom>
                                    </Contents>
                                    {
                                        modalState === true && modalChallengeId === value.challengeId &&
                                        <MyPageModalPotal>
                                            <MyDetailPage challengeId={value.challengeId} modalOpen={modalOpen} chellangeState={chellangeState} />
                                        </MyPageModalPotal>
                                    }
                                </>
                            )
                        })
                )
            } else if (chellangeState.finish === true) {
                return (
                    chellangeData.data.challengeList
                        .filter((value) => {
                            let currunt = new Date();
                            let limite = new Date(value.dueDate)
                            return limite < currunt
                        })
                        .map((value) => {
                            return (
                                <>
                                    <Contents key={value.challengeId}
                                        onClick={() => { modalOpen(value.challengeId) }}
                                    >
                                        <ContentsTop>
                                            <Img src={value.thumbnailImageUrl} alt="img" />
                                            <CurrentUsers>
                                                {value.currentAttendance}/{value.limitAttendance}
                                            </CurrentUsers>
                                        </ContentsTop>
                                        <ContentsBottom>
                                            <Title>
                                                {value.title}
                                            </Title>
                                            <Day>
                                                {value.frequency}
                                            </Day>
                                        </ContentsBottom>
                                    </Contents>
                                    {
                                        modalState === true && modalChallengeId === value.challengeId &&
                                        <MyPageModalPotal>
                                            <MyDetailPage challengeId={value.challengeId} modalOpen={modalOpen} chellangeState={chellangeState} />
                                        </MyPageModalPotal>
                                    }
                                </>
                            )
                        })
                )
            } else {
                return (
                    chellangeData.data.challengeList
                        .map((value) => {
                            return (
                                <>
                                    <Contents key={value.challengeId}
                                        onClick={() => { modalOpen(value.challengeId) }}
                                    >
                                        <ContentsTop>
                                            <Img src={value.thumbnailImageUrl} alt="img" />
                                            <CurrentUsers>
                                                {value.currentAttendance}/{value.limitAttendance}
                                            </CurrentUsers>
                                        </ContentsTop>
                                        <ContentsBottom>
                                            <Title>
                                                {value.title}
                                            </Title>
                                            <Day>
                                                {value.frequency}
                                            </Day>
                                        </ContentsBottom>
                                    </Contents>
                                    {
                                        modalState === true && modalChallengeId === value.challengeId &&
                                        <MyPageModalPotal>
                                            <MyDetailPage challengeId={value.challengeId} modalOpen={modalOpen} chellangeState={chellangeState} />
                                        </MyPageModalPotal>
                                    }
                                </>
                            )
                        })
                )
            }
        }
    }

    // sort style
    const handleSort1 = () => {
        return chellangeState.create===false &&  chellangeState.finish===false? "1" : ".5" 
    }
    const handleSort2 = () => {
        return chellangeState.create===true ? "1" : ".5" 
    }
    const handleSort3 = () => {
        return chellangeState.finish===true ? "1" : ".5" 
    }

    return (
        <>
            <SortBox>
                <H3 opacity={handleSort1()} onClick={() => { setChellangeState({ ...chellangeState, create: false, finish: false }) }}>진행중 챌린지</H3>
                <H3 opacity={handleSort2()} onClick={() => { setChellangeState({ ...chellangeState, create: true, finish: false }) }}>생성한 챌린지</H3>
                <H3 opacity={handleSort3()} onClick={() => { setChellangeState({ ...chellangeState, create: false, finish: true }) }}>종료된 챌린지</H3>
            </SortBox>
            <ContentsBox>
                <ContentsGrid>
                    {chellangeData.data && chellange()}
                </ContentsGrid>
            </ContentsBox>
        </>
    )
}

export default Chellange

const H3 = styled.div`
    font-size: 14px;
    font-weight: 500;
    margin-right: 26px;
    opacity: ${(props) => props.opacity};
    cursor: pointer;
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
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    min-height: 300px;
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
    cursor: pointer;
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
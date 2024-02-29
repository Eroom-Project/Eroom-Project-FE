import React, { useState } from 'react'
import styled from 'styled-components'
import { getProfile } from '../../services/Query'
import { useQuery } from 'react-query'
import { MyPageModalPotal, MyPageRemovePotal } from '../Common/Potal'
import MyDetailPage from '../../pages/MyDetailPage/MyDetailPage'
import ModalRemove from './ModalRemove'
import { useNavigate } from 'react-router-dom'


function Chellange() {
    

    const chellangeData = useQuery('chellangeData', getProfile)
    console.log('데티터타!!', chellangeData)
    
    if (chellangeData.data) {
        // console.log(chellangeData.data.challengeList)
    }
    if (chellangeData.isLoading) {
        console.log("로딩중입니다.")
    }
    if (chellangeData.isError) {
        console.log("에러!")
    }

    const [chellangeState, setChellangeState] = useState({
        create: false,
        finish: false,
        before: false
    })

    const [modalState, setModalState] = useState(false)
    const [modalRemoveState, setmodalRemoveState] = useState(false)
    // 포커스될 때의 챌린지값을 담아주기
    const [modalChallengeId, setModalChallengeId] = useState()

    const modalOpen = (challengeId) => {
        setModalChallengeId(challengeId)
        return (
            modalState ? setModalState(false) : setModalState(true)
        )
    }
    const modalRemoveOpen = (challengeId, e) => {
        e.stopPropagation();
        setModalChallengeId(challengeId)
        return (
            modalRemoveState ? setmodalRemoveState(false) : setmodalRemoveState(true)
        )
    }
    const navigate = useNavigate('')
    const eaditPage = (challengeId,e) =>{
        e.stopPropagation();
        navigate('/eadit', { state: {challengeId:challengeId } })
    }

    const chellange = () => {
        console.log(chellangeData.data.challengeList.length)
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
                                                {value.currentAttendance}/{value.limitAttendance}명
                                                <img src="/img/userIcon.png" alt="currentuser" />
                                            </CurrentUsers>
                                        </ContentsTop>
                                        <ContentsBottom>
                                            <Day>
                                                {value.frequency}
                                            </Day>
                                            <Title>
                                                {value.title}
                                            </Title>
                                            <NickNameBox>
                                                <NickName>
                                                    {value.creatorNickname}
                                                </NickName>
                                                <IconBox>
                                                    <button onClick={(e) =>eaditPage(value.challengeId, e)}>수정</button>
                                                    <Icon src='/img/MyPage/trash-2.png' alt='remove' onClick={(e) => { modalRemoveOpen(value.challengeId, e) }} />
                                                </IconBox>
                                            </NickNameBox>
                                        </ContentsBottom>
                                    </Contents>
                                    {
                                        modalState === true && modalChallengeId === value.challengeId &&
                                        <MyPageModalPotal>
                                            <MyDetailPage challengeId={value.challengeId} modalOpen={modalOpen} chellangeState={chellangeState} startDate={value.startDate} />
                                        </MyPageModalPotal>
                                    }
                                    {modalRemoveState === true && modalChallengeId === value.challengeId &&
                                        <MyPageRemovePotal>
                                            <ModalRemove modalRemoveOpen={modalRemoveOpen} challengeId={value.challengeId} />
                                        </MyPageRemovePotal>
                                    }
                                </>
                            )
                        })
                )
            } else if (chellangeState.finish === true) {
                return (
                    chellangeData.data.challengeList
                        .filter((value) => {
                            let current = new Date();
                            let limite = new Date(value.dueDate)
                            // console.log("value", value.dueDate)
                            // console.log("value.dueDate", value.dueDate)
                            // console.log("limite", limite)
                            // console.log("currunt", current)

                            return current > limite
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
                                                {value.currentAttendance}/{value.limitAttendance}명
                                                <img src="/img/userIcon.png" alt="currentuser" />
                                            </CurrentUsers>
                                        </ContentsTop>
                                        <ContentsBottom>
                                            <Day>
                                                {value.frequency}
                                            </Day>
                                            <Title>
                                                {value.title}
                                            </Title>
                                            <NickNameBox>
                                                <NickName>
                                                    {value.creatorNickname}
                                                </NickName>
                                            </NickNameBox>
                                        </ContentsBottom>
                                    </Contents>
                                    {
                                        modalState === true && modalChallengeId === value.challengeId &&
                                        <MyPageModalPotal>
                                            <MyDetailPage challengeId={value.challengeId} modalOpen={modalOpen} chellangeState={chellangeState} startDate={value.startDate} />
                                        </MyPageModalPotal>
                                    }
                                    {modalRemoveState === true &&
                                        <MyPageRemovePotal >
                                            <ModalRemove />
                                        </MyPageRemovePotal>
                                    }
                                </>
                            )
                        })
                )
            } else if (chellangeState.before === true) {
                return (
                    chellangeData.data.challengeList
                        .filter((value) => {
                            let current = new Date();
                            let start = new Date(value.startDate)
                            return start > current
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
                                                {value.currentAttendance}/{value.limitAttendance}명
                                                <img src="/img/userIcon.png" alt="currentuser" />
                                            </CurrentUsers>
                                        </ContentsTop>
                                        <ContentsBottom>
                                            <Day>
                                                {value.frequency}
                                            </Day>
                                            <Title>
                                                {value.title}
                                            </Title>
                                            <NickNameBox>
                                                <NickName>
                                                    {value.creatorNickname}
                                                </NickName>
                                            </NickNameBox>
                                        </ContentsBottom>
                                    </Contents>
                                    {
                                        modalState === true && modalChallengeId === value.challengeId &&
                                        <MyPageModalPotal>
                                            <MyDetailPage challengeId={value.challengeId} modalOpen={modalOpen} chellangeState={chellangeState} startDate={value.startDate} />
                                        </MyPageModalPotal>
                                    }
                                    {modalRemoveState === true &&
                                        <MyPageRemovePotal >
                                            <ModalRemove />
                                        </MyPageRemovePotal>
                                    }
                                </>
                            )
                        })
                )
            } else {
                return (
                    chellangeData.data.challengeList
                        .filter((value) => {
                            let current = new Date();
                            let limite = new Date(value.dueDate)
                            let start = new Date(value.startDate)
                            return limite >= current && start < current
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
                                                {value.currentAttendance}/{value.limitAttendance}명
                                                <img src="/img/userIcon.png" alt="currentuser" />
                                            </CurrentUsers>
                                        </ContentsTop>
                                        <ContentsBottom>
                                            <Day>
                                                {value.frequency}
                                            </Day>
                                            <Title>
                                                {value.title}
                                            </Title>
                                            <NickNameBox>
                                                <NickName>
                                                    {value.creatorNickname}
                                                </NickName>
                                            </NickNameBox>
                                        </ContentsBottom>
                                    </Contents>
                                    {
                                        modalState === true && modalChallengeId === value.challengeId &&
                                        <MyPageModalPotal>
                                            <MyDetailPage challengeId={value.challengeId} modalOpen={modalOpen} chellangeState={chellangeState} startDate={value.startDate} />
                                        </MyPageModalPotal>
                                    }
                                    {modalRemoveState === true &&
                                        <MyPageRemovePotal>
                                            <ModalRemove />
                                        </MyPageRemovePotal>
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
        return chellangeState.create === false && chellangeState.finish === false && chellangeState.before === false ? "1" : ".5"
    }
    const handleSort2 = () => {
        return chellangeState.create === true ? "1" : ".5"
    }
    const handleSort3 = () => {
        return chellangeState.finish === true ? "1" : ".5"
    }
    const handleSort4 = () => {
        return chellangeState.before === true ? "1" : ".5"
    }

    return (
        <>
            <SortBox>
                <H3 opacity={handleSort1()} onClick={() => { setChellangeState({ ...chellangeState, create: false, finish: false, before: false }) }}>진행중 챌린지</H3>
                <H3 opacity={handleSort2()} onClick={() => { setChellangeState({ ...chellangeState, create: true, finish: false, before: false }) }}>생성한 챌린지</H3>
                <H3 opacity={handleSort4()} onClick={() => { setChellangeState({ ...chellangeState, create: false, finish: false, before: true }) }}>예약된 챌린지</H3>
                <H3 opacity={handleSort3()} onClick={() => { setChellangeState({ ...chellangeState, create: false, finish: true, before: false }) }}>종료된 챌린지</H3>
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
    font-weight: 700;
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
    min-height: 350px;
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
    width: 284px;
    height: 320px;
    border: 1px solid #9D9D9D;
    justify-self: center;
    border-radius: 10px;
    cursor: pointer;
`
const ContentsTop = styled.div`
    width: 100%;
    padding-bottom: 200px;
    overflow: hidden;
    position: relative;
`
const CurrentUsers = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 10px;
    padding: 3px;
    color: #D75329;
    background-color: #FFE5B3;
    border-radius: 3px;
    position: absolute;
    right: 0;
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
    padding: 16px 10px;
    gap: 8px;
`
const Title = styled.div`
    font-size: 18px;
    font-weight: 700;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`
const NickNameBox = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 20px;
`
const NickName = styled.div`
    color:#9D9D9D;
`
const IconBox = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: auto;
`
const Icon = styled.img`
    width: 23px;
`
const Day = styled.div`
    font-size: 12px;
    /* width: 47px;
    height: 20px; */
    margin-right: auto;
    padding: 4px 8px;
    color: #FFFFFF;
    background-color: #F87C54;
    border-radius: 3px;
`
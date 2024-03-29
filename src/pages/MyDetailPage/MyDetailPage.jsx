import React from 'react'
import styled from 'styled-components'
import { useQuery } from 'react-query'
import { getChallengeDetail } from '../../services/Query'
import { useNavigate } from 'react-router-dom'

function MyDetailPage({ challengeId, modalOpen, chellangeState, startDate, imiteDate }) {
    const challengeDetailData = useQuery(
        ['challengeDetailData', challengeId],
        () => getChallengeDetail(challengeId),)

    if (challengeDetailData.isLoading) {
        console.log("로딩")
    }

    if (challengeDetailData.data) {
        console.log("디테일 페이지입니다.")
        console.log(challengeDetailData.data)
    }

    if (challengeDetailData.isError) {
        console.log("에러")
    }

    const categoryMap = {
        IT: 'IT',
        HUMANITIES: '인문',
        MATH: '수학',
        SCIENCE: '과학',
        ARTS_AND_PHYSICAL_EDUCATION: '예체능',
        FOREIGN_LANGUAGE: '외국어',
        ETC: '기타',
    };
    const translatedCategory = categoryMap[challengeDetailData?.data?.responseDto?.category] || ''
    const navigate = useNavigate("")
    const roomIn = () => {
        navigate("/room", { state: { challengeId: challengeDetailData?.data.responseDto.challengeId, memberId: challengeDetailData?.data.loginMemberId, title: challengeDetailData?.data.responseDto.title, nickname: challengeDetailData?.data.loginMemberNickname, profileImageUrl:challengeDetailData?.data.loginMemberProfileImageUrl  } })
    }

    // 버튼 스테이트 만들기
    const myDetailButton = () => {
        let current = new Date();
        let start = new Date(startDate)
        start.setHours(start.getHours() - 9);
        let limite = new Date(imiteDate)
        limite.setDate(limite.getDate() + 1);
        limite.setHours(limite.getHours() - 9);

        if (current > limite) {
            return <Button bcolor={"#1C1C1C"} color={"#FFFF"}>종료된 챌린지입니다.</Button>
        } else if (start > current) {
            return <Button bcolor={"#1C1C1C"} color={"#FFFF"}>예약된 챌린지입니다.</Button>
        } else {
            return <Button onClick={roomIn} bcolor={"#45b850;"} color={"#FFFF"}>챌린지방 입장하기</Button>
        }

    }
    return (
        <>
            <Back onClick={modalOpen}>
            </Back>
            <MainBox>
                <ContentsBox>
                    <X src="/img/x.png" alt="close" onClick={modalOpen} />
                    {
                        challengeDetailData.data &&
                        <>
                            <ImgBox>
                                {<Img src={challengeDetailData.data.responseDto.thumbnailImageUrl} alt="" />}
                            </ImgBox>
                            <TitleBox>
                                <Title>
                                    {challengeDetailData.data.responseDto.title}
                                </Title>
                                <Category>
                                    {translatedCategory}
                                </Category>
                                <Description>
                                    {challengeDetailData.data.responseDto.description}
                                </Description>
                            </TitleBox>
                            <InfoBox>
                                <Category>
                                    <Bold>참여기간</Bold> &nbsp; {`${challengeDetailData.data.responseDto.startDate} ~ ${challengeDetailData.data.responseDto.dueDate}`}
                                </Category>
                                <Category>
                                    <Bold>운영횟수</Bold> &nbsp; {`${challengeDetailData.data.responseDto.frequency} 참여`}
                                </Category>
                                <Category>
                                    <Bold>참여인원</Bold> &nbsp; {`${challengeDetailData.data.responseDto.currentAttendance}명 / ${challengeDetailData.data.responseDto.limitAttendance}명`}
                                </Category>
                                <Category>
                                    <Bold>인증방식</Bold> &nbsp; {challengeDetailData.data.responseDto.authExplanation}
                                </Category>
                            </InfoBox>
                        </>
                    }
                    {myDetailButton()}
                </ContentsBox>
            </MainBox>
        </>
    )
}

export default MyDetailPage

const Back = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(10px);
    background-color: rgba(116, 116, 116, 0.281);
    z-index: 1;
`

const X = styled.img`
    margin-left: 100%;
    font-weight: 500;
    cursor: pointer;
`
const MainBox = styled.div`
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    height: 700px;
    padding: 23px 24px;
    border-radius: 10px;
    z-index: 1;
`

const ContentsBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 430px;
    gap: 23px;
`
const ImgBox = styled.div`
    width: 100%;
    height: 220px;
`
const Img = styled.img`
    width: 100%;
    height: 100%;
    object-fit: contain;
`
const TitleBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    height: 150px;
    overflow: auto;
    &::-webkit-scrollbar {
    width: 10px;
    height: 10px;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb {
    width: 1px;
    border-radius: 10px;
    background-color: #dfdddd;
  }
  &::-webkit-scrollbar-track {
    background-color: #F2F2F2;
  }
`
const Title = styled.div`
    font-size: 18px;
    font-weight: 700;
    line-height: 1.2;
`
const Category = styled.div`
    font-size: 14px;
    font-weight: 400;
    color: #9D9D9D;
`
const Description = styled.div`
    font-size: 14px;
    font-weight: 500;
    line-height: 1.5;
`
const InfoBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 10px;
    padding: 18px;
    width: 100%;
    height: 125px;
    background-color: #F2F2F2;
    border-radius: 10px;
`
const Bold = styled.span`
    font-size: 14px;
    font-weight: 700;
    color: black;
`
const Button = styled.button`
    font-family: 'Noto Sans KR', sans-serif;
    font-weight: 500;
    font-size: 14px;
    font-weight: 700;
    width: 100%;
    height: 48px;
    border: none;
    border-radius: 10px;
    color: ${(props) => props.color};
    background-color: ${(props) => props.bcolor};
    cursor: pointer;
    transition: 1s;
`

import React from 'react'
import styled from 'styled-components'
import api from '../../services/api'
import { useNavigate } from 'react-router-dom'
import { QueryClient, useMutation, useQueryClient } from 'react-query'
import { deleteChallenge } from '../../services/Query'

function ModalRemove({ modalRemoveOpen, challengeId }) {
    const queryClient = useQueryClient();
    const mutation = useMutation(deleteChallenge, {
        onSuccess: () => {
            queryClient.invalidateQueries("chellangeData")
            console.log("챌린지가 삭제 성공")
        },
        onError: () => {
            console.log("챌린지가 삭제 오류")
        }
    })

    const remove = (e) => {
        console.log('aaaaaaa',challengeId)
        mutation.mutate(challengeId)
        modalRemoveOpen(challengeId, e)
        alert("챌린지가 삭제됐습니다.")
    }

    return (
        <>
            <BackGround>
            </BackGround>
            <ContentsBox>
                <img src="/img/sad.png" alt="modal" />
                <TitleBox>
                    <Title>삭제한 챌린지는 복구할 수 없어요</Title>
                    <Text>그래도 삭제하시겠어요?</Text>
                </TitleBox>
                <ButtonBox>
                    <Button onClick={(e) => { modalRemoveOpen(challengeId, e) }} color={"#626262"} backcolor={"white"} border={"1px solid #626262"}>취소</Button>
                    <Button onClick={(e)=> {remove(e)}} color={"white"} backcolor={"#1C1C1C"} border={"none"}>삭제</Button>
                </ButtonBox>
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
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    width: 390px;
    height: 250px;
    border-radius: 10px;
`

const TitleBox = styled.p`
    text-align: center;
    line-height: 27px;
    margin: 13px 0px;
`
const Title = styled.p`
    font-size: 18px;
    font-weight: 700;
`

const Text = styled.p`
    font-weight: 300;
    color: #A5A5A5;
`
const ButtonBox = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 11px;
`
const Button = styled.button`
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 15px;
    font-weight: 600;
    color: ${(props) => props.color};
    background-color: ${(props) => props.backcolor};
    width: 175px;
    height: 40px;
    border: ${(props) => props.border};
    border-radius: 8px;
    cursor: pointer;
`

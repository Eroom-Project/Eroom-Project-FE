import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { checkPassword } from '../../services/Query'

function ModalPassword({ setPasswordModal, openChangeState, setopenChangeState }) {

    const [value, setValue] = useState({
        password: ""
    })
    // const passwordValue = { ...value, password: value }
    // const currentPassword = useQuery(
    //     ['checkPassword', passwordValue, openChangeState, setopenChangeState],
    //     () => checkPassword(passwordValue, openChangeState, setopenChangeState)
    // )

    const queryClient = useQueryClient()
    const mutation = useMutation(checkPassword, {
        onSuccess: () => {
            queryClient.invalidateQueries("profileData")
            setopenChangeState({
                ...openChangeState,
                password: true,
                image: false,
                email: false,
                nickname: false,
            })
            setValue("")
            setPasswordModal(false)
        }
    })
    const handlePassword = () => {
        mutation.mutate(value)
    }
    const handleOnKey = (e) => {
        if (e.key === 'Enter') {
            handlePassword()
            setPasswordModal(false) 
        }
    }
    return (
        <>
            <BackGround>
            </BackGround>

            <ContentsBox>
                <img src="/img/smile.png" alt="modal" />
                <TitleBox>
                    <Input
                        type='password'
                        placeholder='현재 비밀번호를 입력해주세요'
                        value={value}
                        onChange={(e) => {
                            setValue(e.target.value)
                        }}
                        onKeyDown={handleOnKey}
                    />
                </TitleBox>
                <ButtonBox>
                    <Button onClick={() => { setPasswordModal(false) }} color={"#626262"} backcolor={"white"} border={"1px solid #626262"}>취소</Button>
                    <Button onClick={handlePassword} color={"white"} backcolor={"#1C1C1C"} border={"none"}>확인</Button>
                </ButtonBox>
            </ContentsBox>
        </>
    )
}

export default ModalPassword

const BackGround = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(10px);
    background-color: rgba(116, 116, 116, 0.281);
    z-index:1;
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
    z-index:1;
`

const TitleBox = styled.p`
    text-align: center;
    line-height: 27px;
    margin: 13px 0px;
    width: 90%;
`
const Title = styled.p`
    font-size: 18px;
    font-weight: 700;
`

const Input = styled.input`
    margin: 0px;
    padding: 0px;
    width: 200px;
    height: 30px;
    border: none;
    border-bottom: 1px solid #A5A5A5;
    text-align: center;
    &:focus{outline: none;}
    box-sizing: border-box;
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

import React, { useState } from 'react'
import useInput from '../../hooks/useInput'
import {
    MainForm,
    H1,
    InputBox,
    InnerBox,
    Input,
    Logo,
    // 이메일
    EmailForm,
    EmailTitle,
    EmailImg,
    EmailButtonBox,
    EmailButton,
    EmailContents,
} from '../../styles/SignPage/SignPage'
import { useMutation } from 'react-query'
import { getVerificationEmail, postVerificationEmail } from '../../services/Query'

function VerificationEmail({ setVerificationEmail, email, setCheck, check }) {

    // 이메일 인증 보내기
    const mutationEmailPost = useMutation(postVerificationEmail, {
        onSuccess: (data) => {
            alert(data.message)
        },
        onError: () => {
            alert("이메일이 전송 통신에 문제가 있습니다.")
        }
    })
    // 이메일 코드 확인
    const mutationEmailGet = useMutation(getVerificationEmail, {
        onSuccess: (data) => {
            console.log(data)
            if (data.message === "인증이 완료되었습니다.") {
                alert(data.message)
                setCheck({ ...check, email: true })
                setVerificationEmail(false)
            } else {
                alert(data.message)
            }
        },
        onError: () => {
            alert("이메일 확인 통신에 문제가 있습니다.")
        }
    })

    const heandleEmailPost = () => {
        mutationEmailPost.mutate(email)
    }

    const heandleEmailGet = () => {
        const emailcode = {
            email,
            code: emailValue,
        }
        mutationEmailGet.mutate(emailcode)
    }

    // 인풋 value onchange
    const [emailValue, onChangeEmail] = useInput()

    // 엔터 치면 로직 여기로
    const handleOnKey = (e) => {
        if (e.key === 'Enter') {

        }
    }
    // 포커스 상태
    const [focusState, setFocusState] = useState({
        email: false,
        // nickname: false,
        // password: false,
        // checkPassword: false,
    });

    const handlerFocus = (name) => {
        setFocusState({
            ...focusState,
            [name]: true
        })
    }

    const handlerBlur = (name) => {
        setFocusState({
            ...focusState,
            [name]: false
        })
    }

    return (
        <>
            <MainForm >
                <EmailTitle>
                    <H1>이메일 인증</H1>
                    <EmailImg src="/img/x.png" alt="close" onClick={() => setVerificationEmail(false)} />
                </EmailTitle>
                <EmailForm>
                    <InputBox>
                        <EmailContents>입력하신 "{email}" 으로 인증 메일을 전송하였습니다.</EmailContents>
                        <InnerBox>
                            <Input
                                type="text"
                                name="email"
                                placeholder='이메일로 전달드린 인증번호를 입력해 주세요'
                                value={emailValue}
                                onChange={(e) => {
                                    onChangeEmail(e)
                                }}
                                onFocus={() => { handlerFocus("email") }}
                                onBlur={() => { handlerBlur("email") }}
                                onKeyDown={handleOnKey}
                                border={focusState.email ? "1px solid #1C1C1C" : "none"}
                                bcolor={focusState.email ? "transparent" : "#F2F2F2"}
                            />
                        </InnerBox>
                    </InputBox>
                    <EmailButtonBox>
                        <EmailButton onClick={heandleEmailPost}>
                            재전송하기
                        </EmailButton>
                        <EmailButton onClick={heandleEmailGet}>
                            인증하기
                        </EmailButton>
                    </EmailButtonBox>
                </EmailForm>
            </MainForm>
        </>
    )
}

export default VerificationEmail
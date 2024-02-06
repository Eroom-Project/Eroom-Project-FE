import React, { useState } from 'react'
import api from '../../services/api'
import styled from 'styled-components'
import Isometric from '../../components/Common/Isometric'
import { getProfile } from '../../services/Query'
import { useQuery } from 'react-query'
import {
    Message,
    MainForm,
    Form,
    InputBox,
    InnerBox,
    AuthButton,
    H6,
    Input,
    Button,
} from '../../styles/SignPage/SignPage'


function MyPage() {

    const profileData = useQuery('getProfile', getProfile())


    const [input, setInput] = useState({
        email: '',
        password: '',
        nickname: '',
    })

    // 중복확인 주소 확인하기
    // 이메일 중복확인
    const emailCheck = async () => {
        try {
            const res = await api.get("/api/signup/email",{
                nickname: input.email
            })

            if (res.data.message === "사용 가능한 email입니다.") {
                setCheck({ ...check, email: true })
                alert(res.data.message)
            } else {
                alert("이미 존재하는 이메일입니다.")
            }
        } catch (error) {
            console.log(`서버 에러: ${error}`)
        }
    }

    // 닉네임 중복확인
    const nickNameCheck = async () => {
        try {
            const res = await api.get("/api/signup/nickname", {
                nickname: input.nickname
            })
            if (res.data.message === "사용 가능한 닉네임입니다.") {
                setCheck({ ...check, nickname: true })
                alert(res.data.message)
            } else {
                alert("이미 존재하는 닉네임입니다.")
            }

        } catch (error) {
            console.log(`서버 에러: ${error}`)
        }
    }

    // 로그인 실험해보고 아래 회원가입 && 조건에 추가하기
    const [check, setCheck] = useState({
        email: false,
        nickname: false
    })

    // massage state
    const [focusState, setFocusState] = useState({
        email: false,
        nickname: false,
        password: false,
        checkPassword: false,
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

    // 유효성 검사

    const handleInputChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        authInput(e.target.name, e.target.value)
    }

    // '아이디는 @, . 을 포함해야합니다.'
    // '비밀번호는 영문, 숫자, 특문 조합 8~15글자입니다.'
    const authInput = (name, value) => {
        let state = false
        switch (name) {
            case "email":
                state = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/.test(value);
                break;
            case "password":
                state = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/.test(value);
                break;
            case "checkPassword":
                state = value === input.password
                break;
            case "nickname":
                state = /^.{3,10}$/.test(value);
                break;
            default:
                state = true;
        }
        setAuth({
            ...auth,
            [name]: state
        });
    }

    // 유효성 검사 통과 후 상태 값
    const [auth, setAuth] = useState({
        email: false,
        password: false,
        checkPassword: false,
        nickname: false,
    })

    console.log(auth)

    // 유효성 검사 통과 했을 때 회원가입 가능
    const signUp = async () => {
        if (auth.email && auth.password && auth.checkPassword && auth.nickname) {
            try {
                const newUser = {
                    email: input.email,
                    password: input.password,
                    nickname: input.nickname,
                }
                const response = await api.put("/api/member/profile", newUser)
                console.log(response.data)
                alert("회원 정보 수정이 완료됐습니다.")

            } catch (error) {
                console.log(error)
                alert('회원 정보 수정에 문제가 있습니다.')
            }
        }
    }

    // massage state를 통해 state 출력
    const message = (name) => {
        return (auth[name] ?
            <Message focus={"block"} style={{ color: "#5EC75E" }}> 확인됐습니다. </Message>
            :
            <Message focus={focusState[name] ? "block" : "none"} style={{ color: "red" }}> 입력해주세요. </Message>)
    }


    const button = () => {
        return (auth.email && auth.password && auth.checkPassword && auth.nickname ?
            <Button color={"#5EC75E"} type='button' onClick={signUp}>수정하기</Button>
            :
            <Button color={"#636363"} type='button'>수정하기</Button>)
    }
    return (
        <MainBox>
            <ProfileBox>
                <Isometric />
                <Profile>
                    <div>
                        프로필 이미지
                    </div>
                    <MainForm>
                        <Form>
                            <InputBox>
                                <H6>이메일: {message("email")}</H6>
                                <InnerBox>
                                    <Input
                                        type="text"
                                        name="email"
                                        placeholder = {profileData.data.email}
                                        onFocus={() => { handlerFocus("email") }}
                                        onBlur={() => { handlerBlur("email") }}
                                        value={input.email}
                                        onChange={(e) => {
                                            handleInputChange(e)
                                        }}
                                    />
                                    <AuthButton onClick={emailCheck}>
                                        중복<br />
                                        확인
                                    </AuthButton>
                                </InnerBox>
                            </InputBox>
                            <InputBox>
                                <H6>닉네임: {message("nickname")}</H6>
                                <InnerBox>
                                    <Input
                                        type="text"
                                        name="nickname"
                                        placeholder= {profileData.data.nickname}
                                        onFocus={() => { handlerFocus("nickname") }}
                                        onBlur={() => { handlerBlur("nickname") }}
                                        value={input.nickname}
                                        onChange={(e) => { handleInputChange(e) }}
                                    />
                                    <AuthButton onClick={nickNameCheck}>
                                        중복<br />
                                        확인
                                    </AuthButton>
                                </InnerBox>
                            </InputBox>
                            <InputBox>
                                <H6>비밀번호: {message("password")}</H6>
                                <Input
                                    type="password"
                                    name="password"
                                    placeholder= {profileData.data.password}
                                    onFocus={() => { handlerFocus("password") }}
                                    onBlur={() => { handlerBlur("password") }}
                                    value={input.password}
                                    onChange={(e) => { handleInputChange(e) }}
                                />
                            </InputBox>
                            <InputBox>
                                <H6>비밀번호 확인: {message("checkPassword")}</H6>
                                <Input
                                    type="password"
                                    name="checkPassword"
                                    placeholder='비밀번호를 확인해주세요.'
                                    onFocus={() => { handlerFocus("checkPassword") }}
                                    onBlur={() => { handlerBlur("checkPassword") }}
                                    value={input.checkPassword}
                                    onChange={(e) => { handleInputChange(e) }}
                                />
                            </InputBox>
                            {button()}
                        </Form>
                    </MainForm>
                </Profile>
            </ProfileBox>
        </MainBox>
    )
}

export default MyPage

const MainBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

`
const ProfileBox = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`
const Profile = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

import React, { useState } from 'react'
import api from '../../services/api';
import { setCookie } from '../../services/Cookie';
import KakaoSignIn from './KakaoSignIn';
import { useNavigate } from 'react-router-dom';
import {
    Message,
    Back,
    MainForm,
    Form,
    H1,
    InputBox,
    Hr,
    H6,
    Input,
    Button,
    KakaoSignForm,
    SignUp,
    Bold,
} from '../../styles/SignPage/SignPage'


function SignInPage() {
    const navigate = useNavigate()
    const [focusState, setFocusState] = useState({
        email: false,
        password: false,
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

    //유효성 검사
    const [input, setInput] = useState({
        email: '',
        password: '',
    })

    const handleInputChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        authInput(e.target.name, e.target.value)
    }

    const authInput = (name, value) => {
        let state = false
        switch (name) {
            case "email":
                state = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/.test(value);
                break;
            case "password":
                state = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/.test(value);
                break;
            default:
                state = true;
        }
        setAuth({
            ...auth,
            [name]: state
        })
    }

    const [auth, setAuth] = useState({
        email: false,
        password: false,
    })
    console.log(auth)

    // 토큰 어떻게 들어오는지 보기
    // Authorization: Bearer <token>
    const signIn = async () => {
        if (auth.email && auth.password) {
            try {
                const newUser = {
                    email: input.email,
                    password: input.password
                }
                const res = await api.post("/api/login", newUser)
                console.log(res.data)
                // res.data.token && setCookie("token", `JWT ${res.data.token}`, {
                //     path: "/",
                //     httpyOnly: true,
                //     secure: true
                // })
                navigate("/")
            } catch (error) {
                alert("로그인 에러")
                console.log("Login failed:", error)
            }
        }
    }

    const message = (name) => {
        return (auth[name] ?
            <Message focus={"block"} style={{ color: "#5EC75E" }}> 확인됐습니다. </Message>
            :
            <Message focus={focusState[name] ? "block" : "none"} style={{ color: "red" }}> 입력해주세요. </Message>)
    }


    const button = () => {
        return (auth.email && auth.password ?
            <Button color={"#5EC75E"} type='button' onClick={signIn}>로그인</Button>
            :
            <Button color={"#636363"} type='button'>정보를 입력해 주세요</Button>)
    }

    return (
        <Back>
            <MainForm>
                <H1>로그인</H1>
                <Form>
                    <InputBox>
                        <H6>이메일: {message("email")}</H6>
                        <Input
                            name="email"
                            type="text"
                            onFocus={() => { handlerFocus("email") }}
                            onBlur={() => { handlerBlur("email") }}
                            value={input.email}
                            onChange={(e) => { handleInputChange(e) }}
                        />
                    </InputBox>
                    <InputBox>
                        <H6>비밀번호: {message("password")}</H6>
                        <Input
                            name="password"
                            type="password"
                            onFocus={() => { handlerFocus("password") }}
                            onBlur={() => { handlerBlur("password") }}
                            value={input.password}
                            onChange={(e) => { handleInputChange(e) }}
                        />
                    </InputBox>
                    {button()}
                    <Hr />
                    <KakaoSignForm>
                        <KakaoSignIn />
                        <SignUp>아직 이룸 회원이 아니신가요? <a href='/signUp'><Bold>회원가입</Bold></a></SignUp>
                    </KakaoSignForm>
                </Form>
            </MainForm>
        </Back>
    )
}

export default SignInPage

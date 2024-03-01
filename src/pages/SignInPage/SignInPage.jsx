import React, { useState } from 'react'
import api from '../../services/api';
import KakaoSignIn from './KakaoSignIn';
import { useNavigate, useOutletContext } from 'react-router-dom';
import SignBacks from '../../components/SignPage/SignBacks';
import {
    Message,
    Background,
    SignBack,
    MainForm,
    Logo,
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

    // 전역으로 로그인 상태 관리
    const { setAccessState, setWithExpire } = useOutletContext();

    // 토큰 어떻게 들어오는지 보기
    // Authorization: Bearer <token>
    // const dispatch = useDispatch()
    // 10080
    const signIn = async () => {
        if (auth.email && auth.password) {
            try {
                const newUser = {
                    email: input.email,
                    password: input.password
                }
                const res = await api.post("/api/login", newUser)
                console.log(res)
                if (res.status === 200) {
                    setWithExpire("localRefresh", true, 10080)
                    setAccessState(true)
                    navigate("/")
                }
            } catch (error) {
                alert("존재하지 않는 정보입니다.")
                console.log("E-ROOM Login failed:", error)
            }
        }
    }

    const message = (name) => {
        switch (name) {
            case "email":
                if (auth[name]) {
                    return <Message focus={"block"} style={{ color: "#5EC75E" }}> 확인됐습니다. </Message>
                } else {
                    return <Message focus={focusState[name] ? "none" : "block"} style={{ color: "#ff7575" }}> 이메일을 입력해주세요. </Message>
                }
            case "password":
                return (
                    auth[name] ? <Message focus={"block"} style={{ color: "#5EC75E" }}> 확인됐습니다. </Message>
                        :
                        <Message focus={focusState[name] ? "none" : "block"} style={{ color: "#ff7575" }}> 비밀번호를 입력해주세요. </Message>)
            default:
                <Message focus={focusState[name] ? "none" : "block"} style={{ color: "#ff7575" }}> 정보를 입력해주세요. </Message>
        }
    }


    const button = () => {
        return (auth.email && auth.password ?
            <Button color={"#5EC75E"} type='button' onClick={signIn}>로그인</Button>
            :
            <Button color={"#1C1C1C"} type='button'>정보를 입력해주세요.</Button>)
    }

    const handleOnKey = (e) => {
        if (e.key === 'Enter') {
            signIn()
        }
    }

    return (
        <Background>
            <SignBacks />
            <SignBack>
                <MainForm>
                        <Logo src="/img/Logo.png" alt="logo" />
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
                                placeholder='example@naver.com'
                                onKeyDown={handleOnKey}
                                border={focusState.email ? "1px solid #1C1C1C" : "none"}
                                bcolor={focusState.email ? "transparent" : "#F2F2F2"}
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
                                placeholder='********'
                                onKeyDown={handleOnKey}
                                border={focusState.password ? "1px solid #1C1C1C" : "none"}
                                bcolor={focusState.password ? "transparent" : "#F2F2F2"}
                            />
                        </InputBox>
                        {button()}
                        <Hr />
                        <KakaoSignForm>
                            <KakaoSignIn />
                            <SignUp>아직 이룸 회원이 아니신가요? <a href='/signup'><Bold>회원가입</Bold></a></SignUp>
                        </KakaoSignForm>
                    </Form>
                </MainForm>
            </SignBack>
        </Background>
    )
}

export default SignInPage

import React, { useState } from 'react'
import api from '../../services/api'
import { useNavigate } from 'react-router-dom'
import {
    Message,
    Background,
    ImgBack,
    Img1,
    Img2,
    Img3,
    Img4,
    Img5,
    Img6,
    SignBack,
    MainForm,
    Form,
    H1,
    InputBox,
    InnerBox,
    AuthButton,
    H6,
    Input,
    Button,
} from '../../styles/SignPage/SignPage'

function SignUpPage() {

    const [input, setInput] = useState({
        email: '',
        password: '',
        nickname: '',
    })

    // 중복확인 주소 확인하기
    // 이메일 중복확인
    const emailCheck = async () => {
        try {
            const res = await api.get("/api/signup/email", {
                params: { email: input.email }
            })
            console.log(res)
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
                params: { nickname: input.nickname }
            })
            console.log(res)
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
    console.log(check)

    // massage state
    const navigate = useNavigate();
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
            case "nickname":
                state = /^.{3,10}$/.test(value);
                break;
            case "password":
                state = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/.test(value);
                break;
            case "checkPassword":
                state = value === input.password
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
                const response = await api.post("/api/signup", newUser)
                console.log(response.data)
                alert("회원가입이 완료됐습니다.")
                navigate("/signin")
            } catch (error) {
                console.log(error)
                alert('회원가입에 문제가 있습니다.')
            }
        }
    }

    // massage state를 통해 state 출력 
    const message = (name) => {
        switch (name) {
            case "email":
                if (auth[name] && check.email) {
                    return <Message focus={"block"} style={{ color: "#5EC75E" }}> 확인됐습니다. </Message>
                } else if (auth[name]) {
                    return <Message focus={"block"} style={{ color: "red" }}> 중복확인이 필요합니다. </Message>
                } else {
                    return <Message focus={focusState[name] ? "block" : "none"} style={{ color: "red" }}> {name}을 입력해주세요. </Message>
                }
            case "nickname":
                if (auth[name] && check.nickname) {
                    return <Message focus={"block"} style={{ color: "#5EC75E" }}> 확인됐습니다. </Message>
                } else if (auth[name]) {
                    return <Message focus={"block"} style={{ color: "red" }}> 중복확인이 필요합니다. </Message>
                } else {
                    return <Message focus={focusState[name] ? "block" : "none"} style={{ color: "red" }}> {name}을 입력해주세요. </Message>
                }
            case "password":
                return (
                    auth[name] ? <Message focus={"block"} style={{ color: "#5EC75E" }}> 확인됐습니다. </Message>
                        :
                        <Message focus={focusState[name] ? "block" : "none"} style={{ color: "red" }}> {name}을 입력해주세요. </Message>)
            case "checkPassword":
                return (
                    auth[name] ? <Message focus={"block"} style={{ color: "#5EC75E" }}> 확인됐습니다. </Message>
                        :
                        <Message focus={focusState[name] ? "block" : "none"} style={{ color: "red" }}> {name}을 입력해주세요. </Message>)
            default:
                <Message focus={focusState[name] ? "block" : "none"} style={{ color: "red" }}> {name}을 입력해주세요. </Message>
        }
    }

    // 유효성검사 중복확인 전부 통과해야 회원가입 가능
    const button = () => {
        return (auth.email && auth.password && auth.checkPassword && auth.nickname && check.email && check.nickname ?
            <Button color={"#5EC75E"} type='button' onClick={signUp}>회원가입하기</Button>
            :
            <Button color={"#636363"} type='button'>정보를 입력해 주세요</Button>)
    }

    return (
        <Background>
            <ImgBack>
            <Img1 src="/img/BackMongu.png" alt="" />
                <Img2 src="/img/BackKoji.png" alt="" />
                <Img3 src="/img/BackDanja.png" alt="" />
                <Img4 src="/img/BackRoro.png" alt="" />
                <Img5 src="/img/BackBoori.png" alt="" />
                <Img6 src="/img/BackPoopoo.png" alt="" />
            </ImgBack>
            <SignBack>
                <MainForm >
                    <H1>회원가입</H1>
                    <Form>
                        <InputBox>
                            <H6>이메일: {message("email")}</H6>
                            <InnerBox>
                                <Input
                                    type="text"
                                    name="email"
                                    placeholder='이메일을 입력해주세요.'
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
                                    placeholder='닉네임은 3~10 자리입니다.'
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
                                placeholder='영문, 숫자, 특수문자 조합 8~15 자리입니다.'
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
            </SignBack>
        </Background>
    )
}

export default SignUpPage
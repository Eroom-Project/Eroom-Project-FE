import React, { useEffect, useRef, useState } from 'react'
import api from '../../services/api';
import { setCookie } from '../../services/Cookie';
import KakaoSignIn from './KakaoSignIn';
import { useNavigate } from 'react-router-dom';
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
    // const dispatch = useDispatch()
    const signIn = async () => {
        if (auth.email && auth.password) {
            try {
                const newUser = {
                    email: input.email,
                    password: input.password
                }
                const res = await api.post("/api/login", newUser)
                console.log(res.status)
                if (res.status === 200) {
                    window.localStorage.setItem("localaccess", true)
                    navigate("/")
                }
            } catch (error) {
                alert("로그인 에러")
                console.log("E-ROOM Login failed:", error)
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
            <Button color={"#1C1C1C"} type='button'>정보를 입력해 주세요</Button>)
    }

    const handleOnKey = (e) => {
        if (e.key === 'Enter') {
            signIn()
        }
    }
    ///////
    const ref = useRef([])

    useEffect(()=>{
        console.log(ref)
        
        const parallax = (e) => {
            ref.current.forEach(function(value){
                let moving = value.getAttribute("data-value")
                let x  = (e.clientX * moving) / 250
                let y  = (e.clientY * moving) / 250
                value.style.transform = "translateX(" + x +"px) translateY(" + y +"px)"
            })
        }
        console.log(ref)
        document.addEventListener("mousemove", parallax);
        return () => {
            document.removeEventListener("mousemove", parallax);
        }
        
    }, [])
    return (
        <Background>
            <ImgBack>
                <Img1 src="/img/BackMongu.png" ref={el => ref.current[0]=el} data-value="-2" alt="" />
                <Img2 src="/img/BackKoji.png" ref={el => ref.current[1]=el} data-value="6" alt="" />
                <Img3 src="/img/BackDanja.png" ref={el => ref.current[2]=el} data-value="4" alt="" />
                <Img4 src="/img/BackRoro.png" ref={el => ref.current[3]=el} data-value="-6" alt="" />
                <Img5 src="/img/BackBoori.png" ref={el => ref.current[4]=el} data-value="-9" alt="" />
                <Img6 src="/img/BackPoopoo.png" ref={el => ref.current[5]=el} data-value="-5" alt="" />
            </ImgBack>
            <SignBack>
                <MainForm>
                    <Form>
                        <H1>로그인</H1>
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

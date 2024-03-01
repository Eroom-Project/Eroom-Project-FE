import React, { useState } from 'react'
import api from '../../services/api'
import { useNavigate } from 'react-router-dom'
import SignBacks from '../../components/SignPage/SignBacks'
import VerificationEmail from '../../components/SignPage/VerificationEmail'
import {
    Message,
    Background,
    SignBack,
    MainForm,
    Logo,
    Form,
    H1,
    InputBox,
    InnerBox,
    AuthButton,
    H6,
    Input,
    Button,
} from '../../styles/SignPage/SignPage'
import { useMutation } from 'react-query'
import { postVerificationEmail } from '../../services/Query'


function SignUpPage() {

    const [input, setInput] = useState({
        email: '',
        password: '',
        nickname: '',
        checkPassword: ''
    })
    //
    const mutationEmailPost = useMutation(postVerificationEmail, {
        onSuccess: (data) => {
            if(data.message === "인증 메일을 전송하였습니다."){
                alert(data.message)
                verificationEmail ? setVerificationEmail(false) : setVerificationEmail(true)
            } else {
                alert(data.message)
            }
        },
        onError: () => {
            alert("이메일이 전송에 문제가 있습니다.")
        }
    })

    // 이메일 중복확인 이메일 인증하기로 바꾼다.
    // 인증 모달 열닫 상태값
    const [verificationEmail, setVerificationEmail] = useState(false)

    const handleVerificationEmail = () => {
        if(auth.email){
            setcheckCurrent({ ...checkCurrent, email: input.email })
            mutationEmailPost.mutate(input.email)
        } else {
            alert("이메일 양식이 틀렸습니다.")
        }
    }

    // 중복확인을 누를 당시의 값
    const [checkCurrent, setcheckCurrent] = useState({
        email: "",
        nickname: "",
    })

    // 중복확인 주소 확인하기
    // 이메일 중복확인
    // const emailCheck = async () => {
    //     try {
    //         const res = await api.get("/api/signup/email", {
    //             params: { email: input.email }
    //         })
    //         setcheckCurrent({ ...checkCurrent, email: input.email })
    //         console.log(res)
    //         if (res.data.message === "사용 가능한 email입니다.") {
    //             setCheck({ ...check, email: true })
    //             alert(res.data.message)
    //         } else if (res.data.message === "유효하지 않은 이메일 형식입니다.") {
    //             setCheck({ ...check, email: false })
    //             alert(res.data.message)
    //         } else {
    //             setCheck({ ...check, email: false })
    //             alert(res.data.message)
    //         }
    //     } catch (error) {
    //         console.log(`서버 에러: ${error}`)
    //     }
    // }

    // 닉네임 중복확인
    const nickNameCheck = async () => {
        try {
            const res = await api.get("/api/signup/nickname", {
                params: { nickname: input.nickname }
            })
            setcheckCurrent({ ...checkCurrent, nickname: input.nickname })
            console.log(res)
            if (res.data.message === "사용 가능한 닉네임입니다.") {
                setCheck({ ...check, nickname: true })
                alert(res.data.message)
            } else if (res.data.message === "닉네임은 3자 이상 10자 이하로 입력해 주세요.") {
                setCheck({ ...check, nickname: false })
                alert(res.data.message)
            } else {
                setCheck({ ...check, nickname: false })
                alert(res.data.message)
            }
        } catch (error) {
            console.log(`서버 에러: ${error}`)
        }
    }

    // 중복확인
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
                state = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/.test(value) && value === input.password
                break;
            default:
                state = false;
        }
        setAuth({
            ...auth,
            [name]: state
        });
    }

    // 양식 유효성 검사 통과 후 상태 값
    const [auth, setAuth] = useState({
        email: false,
        password: false,
        checkPassword: false,
        nickname: false,
    })

    // 유효성 검사 통과 했을 때 회원가입 가능
    const signUp = async () => {
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

    const handleOnKey = (e) => {
        if (e.key === 'Enter') {
            signUp()
        }
    }

    // massage state를 통해 state 출력 
    const message = (name) => {
        // console.log("checkCurrent",checkCurrent.email)
        // console.log("input",input.email)
        // console.log("auth[name]",auth.email)
        // console.log("check.email ",check.email )
        switch (name) {
            case "email":
                if (auth[name] && check.email && checkCurrent?.email === input?.email) {
                    return <Message focus={"block"} style={{ color: "#5EC75E" }}> 확인됐습니다. </Message>
                } else if (auth[name]) {
                    return <Message focus={"block"} style={{ color: "#74c3ff" }}> 인증확인이 필요합니다. </Message>
                } else {
                    return <Message focus={focusState[name] ? "block" : "block"} style={{ color: "#ff7575" }}> 이메일을 입력해주세요. </Message>
                }
            case "nickname":
                if (auth[name] && check.nickname && checkCurrent.nickname === input.nickname) {
                    return <Message focus={"block"} style={{ color: "#5EC75E" }}> 확인됐습니다. </Message>
                } else if (auth[name]) {
                    return <Message focus={"block"} style={{ color: "#74c3ff" }}> 중복확인이 필요합니다. </Message>
                } else {
                    return <Message focus={focusState[name] ? "block" : "block"} style={{ color: "#ff7575" }}> 닉네임을 입력해주세요. </Message>
                }
            case "password":
                return (
                    auth[name] ? <Message focus={"block"} style={{ color: "#5EC75E" }}> 확인됐습니다. </Message>
                        :
                        <Message focus={focusState[name] ? "block" : "block"} style={{ color: "#ff7575" }}> 비밀번호를 입력해주세요. </Message>)
            case "checkPassword":
                console.log(auth.checkPassword)
                if(auth[name] && input.password === input.checkPassword){
                    return <Message focus={"block"} style={{ color: "#5EC75E" }}> 비밀번호가 일치합니다. </Message>
                }else if(input.checkPassword.length>=1){
                    return <Message focus={focusState[name] ? "block" : "block"} style={{ color: "#ff7575" }}> 비밀번호가 일치하지 않습니다. </Message>
                }else{
                    return <Message focus={focusState[name] ? "block" : "block"} style={{ color: "#ff7575" }}> 비밀번호를 확인해주세요. </Message>
                }
            default:
                <Message focus={focusState[name] ? "block" : "block"} style={{ color: "#ff7575" }}> 정보를 입력해주세요. </Message>
        }
    }

    // 유효성검사 중복확인 전부 통과해야 회원가입 가능
    const button = () => {
        return (auth.email && auth.password && auth.checkPassword && auth.nickname && check.email && checkCurrent.email === input.email && check.nickname && checkCurrent.nickname === input.nickname && input.password === input.checkPassword ?
            <Button color={"#5EC75E"} type='button' onClick={signUp}>회원가입하기</Button>
            :
            <Button color={"#1C1C1C"} type='button'>정보를 입력해 주세요</Button>)
    }

    return (
        <>
            <Background>
                <SignBacks />
                <SignBack>
                    {verificationEmail === false ?
                        <MainForm >
                            <Logo src="/img/Logo.png" alt="logo" />
                            <H1>회원가입</H1>
                            <Form>
                                <InputBox>
                                    <H6>이메일: {message("email")}</H6>
                                    <InnerBox>
                                        <Input
                                            type="text"
                                            name="email"
                                            placeholder='이메일은 @와.을 포함한 도메인 형식입니다.'
                                            onFocus={() => { handlerFocus("email") }}
                                            onBlur={() => { handlerBlur("email") }}
                                            value={input.email}
                                            onChange={(e) => {
                                                handleInputChange(e)
                                            }}
                                            onKeyDown={handleOnKey}
                                            border={focusState.email ? "1px solid #1C1C1C" : "none"}
                                            bcolor={focusState.email ? "0 0 0 1000px transparent2 inset": "0 0 0 1000px #F2F2F2 inset"}
                                            shadow={focusState.email && "0 0 0 1000px #F2F2F2 inset"}
                                        />
                                        {
                                        auth.email && check.email && checkCurrent.email === input.email? 
                                        <AuthButton>
                                            인증<br />
                                            완료
                                        </AuthButton>
                                        :
                                        <AuthButton onClick={handleVerificationEmail}>
                                            인증<br />
                                            확인
                                        </AuthButton>
                                        }
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
                                            onKeyDown={handleOnKey}
                                            border={focusState.nickname ? "1px solid #1C1C1C" : "none"}
                                            bcolor={focusState.nickname ? "transparent" : "#F2F2F2"}
                                        />
                                        {
                                        auth.nickname && check.nickname && checkCurrent.nickname === input.nickname?
                                        <AuthButton>
                                            중복<br />
                                            완료
                                        </AuthButton>
                                        :
                                        <AuthButton onClick={nickNameCheck}>
                                            중복<br />
                                            확인
                                        </AuthButton>
                                        }
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
                                        onKeyDown={handleOnKey}
                                        border={focusState.password ? "1px solid #1C1C1C" : "none"}
                                        bcolor={focusState.password ? "transparent" : "#F2F2F2"}
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
                                        onKeyDown={handleOnKey}
                                        border={focusState.checkPassword ? "1px solid #1C1C1C" : "none"}
                                        bcolor={focusState.checkPassword ? "transparent" : "#F2F2F2"}
                                    />
                                </InputBox>
                                {button()}
                            </Form>
                        </MainForm>
                        :
                        <VerificationEmail setVerificationEmail={setVerificationEmail} email={checkCurrent.email} setCheck={setCheck} check={check}/>
                    }
                </SignBack>
            </Background>

        </>
    )
}

export default SignUpPage
import React, { useRef, useState } from 'react'
import api from '../../services/api'
import styled from 'styled-components'
import Isometric from '../../components/MyPage/Isometric'
import { getProfile } from '../../services/Query'
import { useQuery } from 'react-query'



function MyPage() {


    const profileData = useQuery('getProfile', getProfile)

    if(profileData.isLoading){
        console.log("로딩중입니다.")
    }
    if(profileData.isError){
        console.log("에러!")
    }

    const [input, setInput] = useState({
        email: '',
        password: '',
        nickname: '',
        checkPassword: ''
    })

    // 중복확인 주소 확인하기
    // 이메일 중복확인
    const emailCheck = async () => {
        try {
            const res = await api.get("/api/signup/email", {
                email: input.email
            })
            console.log(res)
            if (res.data === "사용 가능한 email입니다.") {
                setCheck({ ...check, email: true })
                alert(res.data)
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
            console.log(res)
            if (res.data === "사용 가능한 닉네임입니다.") {
                setCheck({ ...check, nickname: true })
                alert(res.data)
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

    // 유효성 검사 통과 했을 때 회원정보 수정 가능
    const changeData = async () => {
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

    //// 인풋 수정하기
    const emailRef = useRef()
    const nameRef = useRef()
    const passwordRef = useRef()
    const checkRef = useRef()

    const [readOnly, setReadOnly] = useState(true)

    const handleReadOnly = () => {
        if (readOnly) {
            emailRef.current.removeAttribute("readOnly")
            nameRef.current.removeAttribute("readOnly")
            passwordRef.current.removeAttribute("readOnly")
            checkRef.current.removeAttribute("readOnly")
            setReadOnly(false)
        } else {
            console.log(readOnly)
            changeData()
            setInput({
                ...input,
                email: '',
                password: '',
                nickname: '',
                checkPassword: ''
            })
            emailRef.current.setAttribute("readOnly", "readOnly")
            nameRef.current.setAttribute("readOnly", "readOnly")
            passwordRef.current.setAttribute("readOnly", "readOnly")
            checkRef.current.setAttribute("readOnly", "readOnly")
            setAuth({
                ...auth,
                email: false,
                password: false,
                checkPassword: false,
                nickname: false,
            })
            setReadOnly(true)
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
                    return <Message focus={focusState[name] && readOnly === false ? "block" : "none"} style={{ color: "red" }}> {name}을 입력해주세요. </Message>
                }
            case "nickname":
                if (auth[name] && check.nickname) {
                    return <Message focus={"block"} style={{ color: "#5EC75E" }}> 확인됐습니다. </Message>
                } else if (auth[name]) {
                    return <Message focus={"block"} style={{ color: "red" }}> 중복확인이 필요합니다. </Message>
                } else {
                    return <Message focus={focusState[name] && readOnly === false ? "block" : "none"} style={{ color: "red" }}> {name}을 입력해주세요. </Message>
                }
            case "password":
                return (
                    auth[name] ? <Message focus={"block"} style={{ color: "#5EC75E" }}> 확인됐습니다. </Message>
                        :
                        <Message focus={focusState[name] && readOnly === false ? "block" : "none"} style={{ color: "red" }}> {name}을 입력해주세요. </Message>)
            case "checkPassword":
                return (
                    auth[name] ? <Message focus={"block"} style={{ color: "#5EC75E" }}> 확인됐습니다. </Message>
                        :
                        <Message focus={focusState[name] && readOnly === false ? "block" : "none"} style={{ color: "red" }}> {name}을 입력해주세요. </Message>)
            default:
                <Message focus={focusState[name] && readOnly === false ? "block" : "none"} style={{ color: "red" }}> {name}을 입력해주세요. </Message>
        }
    }


    const button = () => {
        return (auth.email && auth.password && auth.checkPassword && auth.nickname && check.email && check.nickname && readOnly === false ?
            <Button color={"#5EC75E"} type='button' onClick={handleReadOnly}>수정완료</Button>
            :
            <Button color={"#636363"} bcolor={"#444444"} type='button' onClick={handleReadOnly}>수정하기</Button>)
    }
    return (
        <MainBox>
            <H1Box>
                <H1>마이 페이지</H1>
            </H1Box>
            <Hr/>
            <ProfileBox>
                <Profile>
                    <Img>

                    </Img>
                    <MainForm>
                        <Form>
                            <InputBox>
                                <H6>이메일: {message("email")}</H6>
                                <InnerBox>
                                    <Input
                                        type="text"
                                        name="email"
                                        // placeholder = {profileData.data.email}
                                        onFocus={() => { handlerFocus("email") }}
                                        onBlur={() => { handlerBlur("email") }}
                                        value={input.email}
                                        onChange={(e) => { handleInputChange(e) }}
                                        ref={emailRef}
                                        readOnly
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
                                        // placeholder= {profileData.data.nickname}
                                        onFocus={() => { handlerFocus("nickname") }}
                                        onBlur={() => { handlerBlur("nickname") }}
                                        value={input.nickname}
                                        onChange={(e) => { handleInputChange(e) }}
                                        ref={nameRef}
                                        readOnly
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
                                    // placeholder= {profileData.data.password}
                                    onFocus={() => { handlerFocus("password") }}
                                    onBlur={() => { handlerBlur("password") }}
                                    value={input.password}
                                    onChange={(e) => { handleInputChange(e) }}
                                    ref={passwordRef}
                                    readOnly
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
                                    ref={checkRef}
                                    readOnly
                                />
                            </InputBox>
                            {button()}
                        </Form>
                    </MainForm>
                </Profile>
                <Isometric />
            </ProfileBox>
            <ChellangeBox>
                <TitleBox>
                    <div>내가 참여중인 챌린지</div>
                    <div>참여 종료된 챌린지</div>
                </TitleBox>
                <ContentsBox>
                    <ContentsGrid>
                        <Contents></Contents>
                        <Contents></Contents>
                        <Contents></Contents>
                        <Contents></Contents>
                        <Contents></Contents>
                        <Contents></Contents>
                        <Contents></Contents>
                        <Contents></Contents>
                    </ContentsGrid>
                </ContentsBox>
            </ChellangeBox>
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
    width: 100%;
    max-width: 1200px;
    gap: 60px;
`
const Profile = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
`
const Img = styled.div`
    overflow: hidden;
    width: 150px;
    padding-bottom: 150px;
    border: 1px solid gray;
    border-radius: 100%;
`

const Message = styled.span`
    display: ${(props) => props.focus};
    font-size: 12px;
    margin-left: 5px;
    
`

const MainForm = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    background-color: #FFFF;
    border-radius: 10px;
    width: 100%;
`

const Form = styled.div`
    width: 100%;
    min-width: 440px;
`
const H1Box = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    max-width: 1200px;
    width: 100%;
`

const H1 = styled.div`
    font-size: 28px;
    font-weight: 600;
    margin-right:auto;
`

const InputBox = styled.div`
    width: 100%;
    height: 80px;
`

const InnerBox = styled.div`
    display: flex;
`
const AuthButton = styled.button`
    width: 60px;
    margin-left: 5px;
    border: none;
    border-radius: 6px;
    color: #636363;
    font-family: 'Noto Sans KR', sans-serif;
    font-weight: 400;
    cursor: pointer;
    &:hover{
        background-color: #636363;
        color: #FFFF;
    }
`

const Hr = styled.div`
    width: 100%;
    border: none;
    border-bottom: 1px solid #F2F2F2;
    margin: 30px 0px;
`

const H6 = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    font-size: 12px;
    margin: 20px 0px 10px 0px;
`

const Input = styled.input`
    width: 100%;
    height: 48px;
    border: none;
    border-radius: 10px;
    background-color: #F2F2F2;
    transition: background-color 5000s ease-in-out 0s;
    &:focus{outline: none;}
    box-sizing: border-box;
    
`
const Button = styled.button`
    font-family: 'Noto Sans KR', sans-serif;
    font-weight: 500;
    font-size: 14px;
    width: 100%;
    height: 48px;
    border: none;
    border-radius: 10px;
    background-color: ${(props) => props.color};
    color: white;
    margin-top: 30px;
    cursor: pointer;
    transition: 1s;
    &:hover {
        background-color: ${(props) => props.bcolor};
    }
`
///

const ChellangeBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 1200px;
    width: 100%;
    margin-top: 40px;
`
const TitleBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-right: auto;
    gap: 10px;
`

const ContentsBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    border: 1px solid gray;
`
const ContentsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    margin-bottom: 20px;
    margin: 0 auto;
    width: 100%;
    margin-top: 40px;
    gap: 10px 10px;
`
const Contents = styled.div`
    width: 100%;
    padding-bottom: 100%;
    border: 1px solid gray;
    justify-self: center;
`
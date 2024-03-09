import React, { useEffect, useRef, useState } from 'react'
import api from '../../services/api'
import styled from 'styled-components'
import { changeProfileDatas, checkPassword, getProfile } from '../../services/Query'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { MyPagePasswordPotal } from '../Common/Potal'
import ModalPassword from './ModalPassword'

function MyPage() {


    const profileData = useQuery('profileData', getProfile)

    if (profileData.data) {
        // console.log(profileData.data.memberInfo)
    }

    if (profileData.isLoading) {
        console.log("로딩중입니다.")
    }
    if (profileData.isError) {
        console.log("마이페이지 불러오기 에러!")
    }

    const queryClient = useQueryClient()
    const mutation = useMutation(changeProfileDatas, {
        onSuccess: () => {
            queryClient.invalidateQueries("profileData")
            setAuth({
                ...auth,
                image: false,
                nickname: false,
                password: false,
                checkPassword: false
            })
            alert("수정 완료됐습니다.")
            setopenChangeState({ ...openChangeState, nickname: false, password: false })
        }
    })
    // img state

    const handleImg = (e) => {
        const file = e.target.files[0]
        if (file) {
            let reader = new FileReader();
            reader.onload = function (e) {
                setThumbnail({
                    ...thumbnail,
                    image: e.target.result
                })
            }

            reader.readAsDataURL(e.target.files[0])
        } else {
            setThumbnail({
                ...thumbnail,
                image: ""
            })
        }
        if (file) {
            console.log(file)
            return setInput({ ...input, image: file })
        } else {
            return setInput({ ...input, image: "" })
        }
    }

    const [thumbnail, setThumbnail] = useState({
        image: ""
    })

    // input value
    const [input, setInput] = useState({
        email: '',
        password: '',
        nickname: '',
        checkPassword: '',
        image: '',
    })

    // image 유효성 검사
    useEffect(() => {
        // base64로 변환 시켰을시 유효성 검사
        // console.log(input.image.includes('data'))
        // if (input.image.includes('data')) {
        //     setAuth({
        //         ...auth,
        //         image: true
        //     })
        //     console.log(input.image)
        // }
        if (input.image.name) {
            console.log(input.image)
            console.log(input.image.name)
            if (input.image.name.includes('.png') || input.image.name.includes('.jpg') || input.image.name.includes('.jpeg')) {
                setAuth({
                    ...auth,
                    image: true
                })
            }
        }
    }, [input.image])

    const [checkCurrent, setcheckCurrent] = useState({
        email: "",
        nickname: "",
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
                state = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/.test(value) && value === input.password
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

    // 유효성 검사 통과 후 상태 값 (email: false 빠짐)
    const [auth, setAuth] = useState({
        image: false,
        nickname: false,
        password: false,
        checkPassword: false
    })

    // 이미지 바뀌면 유효성 검사 통과 후 이미지 서버로
    // 인피니티뜨는지 보기
    useEffect(() => {
        if (auth.image === true) {
            sendImg()
        }
    }, [auth.image])



    const sendImg = () => {
        mutation.mutate({
            name: "image",
            auth,
            input
        })
        console.log("뮤테이트로 이미지 보냈습니다.")
    }



    // 유효성 검사 통과 했을 때 회원정보 수정 가능(기존 데이터 묶어 보내기 로직)
    // const changeData = async () => {
    //     try {
    //         const newUser = {
    //             email: auth.email ? input.email : profileData.data.memberInfo.email,
    //             password: auth.password ? input.password : "",
    //             nickname: auth.nickname ? input.nickname : profileData.data.memberInfo.nickname,
    //         }

    //         const formData = new FormData();
    //         /// 이 로직은 객체가 문자열이 아니기 때문에 stringify 감싸주는 것 같다.
    //         formData.append('data', new Blob([JSON.stringify(newUser)], { type: "application/json" }))

    //         if (auth.image) {
    //             formData.append('profileImageUrl', input.image)
    //         } else {
    //             formData.append('profileImageUrl', profileData.data.memberInfo.profileImageUrl)
    //         }


    //         // 폼 데이터 보기
    //         Object.entries(newUser).forEach(item => formData.append(item[0], item[1]));
    //         let entries = formData.entries()
    //         for (const pair of entries) {
    //             console.log(pair[0] + ',' + pair[1]);
    //         }

    //         console.log(thumbnail)

    //         setThumbnail({
    //             ...thumbnail,
    //             image: ''
    //         })
    //         // 폼 데이터 형식 변환해서 보내기(URLSearchParams: 객체를 fordata형식으로 만들어줌)
    //         const response = await api.put("/api/member/profile", formData)
    //         console.log(response.data)
    //         alert("회원 정보 수정이 완료됐습니다.")

    //     } catch (error) {
    //         console.log(error)
    //         alert('회원 정보 수정에 문제가 있습니다.')
    //     }
    // }

    // 수정 펼침 state
    const [openChangeState, setopenChangeState] = useState({
        image: false,
        email: false,
        nickname: false,
        password: false,
    })



    const openChange = (name) => {
        switch (name) {
            case "email":
                openChangeState.email === false ?
                    setopenChangeState({ ...openChangeState, image: false, email: true, nickname: false, password: false }) :
                    setopenChangeState({ ...openChangeState, image: false, email: false, nickname: false, password: false })
                break
            case "nickname":
                openChangeState.nickname === false ?
                    setopenChangeState({ ...openChangeState, image: false, email: false, nickname: true, password: false }) :
                    setopenChangeState({ ...openChangeState, image: false, email: false, nickname: false, password: false })
                break
            case "password":
                setPasswordModal(true)
                break
            default:
                return ""
        }
    }

    // 비밀번호 인증 모달 state
    const [passwordModal, setPasswordModal] = useState(false)


    // massage state를 통해 state 출력 
    const message = (name) => {
        switch (name) {
            // case "email":
            //     if (auth[name] && check.email) {
            //         return <Message focus={"block"} style={{ color: "#5EC75E" }}> 확인됐습니다. </Message>
            //     } else if (auth[name]) {
            //         return <Message focus={"block"} style={{ color: "red" }}> 중복확인이 필요합니다. </Message>
            //     } else {
            //         return <Message focus={focusState[name] ? "block" : "none"} style={{ color: "red" }}> 이메일 양식을 입력해주세요. </Message>
            //     }
            case "nickname":
                if (auth[name] && check.nickname && checkCurrent.nickname === input.nickname) {
                    return <Message focus={"block"} style={{ color: "#5EC75E" }}> 확인됐습니다. </Message>
                } else if (auth[name]) {
                    return <Message focus={"block"} style={{ color: "red" }}> 중복확인이 필요합니다. </Message>
                } else {
                    return <Message focus={focusState[name] ? "block" : "none"} style={{ color: "red" }}> 닉네임 양식을 입력해주세요. </Message>
                }
            case "password":
                return (
                    auth[name] ? <Message focus={"block"} style={{ color: "#5EC75E" }}> 확인됐습니다. </Message>
                        :
                        <Message focus={focusState[name] ? "block" : "none"} style={{ color: "red" }}> 비밀번호는 영문, 숫자, 특문 조합 8~15글자입니다. </Message>)
            case "checkPassword":
                return (
                    auth[name] ? <Message focus={"block"} style={{ color: "#5EC75E" }}> 확인됐습니다. </Message>
                        :
                        <Message focus={focusState[name] ? "block" : "none"} style={{ color: "red" }}> 비밀번호가 일치하지 않습니다. </Message>)
            default:
                <Message focus={focusState[name] ? "block" : "none"} style={{ color: "red" }}> 입력해주세요. </Message>
        }
    }


    // 수정하기 버튼
    const buttonNickname = (name) => {
        if (auth.nickname) {
            if (check.email) {
                return <Button type='button' onClick={() => { mutation.mutate({ name, auth, input }) }}>수정완료</Button>
            } else if (check.nickname && checkCurrent.nickname === input.nickname) {
                return <Button type='button' onClick={() => { mutation.mutate({ name, auth, input }) }}>수정완료</Button>
            } else {
                return <Button type='button' onClick={() => { openChange(name) }}>수정하기</Button>
            }
        } else if (openChangeState?.nickname === true) {
            return <Button type='button' onClick={() => { openChange(name) }}>취소하기</Button>
        } else {
            return <Button type='button' onClick={() => { openChange(name) }}>수정하기</Button>
        }
    }

    const buttonPassword = (name) => {
        if (auth.password && auth.checkPassword) {
            return <Button2 type='button' onClick={() => { mutation.mutate({ name, auth, input }) }}>수정완료</Button2>
        } else if (openChangeState.password) {
            return <Button2 type='button' onClick={() => { openChange(name) }}>취소하기</Button2>
        } else {
            return <Button2 type='button' onClick={() => { openChange(name) }}>수정하기</Button2>
        }
    }

    // useEffect(()=> {
    //     if(openChangeState && openChangeState.password === true){
    //         console.log("open",openChangeState)
    //     }
    // }, [openChangeState.password])

    return (
        <>
            <Profile>
                <MainForm>
                    <ProfileImgBox>
                        <H6 style={{ margin: "0px" }}>프로필 이미지:</H6>
                        <ImgInput
                            id="file"
                            type='file'
                            name='image'
                            accept='image/jpg, image/jpeg, image/png'
                            onChange={(e) => handleImg(e)}
                        />
                        <ImgHeader src='/img/MyPage/profile.png' />
                        <ImgLabel for="file">
                            수정하기
                        </ImgLabel>
                    </ProfileImgBox>
                    <Form>
                        <ImgBox>
                            {
                                // profileData.data.memberInfo.profileImageUrl
                                profileData.data &&
                                <Img src={
                                    thumbnail.image.includes('data') ? thumbnail.image : profileData.data.memberInfo.profileImageUrl
                                } alt="미리보기" />
                            }
                        </ImgBox>
                        <Hr />

                        <BottomContents>
                            <InputBox>
                                <H6>이메일: {message("email")}</H6>
                                <InnerBox height={"48px"}>
                                    {
                                        <InnerBox2>
                                            {profileData.data && profileData.data.memberInfo.email}
                                        </InnerBox2>
                                    }
                                </InnerBox>
                            </InputBox>
                            <InputBox>
                                <H6>닉네임: {message("nickname")}</H6>
                                <InnerBox>
                                    {
                                        openChangeState.nickname === true ?

                                            <>
                                                <Input
                                                    type="text"
                                                    name="nickname"
                                                    placeholder="닉네임을 입력해주세요"
                                                    onFocus={() => { handlerFocus("nickname") }}
                                                    onBlur={() => { handlerBlur("nickname") }}
                                                    value={input.nickname}
                                                    onChange={(e) => { handleInputChange(e) }}
                                                />
                                                <Button onClick={nickNameCheck}>
                                                    중복 확인
                                                </Button>
                                            </>
                                            :
                                            <InnerBox2>
                                                {profileData.data?.memberInfo.nickname}
                                            </InnerBox2>
                                    }
                                    {buttonNickname("nickname")}
                                </InnerBox>
                            </InputBox>
                            {
                                openChangeState.password ? <H6>새 비밀번호: {message("password")}</H6> : <H6>비밀번호: {message("password")}</H6>
                            }
                            {
                                openChangeState.password === true ?
                                    <>
                                        <InputBox>
                                            <InnerBox>
                                                <Input
                                                    type="password"
                                                    name="password"
                                                    placeholder='비밀번호를 입력해주세요.'
                                                    onFocus={() => { handlerFocus("password") }}
                                                    onBlur={() => { handlerBlur("password") }}
                                                    value={input.password}
                                                    onChange={(e) => { handleInputChange(e) }}
                                                />
                                                {buttonPassword("password")}
                                            </InnerBox>
                                        </InputBox>
                                        <InputBox>
                                            <H6>새 비밀번호 확인: {message("checkPassword")}</H6>
                                            <InnerBox>
                                                <Input
                                                    type="password"
                                                    name="checkPassword"
                                                    placeholder='비밀번호를 확인해주세요.'
                                                    onFocus={() => { handlerFocus("checkPassword") }}
                                                    onBlur={() => { handlerBlur("checkPassword") }}
                                                    value={input.checkPassword}
                                                    onChange={(e) => { handleInputChange(e) }}
                                                />
                                            </InnerBox>
                                        </InputBox>
                                    </> :
                                    <InputBox>
                                        <InnerBox>
                                            <InnerBox2>
                                                비밀번호 수정은 오른쪽 버튼을 누르고 추가 인증을 진행해 주세요.
                                            </InnerBox2>
                                            {buttonPassword("password")}
                                        </InnerBox>
                                    </InputBox>
                            }
                        </BottomContents>
                        {
                            passwordModal &&
                            <MyPagePasswordPotal>
                                <ModalPassword setPasswordModal={setPasswordModal} openChangeState={openChangeState} setopenChangeState={setopenChangeState} />
                            </MyPagePasswordPotal>
                        }
                    </Form>
                </MainForm>
            </Profile>

        </>
    )
}

export default MyPage

const Profile = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 50%;
`
const ImgHeader = styled.img`
    position: absolute;
    top: -10px;
    right: 25%;
    width: 100px;
    z-index: 1;
`
const ImgLabel = styled.label`
    position: absolute;
    top: -13px;
    right: 26%;
    margin-left: auto;
    font-family: 'Noto Sans KR', sans-serif;
    font-weight: 500;
    font-size: 14px;
    padding: 30px 20px;
    border: none;
    border-radius: 50%;
    color: #1C1C1C;;
    cursor: pointer;
    z-index: 1;

`
const ImgInput = styled.input`
    display: none;
`

const ImgBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 180px;
    height: 180px;
    overflow: hidden;
    border: 1px solid #636363;
    border-radius: 100%;
    margin: 30px auto;
`

const Hr = styled.div`
    width: 100%;
    border: none;
    border-bottom: 1px solid #d6d6d6;
    margin: 40px 0px 50px 0px;
`
const BottomContents = styled.div`
    width: 100%;
    border: none;
    margin: 55px 0px 80px 0px;
    
    
`

const ImgBox2 = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;

    width: 250px;
    height: 250px;
    border: 1px solid #636363;
    border-radius: 100%;
    margin: 0px auto;
    animation: imgUp 1s forwards;
    @keyframes imgUp {
        0%{
            width: 150px;
            height: 150px;
        }
        to{
            width: 250px;
            height: 250px;
            transform: rotate( 360deg )
        }
    }
`
const Img = styled.img`
    width: 100%;
    object-fit: cover;
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
    justify-content: flex-start;
    border-radius: 10px;
    width: 100%;
    height: 100%;
`

const ProfileImgBox = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    width: 100%;
`

const Form = styled.div`
    width: 100%;
    min-width: 440px;
    height: 650px;
`
const InputBox = styled.div`
    width: 100%;
`
const InputBox1 = styled.div`
    width: 100%;
    height: 80px;
    animation: fadeIn 1s forwards;
    @keyframes fadeIn {
        0%{
            opacity: 0;
        }
        to{
            opacity: 1;
        }
    }
`

const InnerBox = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: ${(props) => props.height};
    gap:5px;
`
const InnerBox2 = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 48px;
    border-radius: 8px;
    gap:5px;
    border: 1px solid #d6d6d6;
    padding-left: 8px;
`
const AuthButton = styled.button`
    font-family: 'Noto Sans KR', sans-serif;
    font-weight: 500;
    font-size: 14px;
    width: 113px;
    height: 48px;
    border: none;
    border-radius: 10px;
    background-color: #FFFF;
    border: 1px solid #1C1C1C;
    color: #1C1C1C;;
    cursor: pointer;
`
const H6 = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    font-weight: 700;
    margin: 20px 0px 10px 0px;
`
const H62 = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    margin: 20px 0px 10px 0px;
    font-weight: 700;
    animation: onH6 1s forwards;

`
const H63 = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    font-size: 12px;
    margin: 20px 0px 10px 0px;
    animation: outH6 1s forwards;
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
    min-width: 113px;
    height: 48px;
    border: none;
    border-radius: 7px;
    background-color: #FFFF;
    border: 1px solid #1C1C1C;
    color: #1C1C1C;;
    margin-left: auto;
    cursor: pointer;

`
const Button2 = styled.button`
    font-family: 'Noto Sans KR', sans-serif;
    font-weight: 500;
    font-size: 14px;
    min-width: 113px;
    height: 48px;
    border: none;
    border-radius: 7px;
    background-color: #FFFF;
    border: 1px solid #1C1C1C;
    color: #1C1C1C;;
    margin-left: auto;
    cursor: pointer;

`
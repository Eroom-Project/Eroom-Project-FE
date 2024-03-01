import styled from 'styled-components'

export const Message = styled.span`
    display: ${(props) => props.focus};
    font-size: 12px;
    margin-left: 5px;
`

export const Background = styled.div`
    position: relative;
    margin-top: -100px;
    width: 100%;
    height: 100vh;
    overflow: hidden;
`
export const ImgBack = styled.div`
    position: relative;
    width: 100%;
    
`
export const Img = styled.img`
    position: absolute;
    top: ${(props) => props.top};
    left: ${(props) => props.left};
    width: ${(props) => props.width};
`

export const SignBack = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
    position: absolute;
    backdrop-filter: blur(5px);
`
export const MainForm = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    border: 1px solid #E9E9E9;
    background-color: #FFFF;
    padding: 34px 32px;
    border-radius: 10px;
`
export const Logo = styled.img`
    width: 200px;
    height: 38px;
    margin: 0px auto;
    margin-bottom: 30px;
`
export const Form = styled.div`
    width: 440px;
`
export const H1 = styled.div`
    margin-right: auto;
    margin-bottom: 4px;
    font-size: 20px;
    font-weight: 600;
`

export const InputBox = styled.div`
    width: 100%;
    height: 80px;
`

export const InnerBox = styled.div`
    display: flex;
    width: 100%;
`
export const AuthButton = styled.button`
    width: 60px;
    height: 48px;
    margin-left: 10px;
    border: none;
    box-sizing: border-box;
    border-radius: 6px;
    color: #1C1C1C;
    background-color: #FFFF;
    border: 1px solid #1C1C1C;
    font-family: 'Noto Sans KR', sans-serif;
    cursor: pointer;
    &:hover{
        background-color: #1C1C1C;
        color: #FFFF;
    }
`

export const Hr = styled.div`
    width: 100%;
    border: none;
    border-bottom: 1px solid #E5E5E5;
    margin: 30px 0px;
`

export const H6 = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    font-size: 12px;
    margin: 20px 0px 10px 0px;
`

export const Input = styled.input`
    width: 100%;
    height: 48px;
    border: ${(props) => props.border};
    box-sizing: border-box;
    border-radius: 10px;
    background-color: #F2F2F2;
    &:focus,
    &:autofill{
    box-shadow: 0 0 0 1000px #F2F2F2 inset; // 배경색 변경
    }
    &:focus{
        box-shadow: 0 0 0 1000px #FFFF inset;
        outline: none;
    }
`
export const Button = styled.button`
    font-family: 'Noto Sans KR', sans-serif;
    font-weight: 500;
    width: 100%;
    height: 48px;
    border: none;
    border-radius: 10px;
    background-color: ${(props) => props.color};
    color: white;
    margin-top: 30px;
    cursor: pointer;
    transition: 1s;
`

export const KakaoSignForm = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
`
export const SignUp = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    
    color: #636363;
`

export const Bold = styled.span`
    margin-left: 8px;
    font-weight: 700;
    color: #1C1C1C;
`

/// 이메일 인증
export const EmailForm = styled.div`
    display: flex;
    flex-direction: column;
    width: 440px;
`
export const EmailTitle = styled.div`
    display: flex;
    width: 100%;
    margin-bottom: 40px;
`
export const EmailImg = styled.img`
    width: 24px;
    height: 24px;
    cursor: pointer;
`
export const EmailButtonBox = styled.div`
    display: flex;
    flex-direction: row;
    margin: 50px 0px 10px auto;
`
export const EmailButton = styled.button`
    width: 113px;
    height: 48px;
    margin-left: 10px;
    border: none;
    box-sizing: border-box;
    border-radius: 6px;
    color: #1C1C1C;
    background-color: #FFFF;
    border: 1px solid #1C1C1C;
    font-family: 'Noto Sans KR', sans-serif;
    cursor: pointer;
    &:hover{
        background-color: #1C1C1C;
        color: #FFFF;
    }
`
export const EmailContents = styled.div`
    font-size: 12px;
    width: 100%;
    margin-bottom: 20px;
`

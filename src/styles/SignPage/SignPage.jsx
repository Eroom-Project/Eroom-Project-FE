import styled from 'styled-components'

export const Message = styled.span`
    display: ${(props) => props.focus};
    font-size: 12px;
    margin-left: 5px;
    
`
export const Background = styled.div`
    position: relative;
    width: 100%;
    height: 100vh;
    overflow: hidden;
`
export const ImgBack = styled.div`
    position: relative;
    width: 100%;
    
`
export const Img1 = styled.img`
    position: absolute;
    top: 100px;
    left: 10%;
    width: 15% ;
`
export const Img2 = styled.img`
    position: absolute;
    top: 120px;
    left: 61%;
    width: 13%;
`
export const Img3 = styled.img`
    position: absolute;
    top: 460px;
    left: 25%;
    width: 18%;
`
export const Img4 = styled.img`
    position: absolute;
    top: 400px;
    left: 83%;
    width: 20%;
`
export const Img5 = styled.img`
    position: absolute;
    top: 630px;
    left: -3%;
    width: 20%;
`
export const Img6 = styled.img`
    position: absolute;
    top: 800px;
    left: 51%;
    width: 18%;
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

export const Form = styled.div`
    width: 440px;
`
export const H1 = styled.div`
    margin-right: auto;
    margin-bottom: 20px;
    font-size: 28px;
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
    margin-left: 5px;
    border: none;
    border-radius: 6px;
    color: #1C1C1C;
    font-family: 'Noto Sans KR', sans-serif;
    font-weight: 400;
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
    border: none;
    box-sizing: border-box;
    border-radius: 10px;
    background-color: #F2F2F2;
    transition: background-color 5000s ease-in-out 0s;
    &:focus{outline: none;}
`
export const Button = styled.button`
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
    font-size: 14px;
    font-weight: 700;
    color: #1C1C1C;
`
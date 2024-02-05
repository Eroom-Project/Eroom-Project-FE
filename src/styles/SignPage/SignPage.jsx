import styled from 'styled-components'

export const Message = styled.span`
    display: ${(props) => props.focus};
    font-size: 12px;
    margin-left: 5px;
    
`

export const Back = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #F2F2F2;
    width: 100%;
    height: 100vh;
`
export const MainForm = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    background-color: #FFFF;
    width: 440px;
    padding: 34px 32px;
    border-radius: 10px;
`

export const Form = styled.form`
    width: 100%;
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
`
export const AuthButton = styled.button`
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

export const Hr = styled.div`
    width: 100%;
    border: none;
    border-bottom: 1px solid #F2F2F2;
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
    color: black;
`
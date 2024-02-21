import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    body {
        font-family: 'Noto Sans KR', sans-serif;
        font-size: 12px;
        &::-webkit-scrollbar {
        width: 18px;
        height: 18px;
        }
        &::-webkit-scrollbar-thumb {
            border-radius: 10px;
            background-color: #fdd25b;
            background-clip: padding-box;
            border: 3px solid transparent;
        }
        &::-webkit-scrollbar-track {
            background-color: #F2F2F2;
        }
    }

    a{
        text-decoration: none;
        color: black;
    }

    div{
        box-sizing: border-box;
    }
`

export default GlobalStyle
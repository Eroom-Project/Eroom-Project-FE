import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    body {
        font-family: 'Noto Sans KR', sans-serif;
        font-size: 14px;
        color: #1C1C1C;
        &::-webkit-scrollbar {
        width: 14px;
        }
        font-family: Arial, Helvetica, sans-serif;
        &::-webkit-scrollbar-thumb {
            border-radius: 10px;
            background-color: #dfdddd;
            background-clip: padding-box;
            /* border: 3px solid transparent; */
        }
        &::-webkit-scrollbar-track {
            background-color: #F2F2F2;
        }
    }

    a{
        text-decoration: none;
        color: #1C1C1C;
    }

    div{
        box-sizing: border-box;
    }
`

export default GlobalStyle
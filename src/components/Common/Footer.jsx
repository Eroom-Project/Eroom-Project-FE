import React, { useState } from 'react'
import styled from 'styled-components'

function Footer() {
    const [terms, setTerms] = useState({
        "a": false,
        "b": false,
        "c": false,
    })
    const handleTerms = (terms) => {
        switch (terms) {
            case "a":
                return <P>
                    <B>이용목적:</B> ‘ 이룸 ’은 개인정보를 다음의 목적 이외의 용도로는 이용하지 않으며 이용 목적이 변경될 경우에는 동의를 받아 처리하겠습니다.</P>
            case "b":
                return <P>
                    <B>개인 정보 수집목적:</B> 서비스 피드백에 관련한 상품 제공 및 서비스 내 개인 프로필<br />
                    <B>보유기간:</B> 1개월</P>
            case "c":
                return <P>
                    <B>개인 정보 파기:</B> ‘ 이룸 ’은 원칙적으로 개인정보의 보유 기간이 경과했거나 처리 목적이 달성 된 경우에는 지체 없이 해당 개인정보를 파기합니다. <br />
                    <B>개인 정보 파기 요청:</B> 개인정보의 주체는 제공된 정보 등에 대하여 정보의 관리 책임자를 통하여 열람, 정정, 삭제, 파기를 요구할 수 있습니다. <br />
                    <B>개인 정보 파기 법률:</B> 법률에 따라 보존하여야 하는 경우에는 그러하지 않습니다.
                </P>
            default:
                return <P>‘ 이룸 ’은 개인정보를 다음의 목적 이외의 용도로는 이용하지 않으며 이용 목적이 변경될 경우에는 동의를 받아 처리하겠습니다.</P>
        }
    }

    console.log(terms["a"])
    return (
        <Main>
            {window.location.href !== "https://www.eroom-challenge.com/room" && window.location.href !== "http://localhost:3000/room" &&
                <Contents>
                    <Img src="/img/NavBar/Logo.png" alt="logo" />
                    <Category><Span><a href="https://www.notion.so/E-ROOM-3a40455d6acb476580d3bcecf2992a9a">ABOUT</a></Span> | <Span><a href="https://github.com/Eroom-Project">GITHUB</a></Span> | <Span><a href="https://www.notion.so/E-ROOM-3a40455d6acb476580d3bcecf2992a9a">BROCHURE</a></Span> | <Span><a href="https://www.notion.so/f9cbfd07d6f243539399cd2440c16025">GUIDE</a></Span></Category>

                    <Hr />
                    <Category2>
                        <Span2>개인정보처리방침 </Span2><Span onClick={() => { setTerms({ ...terms, a: true, b: false, c: false }) }} weight={terms.a && "700"}>이용목적</Span> | <Span onClick={() => { setTerms({ ...terms, a: false, b: true, c: false }) }} weight={terms.b && "700"}>개인정보 수집</Span> | <Span onClick={() => { setTerms({ ...terms, a: false, b: false, c: true }) }} weight={terms.c && "700"}>개인정보 파기</Span>
                    </Category2>
                    <Bottom>
                        <BottomTop>
                            {terms["a"] === false && terms["b"] === false && terms["c"] === false && handleTerms("a")}
                            {terms["a"] && handleTerms("a")}
                            {terms["b"] && handleTerms("b")}
                            {terms["c"] && handleTerms("c")}
                        </BottomTop>
                        <div>
                            <></>개발팀: 이신지 최우식 류은채 민경현 인재현 &nbsp;|&nbsp; 
                            이메일: eroom.challenge@gmail.com &nbsp;|&nbsp; 
                            ⓒ Eroom-Challenge. All Rights Reserved.
                        </div>
                    </Bottom>

                </Contents>

            }
        </Main>
    )
}

export default Footer

const Main = styled.div`
    padding-top: 100px;
`
const Contents = styled.div`
    display: flex;
    flex-direction: column;
    line-height: 21px;
    height: 300px;
    padding: 50px 20px;
    background-color: #F2F2F2;
    gap: 10px;
`
const Img = styled.img`
    width: 110px;
    margin-bottom: 30px;
`

const Category = styled.div`
    display: flex;
    gap: 10px;
    font-weight: 700;
`
const Category2 = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    
`
const Hr = styled.div`
    width: 100%;
    border: none;
    border-bottom: 1px solid #c2c2c2;
`
const Span = styled.span`
    font-weight: ${(props) => props.weight};
    cursor: pointer;
`
const Span2 = styled.span`
font-weight: 700;
`
const P = styled.p`
`
const B = styled.span`
    font-weight: 700;
`

const Bottom = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 12px;
`
const BottomTop = styled.div`
    height: 70px;
`
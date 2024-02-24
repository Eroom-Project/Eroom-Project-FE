import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function HomePage() {
    const navigate = useNavigate();

    const handleLook = () => {
        navigate('/main');
    };

    return (
        <MainForm>
            {/* 첫 번째 섹션: 홈페이지 소개 */}
            <Box1>
                <ContentsBox>
                    <MainImgBox>
                        <MainImgBoxImg src='img/HomePage/1RoroBack.png' rotate={"10deg"} top={"30%"} left={"-10%"} />
                        <MainImgBoxImg src='img/HomePage/1RoroBack.png' rotate={"30deg"} top={"15%"} left={"7%"} />
                        <div>
                            <MainImg src="img/HomePage/1Roro.png" alt="mainimg" top={"50%"} left={"50%"} width={"25vh"} />
                            <MainImg src="img/HomePage/1RoroBody.png" alt="mainimg" top={"78%"} left={"70%"} width={"5vh"} />
                            <MainImg src="img/HomePage/1RoroHand.png" alt="mainimg" top={"62%"} left={"80%"} width={"8vh"} />
                        </div>
                        <MainImgBoxImg src='img/HomePage/1RoroBack.png' rotate={"10deg"} top={"7%"} left={"50%"} />
                        <MainImgBoxImg src='img/HomePage/1RoroBack.png' rotate={"30deg"} top={"30%"} left={"65%"} />
                        <MainImgBoxImg src='img/HomePage/1RoroBack.png' rotate={"10deg"} top={"50%"} left={"13%"} />
                        <MainImgBoxImg src='img/HomePage/1RoroBack.png' rotate={"10deg"} top={"50%"} left={"50%"} />
                    </MainImgBox>
                    <Contents>
                        <Box1Title1>
                            끝없는 공부,<br /> 혼자가 아니라 같이 이룸
                        </Box1Title1>
                        <Box1Title2>
                            시험 공부부터 자기계발까지 당신의 꿈이 담긴 방,<br />이룸에서 꿈을 향해 '<span style={{ fontWeight: '700' }}>함께</span>' 도전하세요
                        </Box1Title2>
                        <Box1Button onClick={handleLook}>이룸 둘러보기</Box1Button>
                    </Contents>
                </ContentsBox>
            </Box1>

            {/* 두 번째 섹션: 챌린지 소개 */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '50px', marginBottom: '50px' }}>
                <img src='img/home2.png' />
                <div>
                    <div style={{ fontSize: "40px", fontWeight: '700', marginBottom: '20px' }}>지속성을 위한 챌린지</div>
                    <div style={{
                        fontSize: '24px',
                        fontWeight: '400',
                        color: '#2C2C2C',
                        lineHeight: '1.2'
                    }}>
                        도전과제를 설정하고 이어나가세요.<br />목표가 같은 이들과 <span style={{ fontWeight: '700' }}>함께라면 완주</span>가 가능해요
                    </div>
                </div>
            </div>

            {/* 세 번째 섹션: 대화를 통한 학습 */}
            <Box3>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    height: '500px',
                    backgroundImage: 'url(img/home3.png)',
                    fontSize: '24px',
                    color: '#2C2C2C',
                    lineHeight: '1.2',
                    gap: '30px'
                }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ fontSize: "40px", fontWeight: '700', marginBottom: '20px' }}>
                            학습을 위한 대화
                        </div>
                        <div style={{ fontWeight: '400' }}>
                            내가 알고 있는 것을 설명하고 다른 사람의<br />눈으로 같은 것을 다르게 바라볼 때<br />학습의 세계는 <span style={{ fontWeight: '700' }}>더욱 넓어져요.</span>
                        </div>
                    </div>
                    <img src='img/home3-1.png' />
                    <img src='img/home3-2.png' />
                </div>
            </Box3>

            {/* 네 번째 섹션: 커뮤니티 소개 */}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '500px',
                fontSize: '24px',
                color: '#2C2C2C',
                lineHeight: '1.2',
                textAlign: 'center',
                gap: '20px',
            }}>
                <div>각자의 방에서 시작해서 서로의 방을 방문하며<br /> 더 넓은 곳으로 나아가는</div>
                <div><img src='img/home4.png' /></div>
                <div style={{ fontSize: "40px", fontWeight: '700', marginBottom: '20px', lineHeight: '1.5' }}>
                    스터디 챌린지 커뮤니티 '이룸'
                </div>
            </div>

            {/* 다섯 번째 섹션: 챌린지 이미지 */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ display: 'flex', gap: '20px', marginBottom: '100px' }}>
                    <img src='img/challenge1.png' />
                    <img src='img/challenge2.png' />
                    <img src='img/challenge3.png' />
                </div>
            </div>

            {/* 여섯 번째 섹션: 아이콘 및 시작 버튼 */}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '50px',
                marginBottom: '100px'
            }}>
                <div>
                    <JumpImg src='img/icon (1).png' />
                    <img src='img/icon (2).png' />
                    <img src='img/icon (3).png' />
                    <img src='img/icon (4).png' />
                    <img src='img/icon (5).png' />
                    <img src='img/icon (6).png' />
                </div>
                <div style={{ fontSize: "40px", fontWeight: '700', marginBottom: '20px', lineHeight: '1.5' }}>
                    당신의 꿈을 이뤄보시겠어요?
                </div>
                <button onClick={handleLook} style={{
                    width: '228px',
                    height: '64px',
                    margin: '0 auto',
                    backgroundColor: '#67CB71',
                    borderRadius: '8px',
                    border: '#67CB71',
                    fontSize: '24px',
                    color: 'white',
                    fontWeight: '700',
                    cursor: 'pointer'
                }}>이룸 시작하기</button>
            </div>
        </MainForm>
    );
}

export default HomePage;

const MainForm = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
const Box1 = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    background-color: #F0FDE9;
    margin-bottom: 70px;
`

const ContentsBox = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    text-align: center;
    width: 100%;
    height: 100%;
`

const MainImgBox = styled.div`
    position: relative;
    width: 50vh;
    height: 50vh;
    `
const MainImg = styled.img`
    position: absolute;
    top: ${(props) => props.top};
    left: ${(props) => props.left};
    transform: translate(-${(props) => props.top},-${(props) => props.left});
    width: ${(props) => props.width};
    `
const MainImgBoxImg = styled.img`
    position: absolute;
    top:${(props) => props.top};
    left:${(props) => props.left};
    transform: translate(-${(props) => props.top},-${(props) => props.left});
    width: 20vh;
    transform: rotate(${(props) => props.rotate});
`

const Contents = styled.div`
    position: absolute;
    top: 50%;
`
const Box1Title1 = styled.p`
    font-size: 40px;
    font-weight: 700;
    line-height: 3rem;
    margin-bottom: 20px;
`
const Box1Title2 = styled.p`
    font-size: 24px;
    font-weight: 400;
    line-height: 2.2rem;
    margin-bottom: 20px;
    color: #2C2C2C;
`

const Box1Button = styled.button`
    font-family: 'Noto Sans KR', sans-serif; 
    width: 228px;
    height: 64px;
    background-color: #67CB71;
    border: none;
    border-radius: 10px;
    font-size: 24px;
    font-weight: 600;
    color: white;
    margin-top: 20px;
    cursor: pointer;
`

const Box3 = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 976px;
    margin-bottom: 70px;
`

/////
const JumpImg = styled.div`
    position: absolute;
    animation: jump  1s infinite;

    @keyframes jump {
        0%{
            transform: translate(0%);
        }
        to{
            transform: translate(150%);
        }

    }
`
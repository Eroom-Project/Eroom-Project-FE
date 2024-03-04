import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function HomePage() {
    const navigate = useNavigate();

    const handleLook = () => {
        navigate('/main');
    };

    const [scroll, setScroll] = useState(0)
    // useCallback 이나 useMemo로 최적화 하기
    const handleScroll = () => {
        // console.log(window.scrollY)
        setScroll(window.scrollY)
    };

    useEffect(() => {
        const scrollHandler = () => {
            requestAnimationFrame(handleScroll);
        };
        window.addEventListener('scroll', scrollHandler, { passive: true });
        return () => {
            window.removeEventListener('scroll', scrollHandler);
        };
    }, []);

    const handleEggBreak = () => {
        if (scroll < 620) {
            return <Box2Egg src='/img/HomePage/2DanjaEgg.png' alt='eggimg' left={"30%"} top={"500px"} width={"90px"} />
        } else if (scroll >= 620 && scroll <= 690) {
            return <Box2EggBreak src='/img/HomePage/2DanjaEggBreaks.png' alt='eggimg' left={"30%"} top={"160px"} width={"100px"} />
        }
    }

    return (
        <MainForm>
            {/* 첫 번째 섹션: 홈페이지 소개 */}

            <Box1>
                {scroll >= 0 && scroll <= 1200 &&
                    <>
                        <Box1Animation />
                        <Box1CloudBox>
                            <Box1CloudBoxInner>
                                <Box1Cloud src='/img/HomePage/1RoroCloud1.png' alt='cloud' top={"50%"} left={"20%"} width={"200px"} />
                                <Box1Cloud src='/img/HomePage/1RoroCloud2.png' alt='cloud' top={"60%"} left={"70%"} width={"200px"} />
                            </Box1CloudBoxInner>
                            <Box1CloudBoxInner2>
                                <Box1Cloud src='/img/HomePage/1RoroCloud1.png' alt='cloud' top={"50%"} left={"20%"} width={"200px"} />
                                <Box1Cloud src='/img/HomePage/1RoroCloud2.png' alt='cloud' top={"60%"} left={"70%"} width={"200px"} />
                            </Box1CloudBoxInner2>
                        </Box1CloudBox>


                        <Box1BackHill3 src='/img/HomePage/1RoroTopHill.png' alt='backgroundimg' />
                        <Box1Tree2 src='/img/HomePage/1RoroTree5.png' alt='tree' top={"120px"} right={"2%"} width={"130px"} />
                        <Box1Tree2 src='/img/HomePage/1RoroTree6.png' alt='tree' top={"133px"} right={"15%"} width={"40px"} />
                        <Box1Tree2 src='/img/HomePage/1RoroTree7.png' alt='tree' top={"163px"} right={"23%"} width={"40px"} />
                        <Box1Tree2 src='/img/HomePage/1RoroTree8.png' alt='tree' top={"206px"} right={"30%"} width={"35px"} />

                        <Box1BackHill2 src='/img/HomePage/1RoroBottomHill.png' alt='backgroundimg' />
                        <Box1Tree src='/img/HomePage/1RoroTree1.png' alt='tree' top={"110px"} left={"0%"} width={"120px"} />
                        <Box1Tree src='/img/HomePage/1RoroTree2.png' alt='tree' top={"150px"} left={"13%"} width={"90px"} />
                        <Box1Tree src='/img/HomePage/1RoroTree3.png' alt='tree' top={"185px"} left={"24%"} width={"110px"} />
                        <Box1Tree src='/img/HomePage/1RoroTree4.png' alt='tree' top={"200px"} left={"33%"} width={"100px"} />

                        <Box1BackHill src='/img/HomePage/1RoroBackground.png' alt='backgroundimg' />
                        <ContentsBox>
                            <MainImgBox>
                                <RoroBack src='img/HomePage/1RoroBack.png' rotate={0} top={"100%"} left={"-45%"} />
                                <RoroBack src='img/HomePage/1RoroBack.png' rotate={-20} top={"90%"} left={"-30%"} />
                                <RoroBack src='img/HomePage/1RoroBack.png' rotate={0} top={"100%"} left={"-15%"} />
                                <RoroBack src='img/HomePage/1RoroBack.png' rotate={-30} top={"87%"} left={"0%"} />
                                <RoroBack src='img/HomePage/1RoroBack.png' rotate={+10} top={"105%"} left={"5%"} />
                                <div>
                                    <RoroBack src='img/HomePage/1RoroBack.png' rotate={+5} top={"82%"} left={"25%"} />
                                    <RoroBack src='img/HomePage/1RoroBack.png' rotate={+0} top={"80%"} left={"38%"} />
                                    <RoroBack src='img/HomePage/1RoroBack.png' rotate={-10} top={"82%"} left={"52%"} />
                                    <RoroBack src='img/HomePage/1RoroBack.png' rotate={+3} top={"84%"} left={"70%"} />
                                    <RoroBack src='img/HomePage/1RoroBack.png' rotate={-10} top={"93%"} left={"22%"} />
                                    <RoroBack src='img/HomePage/1RoroBack.png' rotate={+5} top={"88%"} left={"34%"} />
                                    <RoroBack src='img/HomePage/1RoroBack.png' rotate={+0} top={"91%"} left={"44%"} />
                                    <RoroBack src='img/HomePage/1RoroBack.png' rotate={+3} top={"91%"} left={"59%"} />
                                    <RoroBack src='img/HomePage/1RoroBack.png' rotate={-20} top={"95%"} left={"44%"} />
                                </div>
                                <RoroHidden>
                                    <Roro>
                                        <MainImg src="img/HomePage/1RoroBody.png" alt="mainimg" top={"78%"} left={"70%"} width={"5vh"} />
                                        <RoroBack2 src='img/HomePage/1RoroBack0.png' rotate={"-5"} top={"66%"} left={"77%"} />
                                        <MainImg2 src="img/HomePage/1RoroHand.png" alt="mainimg" top={"55%"} left={"70%"} width={"8vh"} />
                                        <MainImg src="img/HomePage/1Roro.png" alt="mainimg" top={"50%"} left={"50%"} width={"260px"} />
                                    </Roro>
                                </RoroHidden>
                                <RoroBack src='img/HomePage/1RoroBack.png' rotate={"5"} top={"95%"} left={"90%"} />
                                <RoroBack src='img/HomePage/1RoroBack.png' rotate={"0"} top={"90%"} left={"107%"} />
                                <RoroBack src='img/HomePage/1RoroBack.png' rotate={"-20"} top={"93%"} left={"127%"} />
                                <RoroBack src='img/HomePage/1RoroBack.png' rotate={"-10"} top={"101%"} left={"89%"} />
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
                    </>}
            </Box1>

            {/* 두 번째 섹션: 챌린지 소개 */}
            <Box2>
                {scroll >= 0 && scroll <= 1600 && <>
                    <Box2Animation />
                    {handleEggBreak()}
                    <Box2ImgFrame src='/img/HomePage/2DanjaFrame.png' alt='frame' />
                    <Box2Eggs src='/img/HomePage/2DanjaEggs.png' alt='eggimg' left={"21%"} top={"120px"} width={"200px"} />
                    <Box2PanEgg>
                        {scroll >= 690 && <Box2Danja src='/img/HomePage/2Danja.png' alt='eggimg' left={"10%"} top={"80px"} width={"260px"} />}
                        <Box2Pan src='/img/HomePage/2DanjaPan.png' alt='eggimg' left={"35%"} top={"500px"} width={"100px"} />
                    </Box2PanEgg>
                    <Box2Contents top={"200px"} left={"55%"}>
                        <Box1Title1>지속성을 위한 챌린지</Box1Title1>
                        <Box1Title3 >
                            도전과제를 설정하고 이어나가세요.<br />목표가 같은 이들과 <span style={{ fontWeight: '700' }}>함께라면 완주</span>가 가능해요
                        </Box1Title3>
                    </Box2Contents>
                </>}
            </Box2>
            {/* 세 번째 섹션: 대화를 통한 학습 */}
            <Box3>
                {scroll >=500 && scroll <=2200 &&<>
                        <Box3Animation />
                        <Box3Back>
                            <Box3MonguBack1 src="/img/HomePage/3MonguBack.png" />
                            <Box3MonguBack2 src="/img/HomePage/3MonguBack.png" />
                        </Box3Back>
                        <Box3MaxForm>
                            <Box3Contents style={{ display: 'flex', flexDirection: 'column' }}>
                                <Box1Title1>
                                    학습을 위한 대화 <img src="/img/HomePage/3MonguDot.png" alt="dot" />
                                </Box1Title1>
                                <Box1Title3>
                                    내가 알고 있는 것을 설명하고 다른 사람의<br />눈으로 같은 것을 다르게 바라볼 때<br />학습의 세계는 <span style={{ fontWeight: '700' }}>더욱 넓어져요.</span>
                                </Box1Title3>
                            </Box3Contents>
                            <Box3MonguBox>
                                <Mongu1 src='/img/HomePage/3Mongu1.png' alt='mongu' width={"320px"} />
                                <Mongu2 src='/img/HomePage/3Mongu2.png' alt='mongu' width={"320px"} />
                            </Box3MonguBox>
                        </Box3MaxForm>
                    </>}
            </Box3>

            {/* 네 번째 섹션: 커뮤니티 소개 */}
            <Box4>
                <Box1Title4>각자의 방에서 시작해서 서로의 방을 방문하며<br /> 더 넓은 곳으로 나아가는</Box1Title4>
                <div><img src='/img/HomePage/LogoFlag.png' alt='logoflag'/></div>
                <Box1Title5>
                    스터디 챌린지 커뮤니티<span style={{ fontWeight: "700", fontSize: "45px", marginTop: "12px" }}>'이룸'</span>
                </Box1Title5>
            </Box4>

            {/* 다섯 번째 섹션: 챌린지 이미지 */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ display: 'flex', gap: '20px', marginBottom: '100px' }}>
                    <img src='/img/HomePage/4Example1.png' alt='example'/>
                    <img src='/img/HomePage/4Example3.png' alt='example'/>
                    <img src='/img/HomePage/4Example2.png' alt='example'/>
                </div>
            </div>

            {/* 여섯 번째 섹션: 아이콘 및 시작 버튼 */}
            <Box6Animation />
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '50px',
                marginBottom: '100px'
            }}>
                <JumpImgBox>
                    <JumpImg1 src='/img/HomePage/icon1.png' alt='icon'/>
                    <JumpImg2 src='/img/HomePage/icon2.png' alt='icon'/>
                    <JumpImg3 src='/img/HomePage/icon3.png' alt='icon'/>
                    <JumpImg4 src='/img/HomePage/icon4.png' alt='icon'/>
                    <JumpImg5 src='/img/HomePage/icon5.png' alt='icon'/>
                    <JumpImg6 src='/img/HomePage/icon6.png' alt='icon'/>
                </JumpImgBox>
                <div style={{ fontSize: "48px", fontWeight: '700', marginBottom: '10px', lineHeight: '1.5' }}>
                    당신의 꿈을 이뤄보시겠어요?
                </div>
                <button onClick={handleLook} style={{
                    width: '228px',
                    height: '64px',
                    margin: '0 auto',
                    backgroundColor: 'black',
                    borderRadius: '8px',
                    border: 'none',
                    fontSize: '24px',
                    color: 'white',
                    fontWeight: '700',
                    cursor: 'pointer'
                }}>이룸 시작하기</button>
            </div>
        </MainForm>
    );
}

const MainForm = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
const Box1 = styled.div`
    overflow: hidden;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    background-color: #A1EDFF;
`
const Box1CloudBox = styled.div`
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    height: 130px;
`

const Box1CloudBoxInner = styled.div`
    position: absolute;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 100px;
    animation: backgroundslide 50s linear infinite;
`
const Box1CloudBoxInner2 = styled.div`
    position: absolute;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 100px;
    animation: backgroundslide2 50s linear infinite;
`


const Box1Cloud = styled.img`
    position: absolute;
    top: ${(props) => props.top};
    left: ${(props) => props.left};
    right: ${(props) => props.right};
    width: ${(props) => props.width};;
`
const Box1Tree = styled.img`
    position: absolute;
    top: ${(props) => props.top};
    left: ${(props) => props.left};
    right: ${(props) => props.right};
    width: ${(props) => props.width};;
    z-index: 1;
    animation: backgroundup1 1s ease-in-out forwards;
    transform: translateZ(-1px);
`
const Box1Tree2 = styled.img`
    position: absolute;
    top: ${(props) => props.top};
    left: ${(props) => props.left};
    right: ${(props) => props.right};
    width: ${(props) => props.width};;
    animation: backgroundup1 2s ease-in-out forwards;
    transform: translateZ(2px);
`

const Box1BackHill = styled.img`
    position: absolute;
    top: 334px;
    width: 100%;
    height: 100%;
    z-index: 1;
`
const Box1BackHill2 = styled.img`
    position: absolute;
    top: 243px;
    z-index: 1;
    animation: backgroundup1 1s ease-in-out forwards;
    transform: translateZ(-1px);
`
const Box1BackHill3 = styled.img`
    position: absolute;
    top: 243px;
    animation: backgroundup1 2s ease-in-out forwards;
    transform: translateZ(2px);
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
    margin-top: -100px;
`

const MainImgBox = styled.div`
    position: relative;
    width: 50vh;
    height: 50vh;
`

const RoroHidden = styled.div`
    width: 100%;
    height: 100%;
    overflow: hidden;
`
const Roro = styled.div`
    position: relative;
    margin-top: 50%;
    width: 100%;
    height: 100%;
    animation: roroup 2s forwards;
    z-index: 1;
    perspective: 1px;
`

const MainImg = styled.img`
    position: absolute;
    top: ${(props) => props.top};
    left: ${(props) => props.left};
    transform: translate(-${(props) => props.top},-${(props) => props.left});
    width: ${(props) => props.width};
    `
const MainImg2 = styled.img`
    position: absolute;
    top: ${(props) => props.top};
    left: ${(props) => props.left};
    width: ${(props) => props.width};
    animation: roroshake 3s infinite;
`

const RoroBack = styled.img`
    position: absolute;
    top:${(props) => props.top};
    left:${(props) => props.left};
    width: 60px;
    z-index: 2;
    transform: rotate(${(props) => props.rotate}deg);
    animation: rorobackspin 2s ease-in-out forwards;
`
const RoroBack2 = styled.img`
    position: absolute;
    top:${(props) => props.top};
    left:${(props) => props.left};
    width: 90px;
    animation: roroupdown 3s 1s infinite;
`

const Contents = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    top:${(props) => props.top};
    left:${(props) => props.left};
    top: 57%;
    z-index: 2;
`
const Box1Title1 = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    text-align: center;
    font-size: 36px;
    font-weight: 700;
    line-height: 48px;
    gap: 10px;
`
const Box1Title2 = styled.div`
    font-size: 21px;
    line-height: 31px;
    margin-top: 15px;
`
const Box1Title3 = styled.div`
    color: #626262;
    font-size: 21px;
    line-height: 31px;
    margin-top: 15px;
`
const Box1Button = styled.button`
    font-family: 'Noto Sans KR', sans-serif;
    width: 210px;
    height: 61px;
    font-size: 21px;
    font-weight:700;
    color: #67CB71;
    border: none;
    border-radius: 10px;
    background-color: #FFFF;
    margin-top: 30px;
    cursor: pointer;
`


///// 2
const Box2 = styled.div`
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 550px;
    background-color: #FBF5E6;
    z-index: -1;
`
const Box2Egg = styled.img`
    position: fixed;
    top: ${(props) => props.top};
    left: ${(props) => props.left};
    width: ${(props) => props.width};
    z-index: 1;
`
const Box2EggBreak = styled.img`
    position: absolute;
    top: ${(props) => props.top};
    left: ${(props) => props.left};
    width: ${(props) => props.width};
    z-index: 1;
`
const Box2Eggs = styled.img`
    position: absolute;
    top: ${(props) => props.top};
    left: ${(props) => props.left};
    width: ${(props) => props.width};
    height: ${(props) => props.height};
`
const Box2ImgFrame = styled.img`
    width: 100%;
    height: 100%;
    z-index: 2;
`
const Box2PanEgg = styled.div`
    position: absolute;
    left: 30%;
    width: 390px;
    animation: pan 2s infinite;
`
const Box2Pan = styled.img`
    width: 390px;
`
const Box2Danja = styled.img`
    position: absolute;
    top: ${(props) => props.top};
    left: ${(props) => props.left};
    width: ${(props) => props.width};
    z-index: 1;
`

const Box2Contents = styled.div`
    position: absolute;
    top:${(props) => props.top};
    left:${(props) => props.left};
    z-index: 2;
    /* animation: textslide 1.5s forwards; */
`

////////////// 3
const Box3 = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 540px;
    background-color: #EAF6FF;
    z-index: -1;
`
const Box3Back = styled.div`
    position: absolute;
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    height: 100%;
    overflow: hidden;
`
const Box3MonguBack1 = styled.img`
    position: absolute;
    bottom: -1px;
    width: 100%;
    z-index: -1;
    animation: backgroundslide 50s linear infinite;
`
const Box3MonguBack2 = styled.img`
    position: absolute;
    bottom: -1px;
    width: 100%;
    z-index: -1;
    animation: backgroundslide2 50s linear infinite;
`
const Box3MaxForm = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    width: 100%;
    height: 100%;
`
const Box3Contents = styled.div`
    top:${(props) => props.top};
    left:${(props) => props.left};
`
const Box3MonguBox = styled.div`
    display: flex;
    top:${(props) => props.top};
    left:${(props) => props.left};
    gap: 100px;
    perspective: 500px;
`
const Mongu1 = styled.img`
    top:${(props) => props.top};
    left:${(props) => props.left};
    width: ${(props) => props.width};
    animation: monguupdown 5s infinite;
`
const Mongu2 = styled.img`
    top:${(props) => props.top};
    left:${(props) => props.left};
    width: ${(props) => props.width};
    animation: monguupdown2 5s 1s infinite;
`
///// 4
const Box4 = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 406px;
    margin: 45px 0px 90px 0px;
    gap: 32px;
`

const Box1Title4 = styled.div`
    color: #626262;
    text-align: center;
    font-size: 21px;
    line-height: 31px;
    margin-top: 15px;
`

const Box1Title5 = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 36px;
    font-weight: 700;
    line-height: 48px;
    gap: 10px;
`

/// 6
const JumpImgBox = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 60px;
    gap: 12px;
`
const JumpImg1 = styled.img`
    /* animation: loding 1s  infinite; */
`
const JumpImg2 = styled.img`
    /* animation: loding 1s 1s  infinite; */
`
const JumpImg3 = styled.img`
    /* animation: loding 1s 2s  infinite; */
`
const JumpImg4 = styled.img`
    /* animation: loding 1s 3s  infinite; */
`
const JumpImg5 = styled.img`
    /* animation: loding 1s 4s  infinite; */
`
const JumpImg6 = styled.img`
    /* animation: loding 1s 5s  infinite; */
`

export default HomePage;

const Box1Animation = styled.div`
    @keyframes roroup {
        0%{
            transform: translate(0%);
        }
        100%{
            transform: translate(0%, -50%);
        }
    }
    @keyframes roroshake {
        0%{
            transform: rotate(0deg);
            transform-origin: left bottom;
        }
        50%{
            transform: rotate(30deg);
            transform-origin: left bottom;
        }
        100%{
            transform: rotate(0deg);
            transform-origin: left bottom;
        }
    }
    @keyframes roroupdown {
        0%{
            transform: translate(0%) rotate(0deg);
        }
        50%{
            transform: translate(0%, 20%) rotate(20deg);
        }
        0%{
            transform: translate(0%) rotate(0deg);
        }
    }
    
    @keyframes rorobackspin {
        0%{
            transform: rotate(360deg);
        }
    }

    //// 배경
    @keyframes backgroundup1 {
        0%{
            transform: translate(0%, 200%) ;
        }
        100%{
            transform: translate(0%, 0%) ;
        }
    }

    @keyframes backgroundslide {
        0%{
            transform: translateX(0%);
        }
        100%{
            transform: translateX(-100%);
        }
    }

    @keyframes backgroundslide2 {
        0%{
            transform: translateX(100%);
        }
        100%{
            transform: translateX(0%);
        }
    }
`

const Box2Animation = styled.div`
        @keyframes textslide {
        0%{
            transform: translateX(100%);
            opacity: 0;
        }
        100%{
            transform: translateX(0%);
            opacity: 1;
        }
    }

    @keyframes pan {
        0%{
            transform: translate(0%) rotate(0deg);
            transform-origin: right top;

        }
        50%{
            transform: translate(0%, 30%) rotate(20deg);
            transform-origin: right top;
        }
        0%{
            transform: translate(0%) rotate(0deg);
            transform-origin: right top;
        }
    }
`

const Box3Animation = styled.div`
    @keyframes monguupdown {
        0%{
            transform: translate(0%) rotateY(0deg);
        }
        50%{
            transform: translate(0%, 30%) rotateY(60deg);
        }
        0%{
            transform: translate(0%) rotateY(0deg);
        }
    }
    @keyframes monguupdown2 {
        0%{
            transform: translate(0%) rotateY(0deg);
        }
        50%{
            transform: translate(0%, 20%) rotateY(-40deg);
        }
        0%{
            transform: translate(0%) rotateY(0deg);
        }
    }
`
const Box6Animation = styled.div`
    @keyframes loding {
        0%{
            transform: translate(0%);
        }
        50%{
            transform: translate(0%, -100%);
        }
        0%{
            transform: translate(0%);
        }
    }

`
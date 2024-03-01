import React from 'react'
import { useQuery } from 'react-query'
import styled from 'styled-components'
import { getProfile } from '../../services/Query'
import MyBrickLeft from '../../pages/MyPage/MyBrickLeft'
import MyBrickRight from '../../pages/MyPage/MyBrickRight'


function Isometric() {
    const chellangeData = useQuery('chellangeData', getProfile)
    if (chellangeData.isLoading) {
        console.log("로딩중입니다.")
    }
    if (chellangeData.isError) {
        console.log("에러!")
    }

    const brick = ["#fffa9f89", "#FFD07589", "#CDFFB589", "#9AD4FF89", "#FFC3C389", "#C7B9FF89"]
    const countBrick = () => {
        if (chellangeData.data) {
            let count = String(chellangeData.data.memberInfo.bricksCount)
            return(
                brick.map((value, index) => {
                    return (
                        <Brick bcolor={value} key={chellangeData.data.memberInfo.memberId}>
                            <Count border={"#FFC24C"} color={"#FFC24C"}>{count[index]?count[index]:0}</Count>
                            <Img src={`/img/brick (${index+1}).png`} />
                        </Brick>
                    )
                })
            )
        }
    }

    return (
        <MainBox>
            <H6>E-ROOM</H6>
            <MyRoom>
                <div style={{
                    display: 'flex',
                    backgroundImage: 'url(img/roomBack.png)',
                    width: '100%',
                    height: '100%',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover'
                }}>
                    <MyBrickLeft />
                    <MyBrickRight />
                </div>
            </MyRoom>
            <H6>BRICK</H6>
            <BrickBox>
                {countBrick()}
            </BrickBox>
        </MainBox>
    )
}

export default Isometric

const MainBox = styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
`
const MyRoom = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 550px;
    min-width: 440px;
    height: 355px;
    border-radius: 8px;
    border: 1px solid #9D9D9D;
    margin-bottom: 25px;
    background-color: #F2F2F2;
    overflow: hidden;
`

const BrickBox = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    max-width: 550px;
    min-width: 440px;
    height: 150px;
    border: 1px solid #9D9D9D;
    border-radius: 8px;
    padding: 20px;
    overflow-y: hidden;
    white-space: nowrap;
    gap: 15px;

    &::-webkit-scrollbar {
        height: 10px;
    }
    &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background-color: #dfdddd;
        background-clip: padding-box;
        border: 2px solid transparent;
    }
    &::-webkit-scrollbar-track {
        border-radius: 20px;
        background-color: rgba(255,255,255,0);
    }
`
const Brick = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100px;
    padding: 10px;
    background-color: ${(props) => props.bcolor};
    border-radius: 8px;
`
const Count = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    top: -10px;
    left:-10px;
    font-size: 12px;
    font-weight: 700;
    border: 2px solid ${(props) => props.border};
    color: ${(props) => props.color};
    border-radius: 100%;
    background-color: white;
    width: 30px;
    height: 30px;
`
const Img = styled.img`
    object-fit: cover;
    height: 100%;
`

const H6 = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    margin: 0px 0px 10px 0px;
    font-weight: 700;
`
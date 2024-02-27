import React, { useEffect, useRef } from 'react'
import {
    ImgBack,
    Img,
} from '../../styles/SignPage/SignPage'

function SignBacks() {
    const ref = useRef([null, null, null, null, null, null])

    useEffect(() => {
        const parallax = (e) => {

            ref.current.forEach(function (value) {
                if (value) {
                    let moving = value?.getAttribute("data-value")
                    let x = (e.clientX * moving) / 250
                    let y = (e.clientY * moving) / 250
                    value.style.transform = "translateX(" + x + "px) translateY(" + y + "px)"
                }
            })
        }
        document.addEventListener("mousemove", parallax);
        return () => {
            document.removeEventListener("mousemove", parallax);
        }

    }, [])

    return (
        <ImgBack>
            <Img src="/img/SignPage/BackMongu.png" ref={el => ref.current[0] = el} data-value="-2" top={"100px"} left={"10%"} width={"15%"} alt="signback" />
            <Img src="/img/SignPage/BackKoji.png" ref={el => ref.current[1] = el} data-value="6" top={"120px"} left={"61%"} width={"13%"} alt="signback" />
            <Img src="/img/SignPage/BackDanja.png" ref={el => ref.current[2] = el} data-value="4" top={"460px"} left={"25%"} width={"18%"} alt="signback" />
            <Img src="/img/SignPage/BackRoro.png" ref={el => ref.current[3] = el} data-value="-6" top={"400px"} left={"83%"} width={"20%"} alt="signback" />
            <Img src="/img/SignPage/BackBoori.png" ref={el => ref.current[4] = el} data-value="-9" top={"630px"} left={"-3%"} width={"20%"} alt="signback" />
            <Img src="/img/SignPage/BackPoopoo.png" ref={el => ref.current[5] = el} data-value="-5" top={"800px"} left={"51%"} width={"18%"} alt="signback" />
        </ImgBack>
    )
}

export default SignBacks
import React, { useEffect } from 'react'
import { Outlet, useNavigate, useOutletContext } from 'react-router-dom'

function LayoutAuth() {
    const nanigate = useNavigate(null)
    const {accessState, setAccessState, getWithExpire} = useOutletContext()

    // 로그인 페이지로 이동이 여기서만 필요해서 위에서 못 내림
    const isCookie = async () => {
        const localaccess = await window.localStorage.getItem("localRefresh");
        if (localaccess) {
            setAccessState(true)
        } else {
            setAccessState(false)
            console.log("authPage => localRefresh not found");
            alert("로그인이 필요한 페이지입니다.")
            nanigate("/signin")
        }
    }
    useEffect(()=> {
        isCookie()
        getWithExpire("localRefresh")
    }, [])
    return (
        <div>
        <Outlet/>
        </div>
    )
}

export default LayoutAuth
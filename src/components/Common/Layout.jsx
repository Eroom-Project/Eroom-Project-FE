import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import NavBar from '../../components/Common/NavBar'
import api from '../../services/api'

function Layout() {
    const navigate = useNavigate()
    const [accessState, setAccessState] = useState(false)
    const isCookie = async () => {
        const localaccess = await window.localStorage.getItem("localRefresh");
        if (localaccess) {
            setAccessState(true)
        } else {
            
            setAccessState(false)
            console.log("Layout => localRefresh cookie not found");
        }
    }

    const removeCookies = async () => {
        console.log(accessState)
        if (accessState === true) {
            const resToken = await api.post(`/api/token`, {})
            const res = await api.post('/api/logout', {})
            alert("로그아웃 됐습니다.")
            console.log(resToken)
            console.log(res)
            if (res.status === 200) {
                window.localStorage.removeItem("localRefresh")
                setAccessState(false)
                navigate("/signin")
            }
        }
    }

    // 로컬 만료시간 설정 SignIn에서 쓰는중
    let now = new Date()
    const setWithExpire = (key, value, exp) => {
        const item = { value: value, expires: now.getTime() + exp * 60 * 1000 }
        localStorage.setItem(key,JSON.stringify(item))
    }

    // 나머지는 Layout => LayoutFooter => LayoutAuth로 내려줍니다.
    // oulet이 사이에 또 있으면 useOuletContext로 바로 못 내리고 한번 거치는 것 같아요
    const getWithExpire = (key) => {
        const itemStr = localStorage.getItem(key)
        if(!itemStr){
            console.log("localRefresh 없습니다.")
            return null
        }
        const item =JSON.parse(itemStr)
        if(now.getTime() > item.expires){
            localStorage.removeItem(key)
            setAccessState(false)
            alert("세션이 만료됐습니다. 다시 로그인해주세요")
            navigate("/signin")
            console.log("시간이 만료되어 localRefresh 삭제합니다.")
            return null
        }
        return item.value
    }

    useEffect(() => {
        isCookie()
        getWithExpire("localRefresh")
        console.log("레이아웃",accessState)
    }, [])
    return (
        <>
            <NavBar accessState={accessState} setAccessState={setAccessState} removeCookies={removeCookies} />
            <Outlet context={{ accessState, setAccessState, setWithExpire, getWithExpire}}/>
        </>
    )
}

export default Layout
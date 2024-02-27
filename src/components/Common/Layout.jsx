import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import NavBar from '../../components/Common/NavBar'
import Footer from '../../components/Common/Footer'
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
            console.log("localaccess cookie not found");
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

    // 로컬 만료시간 설정
    let now = new Date()
    const setWithExpire = (key, value, exp) => {
        const item = { value: value, expires: now.getTime() + exp * 60 * 1000 }
        localStorage.setItem(key,JSON.stringify(item))
    }

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
        getWithExpire("localRefresh")
        isCookie()
        console.log(accessState)
    }, [])
    return (
        <>
            <NavBar accessState={accessState} setAccessState={setAccessState} removeCookies={removeCookies} />
            <Outlet context={{ accessState, setAccessState, setWithExpire}} />
            {/* <Footer/> */}
        </>
    )
}

export default Layout
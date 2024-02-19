import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../../components/Common/NavBar'
import Footer from '../../components/Common/Footer'

function Layout() {
    return (
        <>
            <NavBar />
            
            <Outlet />
            
            
            {/* <Footer/> */}
            </>
    )
}

export default Layout
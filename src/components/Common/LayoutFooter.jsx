import React from 'react'
import Footer from './Footer'
import { Outlet, useOutletContext } from 'react-router-dom'

function LayoutFooter() {
    const {accessState, setAccessState, getWithExpire} = useOutletContext()
    return (
        <div>
            <Outlet context={{accessState, setAccessState, getWithExpire}}/>
            <Footer/>
        </div>
    )
}

export default LayoutFooter
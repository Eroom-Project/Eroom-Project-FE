import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignInPage from '../pages/SignInPage/SignInPage'
import SignUpPage from '../pages/SignUpPage/SignUpPage'
import HomePage from '../pages/HomePage/HomePage'
import MainPage from '../pages/MainPage/MainPage'
import DetailPage from '../pages/DetailPage/DetailPage'
import CreatePage from '../pages/CreatePage/CreatePage'
import RoomPage from '../pages/RoomPage/RoomPage'
import AuthPage from '../pages/AuthPage/AuthPage'

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="signin" element={<SignInPage/>}/>
                <Route path="signup" element={<SignUpPage/>}/>

                <Route path="/" element={<HomePage/>}/>
                <Route path="main" element={<MainPage/>}/>
                <Route path="main/:id" element={<DetailPage/>}/>
                <Route path="create" element={<CreatePage/>}/>
                <Route path="room" element={<RoomPage/>}/>
                <Route path="auth" element={<AuthPage/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Router
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignInPage from '../pages/SignInPage/SignInPage'
import SignUpPage from '../pages/SignUpPage/SignUpPage'
import MyPage from '../pages/MyPage/MyPage'
import HomePage from '../pages/HomePage/HomePage'
import MainPage from '../pages/MainPage/MainPage'
import MainDetailPage from '../pages/MainDetailPage/MainDetailPage'
import CreatePage from '../pages/CreatePage/CreatePage'
import RoomPage from '../pages/RoomPage/RoomPage'
import AuthPage from '../pages/AuthPage/AuthPage'
import AuthResultPage from '../pages/AuthResultPage/AuthResultPage'

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="signin" element={<SignInPage/>}/>
                <Route path="signup" element={<SignUpPage/>}/>
                <Route path="/mypage" element={<MyPage/>}/>

                <Route path="/" element={<HomePage/>}/>
                <Route path="main" element={<MainPage/>}/>
                <Route path="main/:id" element={<MainDetailPage/>}/>
                <Route path="create" element={<CreatePage/>}/>
                <Route path="room" element={<RoomPage/>}/>
                <Route path="auth" element={<AuthPage/>}/>
                <Route path="auth/:id" element={<AuthResultPage/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Router
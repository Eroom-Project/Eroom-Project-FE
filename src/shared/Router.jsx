import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignInPage from '../pages/SignInPage/SignInPage'
import SignUpPage from '../pages/SignUpPage/SignUpPage'
import Redirection from '../pages/SignInPage/Redirection'
import MyPage from '../pages/MyPage/MyPage'
import HomePage from '../pages/HomePage/HomePage'
import MainPage from '../pages/MainPage/MainPage'
import MainDetailPage from '../pages/MainDetailPage/MainDetailPage'
import CreatePage from '../pages/CreatePage/CreatePage'
import RoomPage from '../pages/RoomPage/RoomPage'
import Layout from '../components/Common/Layout'



function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route path="/signin" element={<SignInPage />} />
                    <Route path="/signup" element={<SignUpPage />} />
                    <Route path="/auth/callback/kakao" element={<Redirection />} />
                    <Route path="/" element={<HomePage />} />
                    <Route path="/mypage" element={<MyPage />} />
                    <Route path="/main" element={<MainPage />} />
                    <Route path="/main" element={<MainDetailPage />} />
                    <Route path="/create" element={<CreatePage />} />
                    <Route path="/room" element={<RoomPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router
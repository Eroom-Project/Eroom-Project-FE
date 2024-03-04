import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
// 스크롤 상단
import ScrollTop from '../components/Common/ScrollTop'
// 레이아웃
import Layout from '../components/Common/Layout'
import LayoutAuth from '../components/Common/LayoutAuth'
import LayoutFooter from '../components/Common/LayoutFooter'
// 페이지
import SignInPage from '../pages/SignInPage/SignInPage'
import SignUpPage from '../pages/SignUpPage/SignUpPage'
import Redirection from '../pages/SignInPage/Redirection'
import MyPage from '../pages/MyPage/MyPage'
import HomePage from '../pages/HomePage/HomePage'
import MainPage from '../pages/MainPage/MainPage'
import MainDetailPage from '../pages/MainDetailPage/MainDetailPage'
import CreatePage from '../pages/CreatePage/CreatePage'
import RoomPage from '../pages/RoomPage/RoomPage'
import EditPage from '../pages/EditPage/EditPage'




function Router() {
    return (
        <BrowserRouter>
            <ScrollTop />
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/signin" element={<SignInPage />} />
                    <Route path="/signup" element={<SignUpPage />} />
                    <Route path="/auth/callback/kakao" element={<Redirection />} />
                    <Route element={<LayoutFooter />}>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/main" element={<MainPage />} />
                        <Route path="/main" element={<MainDetailPage />} />
                        <Route element={<LayoutAuth />}>
                            <Route path="/mypage" element={<MyPage />} />
                            <Route path="/edit" element={<EditPage />} />
                            <Route path="/create" element={<CreatePage />} />
                            <Route path="/room" element={<RoomPage />} />
                        </Route>
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router
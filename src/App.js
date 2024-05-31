import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from './pages/MainPage';
import CounselorPage from './pages/CounselorPage';
import CounseleePage from './pages/CounseleePage';
import ViewListPage from './pages/ViewListPage';
import ViewDetailPage from './pages/ViewDetailPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<MainPage/>}/>
        <Route path="/chat-counselor" element={<CounselorPage/>}/>
        <Route path="/chat-counselee" element={<CounseleePage/>}/>
        <Route path="/chats" element={<ViewListPage/>}/>
        <Route path="/chats/:id" element={<ViewDetailPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
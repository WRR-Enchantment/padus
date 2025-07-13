import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RecruitmentPage from './RecruitmentPage';
import Home from './Home';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rekrutmen" element={<RecruitmentPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import Dashboard from './pages/Dashboard';
import SomePage from './pages/SomePage';
import AnotherPage from './pages/AnotherPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/somepage" element={<SomePage />} />
        <Route path="/anotherpage" element={<AnotherPage />} />
      </Routes>
    </Router>
  );
};

export default App;

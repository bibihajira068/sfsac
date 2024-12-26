

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './components/Login';
import Register from './components/Register';
// import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import LoginGoogle from './components/GoogleLogin';
import Logout from './components/Logout';
import OTPVerification from './components/Otp';
import { UserProvider } from './context/AuthContext';

const App = () => {
  return (
    <Router>
      <UserProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp" element={<OTPVerification />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login-google" element={<LoginGoogle />} />
        <Route path="/logout" element={<Logout />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      </UserProvider>
    </Router>
  );
};

export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './Pages/Home';
import Login from './components/Login';
import Register from './components/Register';
import NotFound from './Pages/NotFound';
import LoginGoogle from './components/GoogleLogin';
import Logout from './components/Logout';
import OTPVerification from './components/Otp';
import { UserProvider } from './context/AuthContext';
import FileList from './Pages/FileList';
import FileShare from './Pages/FileShare';
import FileUpload from './Pages/FilesUpload';
import ProtectedRoute from './components/ProtectedRoutes';

const App = () => {
  return (
    <Router>
      <UserProvider>
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-otp" element={<OTPVerification />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login-google" element={<LoginGoogle />} />
          <Route path="/logout" element={<Logout />} />

          {/* Protected Routes */}
          <Route
            path="/filelist"
            element={
              <ProtectedRoute>
                <FileList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/fileshare"
            element={
              <ProtectedRoute>
                <FileShare />
              </ProtectedRoute>
            }
          />
          <Route
            path="/fileupload"
            element={
              <ProtectedRoute>
                <FileUpload />
              </ProtectedRoute>
            }
          />

          {/* Catch-All Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </UserProvider>
    </Router>
  );
};

export default App;



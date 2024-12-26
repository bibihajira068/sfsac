// import { useContext, useEffect, useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// // import './App.css'
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import Login from './components/login';

// function App() {
  

//   return (
//     <>
//       <Router>
//       <Navbar />
//       <Routes>
//         {/* <Route path="/" element={<Home />} /> */}
//         {/* <Route path="/" element={<Dashboard />} /> */}
//         <Route path="/login" element={<Login />} />
//       </Routes>
//     </Router>
//     </>
//   )
// }

// export default App
// import FacebookLogin from 'react-facebook-login';
// import GoogleLogin from 'react-google-login';
// import fbLogin from './services/fbLogin';
import googleLogin from './services/googleLogin';
import './App.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useGoogleLogin } from '@react-oauth/google';
import { GoogleLogin } from "@react-oauth/google";
import axios from 'axios';

function App() {
  const login = useGoogleLogin({
    onSuccess: tokenResponse => console.log(tokenResponse),
  });
  const responseFacebook = async (response) => {
    let fbResponse = await fbLogin(response.accessToken);
    console.log(fbResponse);
    console.log(response);
  };

  const responseGoogle = async (response) => {
    let googleResponse = await googleLogin(response.accessToken);
    console.log(googleResponse);
    console.log(response);
  };

  const handleLoginSuccess = (credentialResponse) => {
    console.log("Google Login Success:", credentialResponse);

    // Send the token to your backend
    axios
      .post("http://127.0.0.1:8000/api/user/login/", {
        id_token: credentialResponse.credential,
      })
      .then((response) => {
        console.log("Backend response:", response.data);

        // Store JWT tokens or handle user data
        localStorage.setItem("access", response.data.tokens.access);
        localStorage.setItem("refresh", response.data.tokens.refresh);
        alert("Login successful!");
      })
      .catch((error) => {
        console.error("Error during login:", error);
        alert("Login failed. Please try again.");
      });
  };
  const handleLoginFailure = () => {
    alert("Google Login Failed!");
  };
  return (
    <div className="App">
      <h1>Login with Facebook & Google</h1>
      <button onClick={() => login()}>Sign in with Google 🚀</button>
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={handleLoginFailure}
      />

      {/* <FacebookLogin
        appId="YOUR_FACEBOOK_APP_ID"
        fields="name,email,picture"
        callback={responseFacebook}
      /> */}
      <br />
      <br />

      {/* <GoogleLogin
        clientId="YOUR_GOOGLE_CLIENT_ID"
        buttonText="LOGIN WITH GOOGLE"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
      /> */}
    </div>
  );
}

export default App;
// import googleLogin from ' ../services/googleLogin';
// import './App.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useGoogleLogin } from '@react-oauth/google';
import { GoogleLogin } from "@react-oauth/google";
import axios from 'axios';
import { Box, Typography, Button } from '@mui/material';


function LoginGoogle() {
  const login = useGoogleLogin({
    onSuccess: tokenResponse => console.log(tokenResponse),
  });
  const responseFacebook = async (response) => {
    let fbResponse = await fbLogin(response.accessToken);
    console.log(fbResponse);
    console.log(response);
  };

  // const responseGoogle = async (response) => {
  //   let googleResponse = await googleLogin(response.accessToken);
  //   console.log(googleResponse);
  //   console.log(response);
  // };

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
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        gap: 2,
        textAlign: 'center',
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Login with Facebook & Google
      </Typography>
      
      <Button
        variant="contained"
        color="primary"
        onClick={login}
        sx={{ mb: 2 }}
      >
        Sign in with Google 🚀
      </Button>

      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={handleLoginFailure}
      />
    </Box>
  );
};

export default LoginGoogle;

  // return (
//     <div className="App">
//       <h1>Login with Facebook & Google</h1>
//       <button onClick={() => login()}>Sign in with Google 🚀</button>
//       <GoogleLogin
//         onSuccess={handleLoginSuccess}
//         onError={handleLoginFailure}
//       />

    
//     </div>
//   );
// }

// export default App;

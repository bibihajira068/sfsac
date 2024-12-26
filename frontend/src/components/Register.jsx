/* eslint-disable */
// import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Container, Typography, Stack, Button, IconButton, InputAdornment, TextField, Checkbox, Box, Alert, CircularProgress, Modal, FormControlLabel  } from '@mui/material';
// components
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
// @mui
// sections

// hooks
import API from '../utils/api';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: { 
    display: 'flex',
  },
}));
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 480,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '80vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
//   const [learnerLogin, {isLoading}] = useLoginUserMutation()
  const [serverError, setServerError] = useState({});
  const [otpError, setOtpError] = useState({});
  const navigate = useNavigate();
//   const dispatch = useDispatch();
 
  const [openOTP, setOpenOTP] = useState(false)
  const [phoneOtp, setPhone] = useState("");
  const [emailOtp, setEmail] = useState("");



  const handleOpen = () => setOpenOTP(true);
  const handleClose = () => setOpenOTP(false);

  // Verify Otp function 
  const verifyOtp = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    
    // console.log("sessionKey23", sessionKey)
    const actualData = {
      phone_otp: data.get('phoneOtp'),
    }
    // console.log("data", actualData)
    // const res = await verifyOTP(actualData)
    if (res.error) {
      // console.log(typeof (res.error.data.errors))
      // console.log("error",res.error)
      setOtpError(res.error.data.errors)
    }
    if (res.data) {
    
      
      navigate('/')
    }
  }
 
  // handle registration function 
  const handleSubmit = async (e) => {
    e.preventDefault();
   const data = new FormData(e.currentTarget);
   const actualData = {
     password: data.get('password'),
     email: data.get('email'),
     username: data.get('username'),
    
   }
  
    const res = await API.post('/user/register/', actualData);

   if (res.error) {
     // console.log(typeof (res.error.data.errors))
     console.log(res.error)
    //  console.log(res.error.data.errors) 
     setServerError(res.error.data.errors)
   }
   if (res.data) {
    //  console.log(typeof (res.data))
     console.log("data", res.data)
    //  console.log("key", res.data.session_key)
    //  console.log("token", res.data.token)
    //  storeToken(res.data.token)
     handleOpen();
     // navigate('/dashboard')
    }
    // data-bs-toggle="modal" data-bs-target="#otpModal" 
}
 
  return (
    <>
      {/* <Helmet>
        <title> Register | Y-Plan </title>
      </Helmet> */}

      <StyledRoot>
        

        <Container maxWidth="sm">
          <StyledContent>
            {/* <Typography variant="h4" gutterBottom>
              Sign in to Softylab
            </Typography> */}

             <Typography variant="h4" sx={{ mb:1 }}>
              Register {''}
              {/* <Link variant="subtitle2">Get started</Link> */}
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Already have an account? {''}
              <Link variant="subtitle2" component={NavLink} to="/Login">Login</Link>
            </Typography>

      <Box component="form" noValidate
        // sx={{ mt: 1 }}
        id="login-form" onSubmit={handleSubmit}
      >
      <Stack spacing={2}>
      {/* <TextField margin='normal' required fullWidth id='name' name='name' label='Name' />
      {serverError.name ? <Typography style={{ fontSize: 12, color: 'red', paddingLeft: 10 }}>{serverError.name[0]}</Typography> : ""} */}
      <TextField margin='normal' required fullWidth id='email' name='email' label='Email Address' />
      {serverError.email ? <Typography style={{ fontSize: 12, color: 'red', paddingLeft: 10 }}>{serverError.email[0]}</Typography> : ""}

      <TextField margin='normal' required fullWidth id='username' name='username' label='username' />
      {/* <PhoneInput country={"sa"} required inputStyle={{border: "round", borderColor: "brown", height: "3.5rem", width: "20rem", marginLeft: "0",}} onChange={(phone) => setPhone(phone)}/> */}
      {serverError.username ? <Typography style={{ fontSize: 12, color: 'red', paddingLeft: 10 }}>{serverError.username[0]}</Typography> : ""}
      <TextField margin='normal' required fullWidth id='password' name='password' label='Password' type='password' />
      {serverError.password ? <Typography style={{ fontSize: 12, color: 'red', paddingLeft: 10 }}>{serverError.password[0]}</Typography> : ""}
      
      <Box  display="flex" justifyContent="space-between">
        {/* <Link component={NavLink} to="/login">Back</Link> */}
            <Button  variant='contained' component={NavLink} to="/" sx={{ mt: 3, mb: 2, px: 5, }}>Back</Button>
       <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2, px: 5, justifyContent:"flex-end" }} >Join</Button>
       
      </Box>

      <Box textAlign='right'>

      {serverError.non_field_errors ? <Alert severity='error'>{serverError.non_field_errors[0]}</Alert> : ''}
      </Box>
       

      {/* <Box textAlign='center'>
        <Button type='submit' variant='contained'sx={{ mt: 3, mb: 2, px: 5 }}>Join</Button>
      </Box> */}
      
      </Stack>
    </Box>

    <Modal
        component="form"
        open={openOTP}
        onClose={handleClose}
        id='otp-form' 
        onSubmit={verifyOtp}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        // style={{backgrou}}
      >
        <Box
         
         noValidate
         sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Verify OTPs
          </Typography>
          {/* <label htmlFor="phoneOtp" className="col-form-label">OTP on Phone:</label>
          <input type="text" className="form-control" id="phoneOtp" name="phoneOtp" /> */}
          <TextField margin='normal' required fullWidth id='phoneOtp' name='phoneOtp' label='Phone OTP'  onChange={(phoneOtp) => {setPhone(phoneOtp)}} />
          {otpError.phoneOtp ? <Typography style={{ fontSize: 12, color: 'red', paddingLeft: 10 }}>{otpError.phoneOtp[0]}</Typography> : ""}
          {/* <label htmlFor="emailOtp" className="col-form-label">OTP on Email:</label>
          <input type="text" className="form-control" id="emailOtp" name="emailOtp"/>  */}
          <TextField margin='normal' required fullWidth id='emailOtp' name='emailOtp' label='Email OTP' onChange={(emailOtp) => {setEmail(emailOtp)}}/>
          {otpError.emailOtp ? <Typography style={{ fontSize: 12, color: 'red', paddingLeft: 10 }}>{otpError.emailOtp[0]}</Typography> : ""}
          <Box textAlign='center'>
            <Button onClick={handleClose} variant='contained' color='primary' sx={{ mt: 3, mb: 2, px: 2,  }}>Cancel</Button>
            <Button type='submit' variant='contained'color='secondary' sx={{ mt: 3, mb: 2, px: 5, mx: 2 }}>Verify OTP</Button>
          </Box>
          {otpError.non_field_errors ? <Alert severity='error'>{otpError.non_field_errors[0]}</Alert> : ''}
        </Box>
      </Modal>
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
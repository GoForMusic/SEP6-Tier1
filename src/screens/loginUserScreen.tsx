import { SyntheticEvent, useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormContainer from "../components/formContainer";
import { login } from "../thunks/loginUserThunk";
import { RootState } from "../store";
import { AppDispatch } from "../store";
// import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { setError, registerAccount } from "../thunks/registerAccountThunk";
import { registerWithGoogle,  setErrorGoogle} from "../thunks/googleRegisterThunk";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';



const clientId = "110067314755-c854rf3970nmipcdct7441sevchccffk.apps.googleusercontent.com";

const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  
  const userLogin = useSelector((state: RootState) => state.loginUserReducer);
  const error = useSelector((state: RootState) => state.loginUserReducer.error);
  const isLoggedIn = userLogin?.isLoggedIn;
  const userInfo: any = userLogin?.userData;

  const interpretErrorMessage = (error: any) => {
    console.log(error);
    if (username.trim() === "") {
      return "Username cannot be empty.";
    }
    return "There was an issue with your login. Please check your credentials and try again.";
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/home");
    }
  }, [userInfo, navigate, isLoggedIn]);

  const submitHandler = async (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(login(username, password));
  };

  const onGoogleSuccess = () => {
    
    dispatch(registerWithGoogle)
    console.log();
  
    };

  return (
    <GoogleOAuthProvider clientId={clientId}> 
    <FormContainer>
      <h1>Login</h1>

      {error && (
        <div style={{ color: "red" }}> {interpretErrorMessage(error)} </div>
      )}

      <Form onSubmit={submitHandler}>
        <Form.Group controlId="username" className="my-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="string"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.currentTarget.value)}
          />
        </Form.Group>

        <Form.Group controlId="password" className="my-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="my-3">
          Login
        </Button>
        {/* <GoogleLogin
      clientId={clientId}
      buttonText="Login with Google"
      onSuccess={onGoogleSuccess}
      onFailure={setErrorGoogle}
      cookiePolicy={'single_host_origin'}
    /> */}

<GoogleLogin
  onSuccess={onGoogleSuccess => {
    console.log(onGoogleSuccess);
  }}
  onError={() => {
    console.log('Login Failed');
  }}
/>;
     
      </Form>
    </FormContainer>
    </GoogleOAuthProvider>
  );}
;

export default LoginScreen;

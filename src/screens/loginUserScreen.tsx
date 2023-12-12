import { SyntheticEvent, useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormContainer from "../components/formContainer";
import { login } from "../thunks/loginUserThunk";
import { RootState } from "../store";
import { AppDispatch } from "../store";
import { setError, registerAccount } from "../thunks/registerAccountThunk";
import { registerWithGoogle } from "../thunks/googleRegisterThunk";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const clientId =
  "110067314755-tpum3uuch9l0ksvp8oulomfm5d35jq1n.apps.googleusercontent.com";

const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const error = useSelector((state: RootState) => state.loginUserReducer.error);
  const isLoggedIn = useSelector(
    (state: RootState) => state.loginUserReducer.isLoggedIn
  );
  const userId: any = useSelector(
    (state: RootState) => state.loginUserReducer.userId
  );
  const interpretErrorMessage = (error: any) => {
    console.log(error);
    if (username.trim() === "") {
      return "Username cannot be empty.";
    }
    return "There was an issue with your login. Please check your credentials and try again.";
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [userId, navigate, isLoggedIn]);

  const submitHandler = async (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(login(username, password));
  };

  const onGoogleSuccessfull = (response) => {
    // Ensure that the response object and profileObj are defined
    if (response && response.profileObj && response.profileObj.email) {
      // Access the user's email from the Google Sign-In response
      const userEmail = response.profileObj.email;

      // Dispatch the registerWithGoogle action with the obtained email
      dispatch(registerWithGoogle(userEmail, "some-password"));

      console.log("User Email from Google:", userEmail);
    } else {
      console.error("Invalid Google login response:", response);
      // Handle the case where email is not available in the response
    }
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
          <GoogleLogin
            onSuccess={onGoogleSuccessfull}
            onError={() => {
              console.log("Login Failed");
            }}
            useOneTap
          />
          ;
          {/* <Button onClick={() => login()}>Sign in with Google 🚀</Button>; */}
        </Form>
      </FormContainer>
    </GoogleOAuthProvider>
  );
};
export default LoginScreen;

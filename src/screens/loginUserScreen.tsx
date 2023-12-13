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
import "./formStyle.css";

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

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      dispatch(login(username, password));
    }
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
      <div className="profile-container">
        <h2 className="profile-title">Login</h2>
        {error && (
          <div style={{ color: "red", marginBottom: "1rem" }}>
            {interpretErrorMessage(error)}
          </div>
        )}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="username" className="profile-form">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="string"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.currentTarget.value)}
              className="profile-input"
            />
          </Form.Group>

          <Form.Group controlId="password" className="profile-form">
            <Form.Label>Password</Form.Label>
            <Form.Control
              onKeyPress={handleKeyPress}
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
              className="profile-input"
            />
          </Form.Group>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "1rem 0 2rem",
            }}
          >
            <Button
              type="submit"
              className="profile-button"
              style={{ alignSelf: "center" }}
            >
              Login
            </Button>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "20px 0",
            }}
          >
            <GoogleLogin
              onSuccess={onGoogleSuccessfull}
              onError={() => {
                console.log("Login Failed");
              }}
              useOneTap
            />
          </div>
        </Form>
      </div>
    </GoogleOAuthProvider>
  );
};
export default LoginScreen;

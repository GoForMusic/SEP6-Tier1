import { SyntheticEvent, useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store";
import { AppDispatch } from "../store";
import { setError, registerAccount } from "../thunks/registerAccountThunk";
import FormContainer from "../components/formContainer";
import "./formStyle.css";

const RegisterScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const registerState = useSelector(
    (state: RootState) => state.registerUserReducer
  );
  const error = useSelector(
    (state: RootState) => state.registerUserReducer.error
  );
  const isRegistered = registerState?.isRegistered;
  const userInfo: any = registerState?.userData;

  const interpretErrorMessage = (error: any) => {
    if (error === `Unexpected token 'U', "Username i"... is not valid JSON`) {
      error = "Username exists in the database";
    }
    return error;
  };

  useEffect(() => {
    if (isRegistered) {
      navigate("/home");
    }
  }, [userInfo, navigate, isRegistered]);

  const handleUsernameChange = (e: any) => {
    setUsername(e.currentTarget.value);
    if (error) {
      dispatch(setError("")); // Reset the error state
    }
  };

  const submitHandler = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (!username.trim() || !password.trim() || !confirmPassword.trim()) {
      dispatch(setError("Fields cannot be empty."));
      return;
    }

    if (password !== confirmPassword) {
      dispatch(setError("Passwords do not match."));
      return;
    }

    // dispatch reg req to reducer? if validations pass
    dispatch(registerAccount(username, password));
    console.log();
  };

  return (
    <div className="profile-container">
      {" "}
      <h2 className="profile-title">Sign Up</h2>{" "}
      {error && (
        <div style={{ color: "red" }}> {interpretErrorMessage(error)} </div>
      )}
      <Form onSubmit={submitHandler} className="profile-form">
        <Form.Group controlId="username" className="profile-form">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Username"
            value={username}
            onChange={handleUsernameChange}
            className="profile-input"
          />
        </Form.Group>
        <Form.Group controlId="password" className="profile-form">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
            className="profile-input"
          />
        </Form.Group>

        <Form.Group controlId="confirmPassword" className="profile-form">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.currentTarget.value)}
            className="profile-input"
          />
        </Form.Group>

        {/* ... other Form.Groups for password and confirm password with the same classes */}

        <Button variant="primary" type="submit" className="profile-button my-3">
          Sign Up
        </Button>
      </Form>
    </div>
  );
};

export default RegisterScreen;

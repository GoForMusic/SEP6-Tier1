import { SyntheticEvent, useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store";
import { AppDispatch } from "../store";
import { setError, registerAccount } from "../thunks/registerAccountThunk";
import FormContainer from "../components/formContainer";

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
    <FormContainer>
      <h1>Sign Up</h1>

      {error && (
        <div style={{ color: "red" }}> {interpretErrorMessage(error)} </div>
      )}
      <br></br>

      <Form onSubmit={submitHandler}>
        <Form.Group controlId="username" className="my-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="string"
            placeholder="Username"
            value={username}
            onChange={handleUsernameChange}
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

        <Form.Group controlId="confirmPassword" className="my-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.currentTarget.value)}
          />
        </Form.Group>

        <Button
          onSubmit={submitHandler}
          variant="primary"
          type="submit"
          className="my-3"
        >
          sign up!
        </Button>
      </Form>
    </FormContainer>
  );
};

export default RegisterScreen;

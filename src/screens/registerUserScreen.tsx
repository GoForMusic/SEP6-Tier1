// RegisterUserScreen.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store'; // Adjust the path as needed
import { registerAccount } from '../thunks/registerAccountThunk'; // Adjust the path as needed
import RegistrationForm from '../components/registrationForm'; // Import the RegistrationForm component

const RegisterUserScreen = () => {
  const dispatch: AppDispatch = useDispatch();
  const state = useSelector((state: any) => state.registerAccount);
  const message = state.message;

  useEffect(() => {
    // Dispatch the registerAccount thunk when the component mounts
    dispatch(registerAccount());
  }, [dispatch]);

  return (
    <div>
      <h1>Register User</h1>
      <RegistrationForm />
    </div>
  );
};

export default RegisterUserScreen;

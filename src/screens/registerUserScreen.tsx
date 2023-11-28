// RegisterUserScreen.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store'; // Adjust the path as needed
import { registerAccount } from '../thunks/registerAccountThunk'; 
import RegistrationForm from '../components/registrationForm'; 
const RegisterUserScreen = () => {
  const dispatch: AppDispatch = useDispatch();


  useEffect(() => {
   
    dispatch(registerAccount());
  }, [dispatch]);

  return  (
    <div>
      <h1>Register User</h1>
      <RegistrationForm />
    </div>
  );
};

export default RegisterUserScreen;

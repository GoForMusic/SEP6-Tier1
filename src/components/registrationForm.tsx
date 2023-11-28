// RegistrationForm.tsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store'; // Adjust the path as needed
import { registerAccount } from '../thunks/registerAccountThunk'; // Adjust the path as needed

const RegistrationForm = () => {
  const dispatch: AppDispatch = useDispatch();
  const state = useSelector((state: any) => state.registerAccount);
  const message = state?.message || ''; // Add a null check here

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Dispatch the registration thunk with form data
    dispatch(registerAccount());
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </label>
      <br />

      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </label>
      <br />

      <label>
        Password:
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </label>
      <br />

      <button type="submit">Register</button>

      {/* Display the registration message or other UI based on the state */}
      {message && <p>{message}</p>}
    </form>
  );
};

export default RegistrationForm;

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from '../../thunks/profileThunk';
import type { RootState, AppDispatch } from "../../store";
import './profile.css'; // Import the CSS file

const Profile = () => {

  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const userId = useSelector((state: RootState) => state.auth.userId);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePasswordChange = () => {
    if (newPassword.trim() !== "" && newPassword === confirmPassword) {
      dispatch(changePassword(newPassword, userId));
      setNewPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <div className="profile-container">
      <h2 className="profile-title">User Profile</h2>
      
      <div className="profile-form">
        <label>New Password:</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="profile-input"
        />
      </div>
      <div className="profile-form">
        <label>Confirm Password:</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="profile-input"
        />
        <button onClick={handlePasswordChange} className="profile-button">
          Change Password
        </button>
      </div>
    </div>
  );
};

export default Profile;

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from '../../thunks/profileThunk'
import type { RootState, AppDispatch } from "../../store";

const Profile = () => {

  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const userId = useSelector((state: RootState) => state.auth.userId);


  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePasswordChange = () => {
    // Check if the new password is not empty and matches the confirmation
    if (newPassword.trim() !== "" && newPassword === confirmPassword) {
      dispatch(changePassword(newPassword, userId));
      setNewPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <div>
      <h2>User Profile</h2>
      
      <div>
        <label>New Password:</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>
      <div>
        <label>Confirm Password:</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button onClick={handlePasswordChange}>Change Password</button>
      </div>
    </div>
  );
};

export default Profile;

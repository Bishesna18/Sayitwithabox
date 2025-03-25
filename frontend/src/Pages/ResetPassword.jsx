import React from 'react'
import toast from "react-hot-toast";
import { useState } from "react";
import './CSS/ResetPassword.css'
import { useNavigate, useParams } from "react-router-dom";
const ResetPassword = () => {
  const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);


	const { token } = useParams(); 
	const navigate = useNavigate();
  const resetPassword = async (token, newPassword) => {
    try {
      const response = await fetch(`http://localhost:4000/api/auth/reset-password/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: newPassword }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to reset password");
      }

      return data;
    } catch (error) {
      throw new Error(error.message || "Something went wrong");
    }
  };

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			alert("Passwords do not match");
			return;
		}
		try {
			await resetPassword(token, password);

			toast.success("Password reset successfully, redirecting to login page...");
			setTimeout(() => {
				navigate("/login");
			}, 2000);
		} catch (error) {
			console.error(error);
			toast.error(error.message || "Error resetting password");
		}
	};

  return (
    
    <div className='ResetPassword'> 
        <h2>Forgot Password</h2>
        <input type="text" className="new password"  placeholder="Enter your new password" value={password}
						onChange={(e) => setPassword(e.target.value)}
						required/>
        <input
					
						type='password'
						placeholder='Confirm New Password'
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
       <button type='submit'
						disabled={isLoading}
            onClick={handleSubmit}>
						{isLoading ? "Resetting..." : "Set New Password"}
</button>
    </div>
  )
}

export default ResetPassword

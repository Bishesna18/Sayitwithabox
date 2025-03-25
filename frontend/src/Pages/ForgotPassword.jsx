import { useState } from "react";
import './CSS/ForgetPassword.css'
const ForgotPassword = () => {
  const [email, setEmail] = useState(""); // State for storing email
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const handleForgotPassword = async () => {
    setIsLoading(true);
    if (!email) {
      setMessage("Please enter an email address");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      console.log("Success:", data);
      alert("Password reset link sent to your email");
    } catch (error) {
      console.error("Error:", error.message);
      alert(error.message);
    }
  };

  return (
    <div className="Forgot-Password">
      <h1>Forgot your Password?</h1>
      <p>Enter your email to recover it</p>
      <input
        type="email"
        placeholder="email"
        value={email} // Bind input to state
        onChange={(e) => setEmail(e.target.value)} // Update state on input change
      />
      {message && <p>{message}</p>}
       <button onClick={handleForgotPassword} type="submit" disabled={isLoading}>
          {isLoading ? "Sending..." : "Reset Password"}
        </button>
        
    </div>
  );
};

export default ForgotPassword;

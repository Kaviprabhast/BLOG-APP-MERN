import { useState } from "react";
import { Navigate } from "react-router-dom";
import '../CSS/RegistrationPage.css'

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [redirect, setRedirect] = useState(false);

  async function register(ev) {
    ev.preventDefault();
    const response = await fetch("https://blog-app-mern-back-8b2y.onrender.com/register", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.status === 200) {
      setMessage("Registration successful!");
      setMessageType("success");
      setRedirect(true); 
    } 
    else if(response.status === 400){
      setMessage("Username already exists");
      setMessageType("error");
    }
    else {
      setMessage("Registration failed. Please try again.");
      setMessageType("error");
    }
  }

  if (redirect) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="register-container">
      <form className="register" onSubmit={register}>
        <h1>Register</h1>
        <label>UserName</label>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(ev) => setUsername(ev.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <button type="submit" className="register-btn">Register</button>
        {message && <p className={`message ${messageType}`}>{message}</p>}
      </form>
    </div>
  );
}

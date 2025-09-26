// src/components/AuthPage.js
import React, { useState } from "react";
import { login, register } from "../services/userApi";
import "../styles/AuthPage.css"; 

function AuthPage({ onAuth }) {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (isRegister) {
        await register(username, password);
        alert("Registration successful! Please log in.");
        setIsRegister(false);
      } else {
        const data = await login(username, password);
        onAuth(data.token); // Save the token in the app
      }
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div className="auth-container">
      <h2>{isRegister ? "Register" : "Login"}</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{isRegister ? "Register" : "Login"}</button>
      </form>
      <button
        className="switch-btn"
        onClick={() => setIsRegister(!isRegister)}
      >
        {isRegister
          ? "Already have an account? Login"
          : "Need an account? Register"}
      </button>
    </div>
  );
}

export default AuthPage;

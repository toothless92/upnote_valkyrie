// Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {useAppContext} from "../Context/Context"

const Login = () => {
  const { token, setToken, notes, setNotes } =
    useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = await login(email, password);

      if (rememberMe) {
        localStorage.setItem("authToken", token);
        setToken(token);
      } else {
        sessionStorage.setItem("authToken", token);
        setToken(token);
      }

      navigate("/notes"); // Redirect to the NoteViewer page
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login">
      <link rel="stylesheet" href="styles.css" />
      <h1>UpNote Valkyrie</h1>
      <h5 className="center">A mediocre UpNote client.</h5>
      <div>UpNote Valkyrie is an open source and self-contained application.
        Login info and user data are handled using
        the same API as UpNote's official applications.
        </div> 
      <form id="authForm" onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          type="email"
          id="username"
          name="username"
          autoComplete="username"
          onChange={(e) => setEmail(e.target.value)}
          required
          />

        <label for="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
          required/>

        {/* <!-- Add the "Remember me" checkbox --> */}
        <div className="rememberLogin">
            <label
            for="rememberMe"
            className="rememberMe">Remember me on this device</label>
            <input
            type="checkbox"
            id="rememberMe"
            className="checkbox"
            onChange={(e) => setRememberMe(e.target.checked)}
            />
        </div>

        <button type="submit">Log In</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

async function login(email, password) {
  const response = await fetch(
    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBYTeKk9UCCrxiZ8CWonaZNYmcGuMcd1OQ",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, returnSecureToken: true, clientType: "CLIENT_TYPE_WEB" }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    if (data.error && data.error.message === "INVALID_PASSWORD") {
      throw new Error("Invalid password. Please try again.");
    }
    throw new Error(data.error?.message || "Login failed!");
  }

  return data.idToken;
}

export default Login;

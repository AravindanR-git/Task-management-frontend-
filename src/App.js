// src/App.js
import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage.js";
import SignupPage from "./pages/SignupPage.js";
import DashboardPage from "./pages/DashboardPage.js";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const name = localStorage.getItem("username");
    if (token) {
      setIsLoggedIn(true);
      setUsername(name);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setUsername(localStorage.getItem("username"));
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    setUsername("");
  };

  return (
    <Routes>
      <Route
        path="/"
        element={isLoggedIn ? <Navigate to="/dashboard" /> : <LoginPage onLogin={handleLogin} />}
      />
      <Route path="/signup" element={<SignupPage />} />
      <Route
        path="/dashboard"
        element={
          isLoggedIn ? (
            <DashboardPage username={username} onLogout={handleLogout} />
          ) : (
            <Navigate to="/" />
          )
        }
      />
    </Routes>
  );
}

export default App;

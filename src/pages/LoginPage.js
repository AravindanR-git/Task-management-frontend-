import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Form, Button } from "react-bootstrap";
import { loginAPI } from "../services/api.js";

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return alert("Email and password required!");

    try {
      const data = await loginAPI({ email, password });
      localStorage.setItem("authToken", data.data.token);
      localStorage.setItem("username", data.data.user.username);
      onLogin();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Login failed!");
    }
  };

  return (
    <Card className="mx-auto mt-5" style={{ maxWidth: "400px" }}>
      <Card.Body>
        <Card.Title className="mb-3 text-center">Login</Card.Title>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-2">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </Form.Group>

          <Button type="submit" className="w-100 mb-3">Login</Button>

          <div className="text-center">
            New user?{" "}
            <Button variant="link" onClick={() => navigate("/signup")}>
              Sign Up
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default LoginPage;

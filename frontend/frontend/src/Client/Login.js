import React, { useState } from "react";
import {Form} from 'react-bootstrap'
import { Button } from "react-bootstrap";
import "./Login.css";
import { Navigate } from 'react-router';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState('');
  function validateForm() {
    return email.length > 0 && password.length > 8;
  }

  function handleSubmit(e) {
    e.preventDefault();
    axios.post('http://127.0.0.1:8000/appointment/login/', {
      email: e.target.elements.email.value,
      pwd: e.target.elements.password.value,
    })
      .then(res => {
        setToken(res.data.key);
        localStorage.setItem('token',res.data.key);
        localStorage.setItem('username',res.data.username);
        localStorage.setItem('priority', res.data.priority);
        toast.success('Welcome!')
        })
      .catch(error => toast.error('Please try again.'))
  }
  if (token) {
    return <Navigate to="/" refresh='true' />;
  }
  return (
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group><br />
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <br /><br />
        <Button size="lg" type="submit" disabled={!validateForm()}>
          Log In
        </Button>
      </Form><br />
      <p style={{textAlign:'center'}}>New us? Please <a href="/signup">Sign up</a></p>
    </div>
  );
}
export default Login
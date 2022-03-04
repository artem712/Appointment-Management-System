import React, { useState } from "react";
import {Form} from 'react-bootstrap'
import { Button } from "react-bootstrap";
import "./Login.css";
import { Navigate } from 'react-router';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';

function Signup() {
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState('');
  function validateForm() {
    return email.length > 0 && password.length > 8;
  }

  function handleSubmit(e) {
    e.preventDefault();
    axios.post('http://127.0.0.1:8000/appointment/signup/', {
      uname: e.target.elements.username.value,
      fname: e.target.elements.firstname.value,
      lname: e.target.elements.lastname.value,
      email: e.target.elements.email.value,
      pwd: e.target.elements.password.value,
    })
      .then(res => {toast.success('Sign Up Success');setToken(res.data.key)})
      .catch(err => toast.error(err.data.message))
  }
  if (token) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group><br />
        <Form.Group size="lg" controlId="firstname">
          <Form.Label>FirstName</Form.Label>
          <Form.Control
            type="text"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
        </Form.Group><br />
        <Form.Group size="lg" controlId="lastname">
          <Form.Label>LastName</Form.Label>
          <Form.Control
            type="text"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
        </Form.Group><br />
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
          Sign Up
        </Button>
      </Form>
    </div>
  );
}
export default Signup
import React, { useState } from "react";
import { useNavigate } from "react-router";

const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      //     // Save the auth token and redirect
      localStorage.setItem("token", json.authToken);
      history("/home");
      props.showAlert(`Logged In successfully`, "success");
    } else {
      props.showAlert("Invalid credentials", "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div className="container mt-5">
      <h2 className="mb-5"> Login to access NoteBook</h2>
      <form onSubmit={handleSubmit} className="container">
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            name="email"
            value={credentials.email}
            onChange={onChange}
            required
          />
          <div id="emailHelp" className="form-text ms-2">
            *We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={credentials.password}
            onChange={onChange}
            id="password"
            required
          />
          <div id="passwordHelp" className="form-text ms-2">
            *Password must contain a Number, Uppercase, Lowercase and special
            some Characters.
          </div>
        </div>
        <button type="submit" className="btn btn-primary ms-3">
          Sign in
        </button>
      </form>
    </div>
  );
};

export default Login;

import React, { useState } from "react";
import { useHistory } from "react-router";
import auth from "./images/auth.jpg";
import { Route, Link, Switch } from "react-router-dom";
import http from "./services.js";
function Register() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();
  async function register(e) {
    e.preventDefault();
    try {
      if (!name || !passwordConfirm || !password || !email)
        throw new Error("Invalid data");
      if (password !== passwordConfirm)
        throw new Error("Passwords don't match");
      const payload = { name, password, passwordConfirm, email };
      const {data} = await http.post(
        "http://localhost:5000/api/auth/register",
        payload
      );
      if (data.success) {
        history.push("/");
        console.log(1324)
      } else setErrorMessage(data.message);
    } catch (error) {
      setErrorMessage(error.message);
    }
  }
  return (
    <form className="auth-form" onSubmit={(e) => register(e)}>
      <h2 className="auth-form-title">Register</h2>
      <label htmlFor="name">Enter username</label>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
        name="name"
      />
      <label htmlFor="email">Enter your E-mail</label>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        name="email"
      />
      <label htmlFor="password">Enter your password</label>
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        name="password"
      />
      <label htmlFor="passwordConfirm">Re-enter your password</label>
      <input
        value={passwordConfirm}
        onChange={(e) => setPasswordConfirm(e.target.value)}
        type="password"
        name="passwordConfirm"
      />
      <div className="auth-form-btn">
        <button type="submit">Register</button>
        <Link to="/auth/login">Already have an account?</Link>
      </div>
      {errorMessage && (
        <div className="auth-form-error">
          <h4>{errorMessage}</h4>
        </div>
      )}
    </form>
  );
}

function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();
  async function login(e) {
    e.preventDefault();
    try {
      if (!password || !email) throw new Error("Invalid data");
      const payload = { password, email };
      const {data} = await http.post(
        "http://localhost:5000/api/auth/login",
        payload
      );
      if (data.success) {
        history.push("/");
      } else setErrorMessage(data.message);
    } catch (error) {
      setErrorMessage(error.message);
    }
  }
  return (
    <form className="auth-form" onSubmit={(e) => login(e)}>
      <h2 className="auth-form-title">Login</h2>
      <label htmlFor="email">Enter your E-mail</label>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        name="email"
      />
      <label htmlFor="password">Enter your password</label>
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        name="password"
      />
      <div className="auth-form-btn">
        <button type="submit">Login</button>
        <Link to="/auth/register">Don't have account yet?</Link>
      </div>
      {errorMessage && (
        <div className="auth-form-error">
          <h4>{errorMessage}</h4>
        </div>
      )}
    </form>
  );
}
export default function Auth() {
  return (
    <div className="auth">
      <div className="auth-inner" style={{ backgroundImage: `url(${auth})` }}>
        <div className="auth-content">
          <Link to={"/"} className="auth-logo">
            Travel Log
          </Link>
          <Switch>
            <Route exact path="/auth/register" component={Register} />
            <Route exact path="/auth/login" component={Login} />
          </Switch>
        </div>
      </div>
    </div>
  );
}

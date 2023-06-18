import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(UserContext);

  function saveUserDataToCookie(userData) {
    const json = JSON.stringify(userData);
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 1); // Set expiration date to 1 day from now
    document.cookie = `userData=${json}; expires=${expirationDate.toUTCString()}; path=/`;
  }
  
  
  
  async function userLogin(e) {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "/login",
        { email, password },
        { withCredentials: true }
      );
      setUser(data);
      saveUserDataToCookie(data);
      alert("login sucessful");
      setRedirect(true);
    } catch (err) {
      alert("login failed");
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <div className="mt-12 flex justify-items-center items-center">
      <div className="-mb-64">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="max-w-md mx-auto border" onSubmit={userLogin}>
          <input
            type="email"
            placeholder={"your@email.com"}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <button className="primary">Login</button>

          <div className="text-center py-2 text-gray-500">
            Don't have an account yet?{" "}
            <Link className="underline text-black " to={"/register"}>
              Register now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

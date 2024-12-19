import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const mockUser = {
      username: "mor_2314",
      password: "83r5^_",
    };

    if (username === mockUser.username && password === mockUser.password) {
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("username", username);
      navigate("/");
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-100 p-6 rounded shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-4 flex justify-center">Login</h2>
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm mb-1">
            Username (mor_2314)
          </label>
          <input
            type="text"
            id="username"
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-blue-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm mb-1">
            Password (83r5^_)
          </label>
          <input
            type="password"
            id="password"
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-700 focus:outline-none focus:ring focus:ring-blue-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
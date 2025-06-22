import React from "react";
import { useNavigate, Link } from "react-router";
import { useState } from "react";
import { RiAccountPinCircleFill } from "react-icons/ri";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Alert from "@mui/material/Alert";
import { authAPI } from "../services/api";
import { FaFacebook } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";

function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user.email) {
      setError("Please fill in Email field");
      setTimeout(() => setError(""), 1500);
      return;
    }
    if (!user.password) {
      setError("Please fill in Password field");
      setTimeout(() => setError(""), 1500);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await authAPI.signin(user.email, user.password);
      if (response.success) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", user.email);
        setSuccess("Login successful!");
        setTimeout(() => {
          navigate("/home");
        }, 1500);
      } else {
        setError(response.error?.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.error?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {error && (
        <Alert
          severity="error"
          onClose={() => setError("")}
          className="fixed top-5 left-1/2 transform -translate-x-1/2 w-72 md:w-96 z-55"
        >
          {error}
        </Alert>
      )}
      {success && (
        <Alert
          severity="success"
          onClose={() => setSuccess("")}
          className="fixed top-5 left-1/2 transform -translate-x-1/2 w-72 md:w-96 z-55"
        >
          {success}
        </Alert>
      )}
      <div className="flex flex-col md:flex-row items-center justify-center h-screen bg-gray-100">
        <div className="hidden md:flex flex-col gap-y-5 items-center justify-center bg-gradient-to-bl from-cyan-400 to-blue-600 text-white h-full w-1/2 rounded-r-4xl">
          <h1 className="text-2xl">Welcome</h1>
          <p className="text-center text-lg w-3/4">
            Welcome back! Please log in to get Weather updates.
            <br />
            Enjoy fast, secure, and easy access to real-time weather
            information—anytime, anywhere.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center bg-neutral-100 h-full w-1/2">
          <div className="flex flex-col items-center bg-neutral-150 p-5 gap-5 md:px-10 rounded-lg shadow-md">
            <div className="flex flex-col items-center bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full">
              <RiAccountPinCircleFill className="text-6xl p-2 text-neutral-50" />
            </div>
            <h1 className="text-xl font-medium">Login</h1>

            <div className="flex flex-col items-center gap-3">
              {" "}
              <input
                className="border border-gray-300/50 p-2 px-5 rounded-lg w-72 focus:outline-2 focus:outline-cyan-600/50 hover:shadow-md transition-shadow duration-300 shadow-cyan-500/20 hover:border-cyan-600/50  focus:bg-neutral-200/50"
                type="email"
                name="email"
                placeholder="Enter email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
              <div className="relative w-72">
                <input
                  className="border border-gray-300/50 p-2 px-5 rounded-lg w-full focus:outline-2 focus:outline-cyan-600/50 hover:shadow-md transition-shadow duration-300 shadow-cyan-500/20 hover:border-cyan-600/50  focus:bg-neutral-200/50"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter password"
                  value={user.password}
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                />

                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xl text-gray-500 cursor-pointer hover:scale-110 transition-transform duration-200"
                  onClick={() => setShowPassword((prev) => !prev)}
                  tabIndex={-1}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                </button>
              </div>
              <p>
                Don't have an account?{" "}
                <Link
                  className="hover:underline cursor-pointer hover:text-cyan-500"
                  to="/register"
                >
                  Register
                </Link>
              </p>
              <p className="text-center text-sm ">OR Sign in with</p>
              <div className="flex gap-x-3 w-full justify-center">
                <button className="flex items-center justify-center bg-neutral-800 p-2 px-7 rounded-lg  hover:bg-neutral-700 transition-colors duration-300 shadow-md hover:shadow-xl cursor-pointer">
                  <FaFacebook className="inline text-2xl text-neutral-50" />
                </button>
                <button className="flex items-center justify-center bg-neutral-800 p-2 px-7 rounded-lg  hover:bg-neutral-700 transition-colors duration-300 shadow-md hover:shadow-xl cursor-pointer">
                  <FaGoogle className="inline text-2xl text-neutral-50" />
                </button>
                <button className="flex items-center justify-center bg-neutral-800 p-2 px-7 rounded-lg  hover:bg-neutral-700 transition-colors duration-300 shadow-md hover:shadow-xl cursor-pointer">
                  <FaGithub className="inline text-2xl text-neutral-50" />
                </button>
              </div>{" "}
              <button
                className="bg-cyan-500 text-white p-2 rounded-lg w-40 hover:bg-cyan-600 transition-colors duration-300 shadow-md hover:shadow-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                type="submit"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Signing in..." : "Login"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;

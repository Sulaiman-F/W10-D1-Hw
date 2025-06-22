import { useNavigate, Link } from "react-router";
import { useState } from "react";
import { RiAccountPinCircleFill } from "react-icons/ri";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Alert from "@mui/material/Alert";
import { authAPI } from "../services/api";

function Register() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user.email) {
      setError("Please fill in Email field");
      setTimeout(() => {
        setError("");
      }, 1500);
      return;
    }
    if (!user.password) {
      setError("Please fill in Password field");
      setTimeout(() => {
        setError("");
      }, 1500);
      return;
    }
    if (!user.confirmPassword) {
      setError("Please fill in Confirm Password field");
      setTimeout(() => {
        setError("");
      }, 1500);
      return;
    }
    if (user.password !== user.confirmPassword) {
      setError("Passwords do not match");
      setTimeout(() => {
        setError("");
      }, 1500);
      return;
    }
    if (user.password.length < 6) {
      setError("Password must be at least 6 characters long");
      setTimeout(() => {
        setError("");
      }, 1500);
      return;
    }
    if (!/\S+@\S+\.\S+/.test(user.email)) {
      setError("Please enter a valid email address");
      setTimeout(() => {
        setError("");
      }, 1500);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await authAPI.signup(user.email, user.password);

      if (response.success) {
        setSuccess("Registration successful! Please login.");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setError(response.error?.message || "Registration failed");
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError(err.response?.data?.error?.message || "Registration failed");
      setTimeout(() => {
        setError("");
      }, 1500);
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
            Create an account to access personalized weather updates and more.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center bg-neutral-100 h-full w-1/2">
          <div className="flex flex-col items-center  p-5 gap-5 md:px-10 shadow-md rounded-lg bg-neutral-150">
            <div className="flex flex-col items-center bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full">
              <RiAccountPinCircleFill className="text-6xl p-2 text-neutral-50" />
            </div>
            <h1 className="text-xl font-medium">Register</h1>{" "}
            <div className="flex flex-col items-center gap-3">
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
              <div className="relative w-72">
                <input
                  className="border border-gray-300/50 p-2 px-5 rounded-lg w-full focus:outline-2 focus:outline-cyan-600/50 hover:shadow-md transition-shadow duration-300 shadow-cyan-500/20 hover:border-cyan-600/50  focus:bg-neutral-200/50"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Confirm password"
                  value={user.confirmPassword}
                  onChange={(e) =>
                    setUser({
                      ...user,
                      confirmPassword: e.target.value,
                    })
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
              <p className="text-sm text-gray-500">
                already have an account?{" "}
                <Link
                  className="hover:underline cursor-pointer hover:text-cyan-500"
                  to="/login"
                >
                  Login
                </Link>
              </p>{" "}
              <button
                className="bg-cyan-500 text-white p-2 rounded-lg w-40 hover:bg-cyan-600 transition-colors duration-300 shadow-md hover:shadow-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                type="submit"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Registering..." : "Register"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;

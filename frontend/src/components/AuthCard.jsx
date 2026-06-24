import React, { useContext, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { AuthContext } from "../context/AuthContext";

const AuthCard = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { handleRegister, handleLogin } = useContext(AuthContext);

  const resetForm = () => {
    setUsername("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-xl mt-20">
      {/* Toggle Tabs  */}
      <div className="flex mb-6 bg-white/5 rounded-full p-1">
        <button
          className={`flex-1 py-2 rounded-full text-sm transition ${isLogin ? "bg-white/10 text-white" : "text-gray-400"}`}
          onClick={() => {
            setIsLogin(true);
            resetForm();
          }}
        >
          Login
        </button>

        <button
          className={`flex-1 py-2 rounded-full text-sm transition ${!isLogin ? "bg-white/10 text-white" : "text-gray-400"}`}
          onClick={() => {
            setIsLogin(false);
            resetForm();
          }}
        >
          SignUp
        </button>
      </div>

      {/* Title */}
      <h2 className="text-2xl font-semibold">
        {isLogin ? "Welcome back" : "Create an account"}
      </h2>

      <p className="text-gray-400 text-sm mt-1 mb-6">
        {isLogin
          ? "Enter your details to continue"
          : "Start your journey with Meetly"}
      </p>

      {/* Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();

          if (isLogin) {
            handleLogin({ email, password });
          } else {
            handleRegister({ username, email, password, setIsLogin });
          }
        }}
        className="space-y-4"
      >
        {/* Username (only for signup)  */}
        {!isLogin && (
          <div className="space-y-1">
            <label
              htmlFor="username"
              className="block text-xs font-medium text-gray-400 ml-1"
            >
              Username
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-purple-500 focus:outline-none"
              required
            />
          </div>
        )}

        {/* Email */}
        <div className="space-y-1">
          <label
            htmlFor="email"
            className="block text-xs font-medium text-gray-400 ml-1"
          >
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-purple-500 focus:outline-none"
            required
          />
        </div>

        {/* Password */}
        <div className="space-y-1">
          <label
            htmlFor="password"
            className="block text-xs font-medium text-gray-400 ml-1"
          >
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 mb-2 rounded-lg bg-white/5 border border-white/10 focus:border-purple-500 focus:outline-none"
              required
            />

            {/* Toggle button  */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>
        </div>

        {/* Button */}
        <button className="w-full py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium shadow-lg shadow-purple-500/30 hover:scale-[1.02] active:scale-95 transition duration-200">
          {isLogin ? "Login" : "Create Account"}
        </button>
      </form>

      {/* Bottom Text */}
      <p className="text-center text-sm text-gray-400 mt-6">
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <span
          onClick={() => setIsLogin(!isLogin)}
          className="text-purple-400 cursor-pointer hover:underline"
        >
          {isLogin ? "Sign up" : "Login"}
        </span>
      </p>
    </div>
  );
};

export default AuthCard;

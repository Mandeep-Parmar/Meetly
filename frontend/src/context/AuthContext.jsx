import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [token, setToken] = useState(null);

  useState(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) setToken(storedToken);
  }, []);

  const handleRegister = async ({ username, email, password, setIsLogin }) => {
    try {
      const response = await axios.post(`${backendUrl}/api/user/register`, {
        username,
        email,
        password,
      });

      if (response.data.success) {
        toast.success(response.data.message);

        // switch to login
        setIsLogin(true);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const handleLogin = async ({ email, password }) => {
    try {
      const response = await axios.post(`${backendUrl}/api/user/login`, {
        email,
        password,
      });

      if (response.data.success) {
        toast.success(response.data.message);

        localStorage.setItem("token", response.data.token);

        setToken(response.data.token);

        navigate("/dashboard");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const handleLogout = async () => {
    localStorage.removeItem("token");
    setToken(null);

    navigate("/auth");
  };

  const value = { handleRegister, handleLogin, token, handleLogout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

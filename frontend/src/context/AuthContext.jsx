import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
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

        localStorage.setItem("user", JSON.stringify(response.data.user));

        setToken(response.data.token);
        setUser(response.data.user);

        navigate("/dashboard");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setToken(null);
    setUser(null);

    navigate("/auth");
  };

  const createMeeting = async (meetingCode) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/meeting/create`,
        { meetingCode },
        { headers: { token } },
      );

      return response.data;
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);

      return {
        success: false,
      };
    }
  };

  const getMeetingHistory = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/meeting/history`, {
        headers: { token },
      });

      return response.data;
    } catch (error) {
      console.log(error);

      return {
        success: false,
      };
    }
  };

  const addParticipant = async (meetingCode) => {
    try {
      const respons = axios.post(
        `${backendUrl}/api/meeting/add-participant`,
        { meetingCode },
        { headers: { token } },
      );

      return respons.data;
    } catch (error) {
      console.log(error);

      return {
        success: false,
      };
    }
  };

  const value = {
    handleRegister,
    handleLogin,
    token,
    user,
    handleLogout,
    createMeeting,
    getMeetingHistory,
    addParticipant,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

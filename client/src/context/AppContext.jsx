import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export const AppContext = createContext();
import { toast } from "react-toastify";
const AppContextProvider = ({ children }) => {
  //global variables
  const navigate = useNavigate();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  //state variables
  const [user, setUser] = useState(false);
  const [authState, setAuthState] = useState("login");
  const [showLogin, setShowLogin] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [credit, setCredit] = useState(0);
  //functions
  const swapAuthState = () => {
    setAuthState((prev) => (prev === "login" ? "signup" : "login"));
  };

  const fetchCredits = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/auth/credits`, {
        headers: { token },
      });

      if (response.data.success) {
        setCredit(response.data.credits);
        setUser(response.data.user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const generateImage = async (prompt) => {
    try {
      if (credit < 1) {
        navigate("/buy");
        toast.error("Insufficient credits. Please purchase more credits.");
        return;
      }

      const response = await axios.post(
        `${BACKEND_URL}/api/image/generate`,
        { prompt },
        { headers: { token } }
      );

      if (response.data.success) {
        fetchCredits();
        return response.data.image;
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while generating image.");
    } finally {
      fetchCredits();
    }
  };

  const logOut = () => {
    setToken(null);
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
    toast.success("Logged out successfully");
  };

  useEffect(() => {
    if (token) {
      fetchCredits();
    }
  }, [token]);

  //values
  const value = {
    user,
    setUser,
    authState,
    setAuthState,
    swapAuthState,
    showLogin,
    setShowLogin,
    navigate,
    BACKEND_URL,
    token,
    setToken,
    credit,
    setCredit,
    fetchCredits,
    logOut,
    generateImage,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;

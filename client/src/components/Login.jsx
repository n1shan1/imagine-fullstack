import React, { useContext, useEffect, useState } from "react";
import { User2Icon, LockIcon, MailIcon, XCircle, Loader2 } from "lucide-react";
import { AppContext } from "../context/AppContext";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import axios from "axios";

const Login = () => {
  const {
    user,
    authState,
    swapAuthState,
    showLogin,
    setShowLogin,
    setUser,
    BACKEND_URL,
    setToken,
    setCredit,
  } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (authState === "login") {
        const response = await axios.post(`${BACKEND_URL}/api/auth/login`, {
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          setUser(response.data.user);
          setShowLogin(false);
          setIsLoading(false);
          localStorage.setItem("token", response.data.token);
          toast.success(response.data.message);
        } else {
          setIsLoading(false);
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(`${BACKEND_URL}/api/auth/register`, {
          name,
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          setUser(response.data.user);
          setShowLogin(false);
          setIsLoading(false);
          localStorage.setItem("token", response.data.token);
          toast.success(response.data.message);
        } else {
          setIsLoading(false);
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast.error("Internal server error. Please try again.");
    }
  };

  const handleEscapeKey = (e) => {
    if (e.key === "Escape") {
      setShowLogin(false);
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3 },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.3 },
    },
  };

  const formVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        duration: 0.4,
      },
    },
    exit: {
      opacity: 0,
      y: 50,
      scale: 0.95,
      transition: { duration: 0.3 },
    },
  };

  const inputVariants = {
    focus: {
      scale: 1.02,
      boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.3)",
      borderColor: "#3B82F6",
      transition: { duration: 0.2 },
    },
    blur: {
      scale: 1,
      boxShadow: "none",
      borderColor: "rgb(75 85 99)",
      transition: { duration: 0.2 },
    },
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-10 backdrop-blur-sm bg-black/30 flex items-center justify-center"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={overlayVariants}
        onClick={(e) => e.target === e.currentTarget && setShowLogin(false)}
      >
        <motion.form
          onSubmit={handleFormSubmit}
          className="bg-white relative p-10 text-stone-700 space-y-4 rounded-lg shadow-xl w-full max-w-md mx-4"
          variants={formVariants}
          onClick={(e) => e.stopPropagation()}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.button
            type="button"
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowLogin(false)}
            aria-label="Close"
          >
            <XCircle className="w-6 h-6" />
          </motion.button>

          <motion.h1
            className="text-center text-3xl text-stone-800 font-bold"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
          >
            {authState === "login" ? "Welcome Back" : "Create Account"}
          </motion.h1>

          <motion.p
            className="text-sm text-center text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.3 } }}
          >
            {authState === "login"
              ? "Sign in to continue to your account"
              : "Fill out the form to get started"}
          </motion.p>

          <motion.div
            className="space-y-4 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.4 } }}
          >
            {authState === "signup" && (
              <motion.div
                className="relative"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
              >
                <motion.div
                  className="flex items-center gap-2 border border-gray-600 px-4 py-3 rounded-md"
                  whileFocus="focus"
                  whileTap="focus"
                  variants={inputVariants}
                >
                  <User2Icon className="w-5 h-5 text-gray-500" />
                  <input
                    className="outline-none w-full"
                    type="text"
                    placeholder="Full Name"
                    required
                    aria-label="Full Name"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                  />
                </motion.div>
              </motion.div>
            )}

            <motion.div
              className="flex items-center gap-2 border border-gray-600 px-4 py-3 rounded-md"
              whileFocus="focus"
              whileTap="focus"
              variants={inputVariants}
            >
              <MailIcon className="w-5 h-5 text-gray-500" />
              <input
                className="outline-none w-full"
                type="email"
                placeholder="Email"
                required
                aria-label="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </motion.div>

            <motion.div
              className="flex items-center gap-2 border border-gray-600 px-4 py-3 rounded-md"
              whileFocus="focus"
              whileTap="focus"
              variants={inputVariants}
            >
              <LockIcon className="w-5 h-5 text-gray-500" />
              <input
                className="outline-none w-full"
                type="password"
                placeholder="Password"
                required
                aria-label="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </motion.div>
          </motion.div>

          {authState === "login" && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.5 } }}
              className="text-sm text-blue-600 cursor-pointer hover:underline text-right"
            >
              Forgot password?
            </motion.p>
          )}

          <motion.div
            className="flex flex-col sm:flex-row gap-4 pt-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.6 } }}
          >
            <motion.button
              type="submit"
              disabled={isLoading}
              className="bg-black text-white text-sm px-6 py-3 rounded-md flex-1 flex items-center justify-center hover:bg-gray-800 transition-colors"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
              ) : null}
              {authState === "login" ? "Login" : "Sign Up"}
            </motion.button>

            <motion.button
              type="button"
              onClick={swapAuthState}
              className="border border-black text-black text-sm px-4 py-3 rounded-md flex-1 hover:bg-black/5 transition-colors"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {authState === "login" ? "Create Account" : "Have an account?"}
            </motion.button>
          </motion.div>
        </motion.form>
      </motion.div>
    </AnimatePresence>
  );
};

export default Login;

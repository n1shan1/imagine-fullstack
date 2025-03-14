import React, { useContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import BuyCredit from "./pages/BuyCredit";
import Result from "./pages/Result";
import Footer from "./components/Footer";
import Login from "./components/Login";
import { AppContext } from "./context/AppContext";
import { ToastContainer } from "react-toastify";
import About from "./pages/About";
import metadata from "../metadata";
const App = () => {
  const { showLogin } = useContext(AppContext);
  useEffect(() => {
    document.title = metadata.title;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", metadata.description);
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content = metadata.description;
      document.head.appendChild(meta);
    }
  }, []);
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-t from-teal-50 to-green-50">
      <div className="px-4 sm:px-10 md:px-14 lg:px-28">
        <Navbar />

        {showLogin && <Login />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/buy" element={<BuyCredit />} />
          <Route path="/result" element={<Result />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
      />
      <Footer />
    </div>
  );
};

export default App;

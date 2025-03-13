import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const GenerateBtn = () => {
  const { user, setShowLogin, navigate } = useContext(AppContext);
  const onClickHandler = () => {
    if (user) {
      navigate("/result");
    } else {
      setShowLogin(true);
    }
  };

  return (
    <button
      onClick={onClickHandler}
      className="bg-gradient-to-r from-blue-300 to-red-300 text-stone-800 sm:text-lg md:text-xl px-12 py-2.5 mt-10 shadow-lg w-auto hover:scale-105 transition-all duration-500"
    >
      Generate Now!
    </button>
  );
};

export default GenerateBtn;

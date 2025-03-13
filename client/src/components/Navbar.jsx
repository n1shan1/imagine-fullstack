import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User2Icon } from "lucide-react";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const { user, setShowLogin, logOut, credit } = useContext(AppContext);

  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between py-4 px-1 sm:px-0">
      <Link to={"/"}>
        {/* <img className="w-28 sm:w-32 lg:w-40" src={assets.logo} alt="icon" /> */}
        <p className="font-bold text-3xl text-zinc-900">IMAGINE</p>
      </Link>
      {!user ? (
        <div className="flex items-center gap-2 sm:gap-5 md:gap-6 ">
          <p onClick={() => navigate("/")} className="cursor-pointer ">
            Home
          </p>
          <p onClick={() => navigate("/about")} className="cursor-pointer ">
            About
          </p>
          <p onClick={() => navigate("/buy")} className="cursor-pointer ">
            Pricing
          </p>
          <button
            onClick={() => setShowLogin(true)}
            className="bg-zinc-800 text-white px-6 py-3 text-sm"
          >
            Login
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-2 sm:gap-5 md:gap-6">
          <p onClick={() => navigate("/")} className="cursor-pointer ">
            Home
          </p>
          <p onClick={() => navigate("/about")} className="cursor-pointer ">
            About
          </p>
          <button className="flex items-center gap-2 px-4 sm:px-6 py-2 bg-zinc-900 text-white hover:bg-zinc-700 transition-all duration-400">
            <p onClick={() => navigate("/buy")} className="">
              Credits left: <span className="font-normal">{credit}</span>
            </p>
          </button>
          <p className="text-lg max-sm:hidden">Hi, {user.name}</p>

          <div className="relative group border border-black p-1 rounded-full">
            <User2Icon className="size-6" />
            <div className="absolute hidden group-hover:block top-0 right-0 z-20 text-black pt-12 transition-all duration-200">
              <ul className="list-none bg-gray-100">
                <li
                  onClick={logOut}
                  className="px-4 py-2 border border-gray-600 cursor-pointer"
                >
                  Logout
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;

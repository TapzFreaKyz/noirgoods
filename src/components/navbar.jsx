import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="bg-black p-4 text-white">
      <ul className="flex justify-start space-x-8">
        <li className="font-bold text-lg">
          <Link to="/">
            Noir Goods
          </Link>
        </li>
        <li>
          <Link to="/" className="hover:underline">
            Home
          </Link>
        </li>
        {isLoggedIn ? (
          <>
            <li>
              <Link to="/cart" className="hover:underline">
                Cart
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="hover:underline bg-transparent border-none cursor-pointer text-white"
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <li>
            <Link to="/login" className="hover:underline">
              Login
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
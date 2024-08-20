import React, { useState } from "react";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaSearch, FaSignOutAlt } from 'react-icons/fa';
import { signOut as firebaseSignOut } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase.conf";

function Header(props) {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.netflix.isLoggedIn);
  const [showSearch, setShowSearch] = useState(false);

  const tabs = [
    { name: "Home", path: "/" },
    { name: "TV Shows", path: "/tv" },
    { name: "Movies", path: "/movies" },
    { name: "My List", path: "/mylist" },
  ];

  async function handleSignOut() {
    try {
      await firebaseSignOut(firebaseAuth);
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className={`d-flex justify-content-between align-items-center px-4 py-2 position-sticky top-0 z-sticky ${props.isScrolled ? 'bg-black' : 'bg-transparent'}`}>
      <img
        src={logo}
        alt="Logo"
        className="h-100"
        style={{ maxHeight: "50px" }}
      />
      {isLoggedIn ? (
        <div className="d-flex justify-content-between w-100 align-items-center">
          <span className="d-flex">
            {tabs.map((tab, ind) => (
              <Link
                to={tab.path}
                key={ind}
                className="px-2 text-white text-decoration-none"
              >
                {tab.name}
              </Link>
            ))}
          </span>
          <span className="d-flex align-items-center">
            <span className="me-3" onClick={() => setShowSearch(!showSearch)}>
              <FaSearch className="iconRed" />
            </span>
            <input
              className={`bg-white p-1 transition ${showSearch ? "visible" : "hidden"}`}
              type="text"
              placeholder="Search"
              name="search"
            />

            <span className="ms-3" onClick={handleSignOut}>
              <FaSignOutAlt className="iconRed" />
            </span>
          </span>
        </div>
      ) : (
        <button
          className="btn-main"
          onClick={() => navigate(props.login ? "/login" : "/signup")}
        >
          {props.login ? "Login" : "Sign In"}
        </button>
      )}
    </div>
  );
}

export default Header;

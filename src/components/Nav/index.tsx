import { NavLink } from "react-router-dom";
import { Logo } from "../../components/Layout";
import { useAuth } from "../AuthContext";
import { AuthContextType } from "../Interfaces";
import ProfileIcon from "../ProfileIcon";
import LogoutUser from "../Logout";
import LightDarkMode from "../LightDarkMode";
import { useState } from "react";

function Nav() {
  const { isLoggedIn, profileDetails, venueManager } =
    useAuth() as AuthContextType;

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="flex justify-between">
      <Logo />

      <button
        className="lg:hidden focus:outline-none right-0 top-0 p-4 z-50 dark:text-pink text-green absolute"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        {menuOpen ? (
          <svg
            className="fixed right-0 pt-0 mr-4"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m18 18l-6-6m0 0L6 6m6 6l6-6m-6 6l-6 6"
            />
          </svg>
        ) : (
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 17h14M5 12h14M5 7h14"
            ></path>
          </svg>
        )}
      </button>
      {/* "flex flex-row flex-wrap mx-auto dark:text-pink text-green" */}
      <ul
        className={`${
          menuOpen
            ? "flex flex-col right-0 top-0 z-40 backdrop-blur-lg dark:backdrop-blur-lg dark:bg-dark-green bg-white-pink dark:bg-opacity-80 bg-opacity-80 inset-1/3 h-full text-2xl fixed"
            : "hidden"
        } lg:flex lg:flex-row mx-auto dark:text-pink text-green`}
      >
        <li key={"home"} className="group m-1 pt-5">
          <NavLink
            to="/"
            className="mx-3 p-3 dark:text-pink text-green dark:hover:text-white-pink hover:bg-green dark:hover:bg-pink hover:text-white-pink"
          >
            {" "}
            Venues
          </NavLink>
        </li>
        {profileDetails && venueManager && isLoggedIn ? (
          <li key={"createvenue"} className="group m-1 pt-5">
            <NavLink
              to="/createvenue"
              className="mx-3 p-3 dark:text-pink text-green dark:hover:text-white-pink hover:bg-green dark:hover:bg-pink hover:text-white-pink"
            >
              {" "}
              Create venue
            </NavLink>
          </li>
        ) : null}
        <li key={"login"} className="group m-1 pt-5">
          {isLoggedIn ? (
            <LogoutUser />
          ) : (
            <NavLink
              to="/login"
              className="mx-3 p-3 dark:text-pink text-green dark:hover:text-white-pink hover:bg-green dark:hover:bg-pink hover:text-white-pink"
            >
              {" "}
              Login
            </NavLink>
          )}
        </li>
        {isLoggedIn ? <ProfileIcon /> : null}
        <LightDarkMode />
      </ul>
    </nav>
  );
}

export default Nav;

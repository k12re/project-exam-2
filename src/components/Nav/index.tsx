import { NavLink } from "react-router-dom";
import { Logo } from "../../components/Layout";
import { useAuth } from "../AuthContext";
import { AuthContextType } from "../Interfaces";
import ProfileIcon from "../ProfileIcon";
import LogoutUser from "../Logout";
import LightDarkMode from "../LightDarkMode";

function Nav() {
  const { isLoggedIn, profileDetails, venueManager } =
    useAuth() as AuthContextType;
  return (
    <nav className="flex justify-between ">
      <Logo />
      <ul className="flex flex-row flex-wrap mx-auto dark:text-pink text-green ">
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
      </ul>
      <LightDarkMode />
    </nav>
  );
}

export default Nav;

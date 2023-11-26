import { useNavigate } from "react-router-dom";
import { remove } from "../Storage";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { load } from "../Storage";
import { useAuth } from "../AuthContext";

// const myProfileDetails = load("profile");
// const myToken = load("accessToken");
// console.log(myProfileDetails);
// console.log(myToken);

function LogoutUser() {
  // const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    logout();

    // navigate("/");

    // remove("accessToken");
    // remove("profile");
    // setIsLoggedIn(false);
    // setProfileDetails(null);
  };

  return (
    <NavLink
      onClick={handleLogout}
      to="/"
      className="m-3 p-3 dark:text-pink text-green dark:hover:text-white-pink hover:bg-green dark:hover:bg-pink hover:text-white-pink"
    >
      Logout
    </NavLink>
  );
}

export default LogoutUser;

function ProfileIcon() {
  const [myProfileDetails, setMyProfileDetails] = useState(load("profile"));
  //   const [myToken, setMyToken] = useState(load("accessToken"));

  useEffect(() => {
    setMyProfileDetails(load("profile"));
    // setMyToken(load("accessToken"));
  }, [load("accessToken")]);

  return (
    <li key={"profiles"} className="group m-3 p-3 ">
      {myProfileDetails?.avatar ? (
        <NavLink to={`/profiles/${myProfileDetails.name}`}>
          <img
            src={myProfileDetails?.avatar}
            className="h-8 w-8 rounded-full object-cover"
            alt={myProfileDetails?.name}
          ></img>
        </NavLink>
      ) : (
        <NavLink to={`/profiles/${myProfileDetails?.name}`}>
          <svg
            className="rounded-full"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g fill="none" fill-rule="evenodd">
              <path d="M24 0v24H0V0h24ZM12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036c-.01-.003-.019 0-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.016-.018Zm.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01l-.184-.092Z" />
              <path
                fill="currentColor"
                d="M12 2c5.523 0 10 4.477 10 10a9.959 9.959 0 0 1-2.258 6.33l.02.022l-.132.112A9.978 9.978 0 0 1 12 22c-2.95 0-5.6-1.277-7.43-3.307l-.2-.23l-.132-.11l.02-.024A9.958 9.958 0 0 1 2 12C2 6.477 6.477 2 12 2Zm0 15c-1.86 0-3.541.592-4.793 1.405A7.965 7.965 0 0 0 12 20a7.965 7.965 0 0 0 4.793-1.595A8.897 8.897 0 0 0 12 17Zm0-13a8 8 0 0 0-6.258 12.984C7.363 15.821 9.575 15 12 15s4.637.821 6.258 1.984A8 8 0 0 0 12 4Zm0 2a4 4 0 1 1 0 8a4 4 0 0 1 0-8Zm0 2a2 2 0 1 0 0 4a2 2 0 0 0 0-4Z"
              />
            </g>
          </svg>
        </NavLink>
      )}
    </li>
  );
}

export { ProfileIcon };

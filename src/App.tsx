import { useEffect, useState } from "react";
import "./App.css";
import { Outlet, Link, Route, Routes, NavLink } from "react-router-dom";
import VenuePage from "./components/VenuePage";
import RegisterUserForm from "./components/RegisterUserForm";
import LoginUserForm from "./components/LoginUser";
import ProfilePage from "./components/ProfilePage";
import BookingPage from "./components/CreateBookingUser";
import GetProfiles from "./components/Profiles";
// import DefaultProfile from "../src/assets/profile-circle.svg";
import { load } from "./components/Storage";
import LogoutUser from "./components/Logout";
import { ProfileIcon } from "./components/Logout";
import CreateVenue from "./components/CreateVenueAdmin";
import EditVenue from "./components/EditVenueAdmin";
import Search from "./components/Search";

export const bookingsUrl: string = "/bookings";
export const venuesUrl: string = "/venues";
export const url: string = "https://api.noroff.dev/api/v1/holidaze";

const myProfileDetails = load("profile");
const myToken = load("accessToken");
console.log(myProfileDetails);
console.log(myToken);

export interface Venue {
  id: string;
  name: string;
  description: string;
  price: number;
  maxGuests: number;
  rating?: number;
  created: string;
  updated?: string;
  media?: string;
  meta?: {
    wifi: boolean;
    parking: boolean;
    breakfast: boolean;
    pets: boolean;
  };
  location?: {
    address?: string;
    city?: string;
    zip?: string;
    country?: string;
    continent?: string;
    lat?: number;
    lng?: number;
  };
  owner?: {
    avatar?: string;
    email: string;
    name: string;
  };
}

function GetVenues() {
  const [data, setData] = useState<Venue[]>([]);
  const [queryOffset, setQueryOffset] = useState(0);
  const [reachedLastPage, setReachedLastPage] = useState(false);
  const [searchResults, setSearchResults] = useState<Venue[]>([]);

  const offset = `?offset=${queryOffset}`;

  function addOffset() {
    if (!reachedLastPage) {
      setQueryOffset(queryOffset + 100);
    }
    window.scrollTo(0, 0);
  }

  function decreaseOffset() {
    setQueryOffset(Math.max(queryOffset - 100, 0));
    window.scrollTo(0, 0);
    setReachedLastPage(false);
  }

  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch(`${url}${venuesUrl}${offset}`);
        const json = await response.json();

        setData(json);
        if (json.length < 100) {
          setReachedLastPage(true);
        }
      } catch (error) {
        console.log(error);
      } finally {
        console.log(data);
      }
    }
    getData();
  }, [queryOffset]);

  // console.log(data);

  return (
    <>
      <div className="max-w-6xl mx-auto ">
        <span className="flex px-4 my-3 text-dark-green dark:text-white-pink">
          <Link to={`/`}>
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="currentColor"
                d="M21 20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.489a1 1 0 0 1 .386-.79l8-6.222a1 1 0 0 1 1.228 0l8 6.222a1 1 0 0 1 .386.79v10.51Z"
              />
              <title>Home icon</title>
            </svg>
          </Link>

          <h1 className="text-2xl font-bold px-4 dark:text-white-pink text-dark-green">
            Our venues
          </h1>
          <Search data={data} setSearchResults={setSearchResults} />
        </span>
        <ul className="flex flex-row flex-wrap justify-center m-4">
          {searchResults.length > 0
            ? searchResults.map((venue) => (
                <li
                  key={venue.id}
                  className="w-full md:w-1/2 lg:w-1/3 mx-auto ml-4 mr-4 mt-4 mb-4 rounded-2xl p-4 backdrop-blur-lg bg-black/30 inset-0 dark:text-white-pink text-dark-green border border-green"
                >
                  {/* {Array.isArray(venue.media) ? (
                  venue.media.map((imgUrl, index) => (
                    <img
                      className="h-72 w-full object-cover rounded-xl"
                      key={index}
                      src={imgUrl}
                      alt={venue.name}
                    />
                  ))
                ) : (
                  <img src={venue.media} alt={venue.name}  />
                )} */}
                  <img
                    src={venue.media}
                    alt={venue.name}
                    className="h-72 w-full object-cover rounded-xl"
                  />
                  <h3 className="text-xl font-bold">
                    {venue.name.substring(0, 36)}...
                  </h3>
                  <p>Max guests: {venue.maxGuests}</p>
                  <p className="break-words">
                    {venue.description.substring(0, 40)}...
                  </p>
                  <button className="btn-primary">
                    <Link to={`/venues/${venue.id}`}>Read more</Link>
                  </button>
                </li>
              ))
            : data.map((venue) => (
                <li
                  key={venue.id}
                  className="w-full md:w-1/2 lg:w-1/3 mx-auto ml-4 mr-4 mt-4 mb-4 rounded-2xl p-4 backdrop-blur-lg bg-black/30 inset-0 dark:text-white-pink text-dark-green border border-green"
                >
                  {/* {Array.isArray(venue.media) ? (
              venue.media.map((imgUrl, index) => (
                <img
                  className="h-72 w-full object-cover rounded-xl"
                  key={index}
                  src={imgUrl}
                  alt={venue.name}
                />
              ))
            ) : (
              <img src={venue.media} alt={venue.name}  />
            )} */}
                  <img
                    src={venue.media}
                    alt={venue.name}
                    className="h-72 w-full object-cover rounded-xl"
                  />
                  <h3 className="text-xl font-bold">
                    {venue.name.substring(0, 36)}...
                  </h3>
                  <p>Max guests: {venue.maxGuests}</p>
                  <p className="break-words">
                    {venue.description.substring(0, 40)}...
                  </p>
                  <button className="btn-primary">
                    <Link to={`/venues/${venue.id}`}>Read more</Link>
                  </button>
                </li>
              ))}
        </ul>
        <div className="flex justify-center space-x-4">
          <button
            className="btn-primary w-1/6"
            onClick={decreaseOffset}
            disabled={queryOffset === 0}
          >
            Previous results
          </button>
          <button
            className="btn-primary w-1/6"
            onClick={addOffset}
            disabled={reachedLastPage === true}
          >
            Next results
          </button>
        </div>
      </div>
    </>
  );
}

function Logo() {
  return (
    <Link to={"/"}>
      <h2 className="dark:text-pink text-green font-logo text-4xl font-bold m-3 p-3 w-40">
        Holidaze
      </h2>
    </Link>
  );
}

function Header() {
  return (
    <header>
      <Nav />
    </header>
  );
}

function LightDarkMode() {
  const [isChecked, setIsChecked] = useState(false);

  const handleSwitch = () => {
    setIsChecked((prev) => !prev);
  };

  const rootElement = document.getElementById("root");

  if (isChecked === true) {
    document.documentElement.classList.toggle("dark", isChecked);

    if (rootElement) {
      rootElement.style.backgroundImage =
        "url(../src/assets/background-dark.jpg)";
      rootElement.style.backgroundColor = "#022626";
      rootElement.style.backgroundBlendMode = "overlay";
    }
  } else if (rootElement && isChecked === false) {
    document.documentElement.classList.remove("dark");
    rootElement.style.backgroundImage =
      "url(../src/assets/background-dark.jpg)";
    rootElement.style.backgroundColor = "rgba(255, 246, 248, 0.9)";
    rootElement.style.backgroundBlendMode = "overlay";
  }

  return (
    <div className="flex p-3 m-3">
      <input
        id="lightdarkmode"
        type="checkbox"
        className="relative peer appearance-none w-12 h-6 border-2 dark:border-pink border-green rounded-3xl checked:bg-white-pink dark:checked:bg-white-pink active:bg-white-pink dark:active:bg-white-pink hover:bg-white-pink dark:hover:bg-white-pink focus:bg-white-pink dark:focus:bg-white-pink focus:ring-green dark:focus:ring-pink"
        checked={isChecked}
        onChange={handleSwitch}
      ></input>
      <label
        htmlFor="lightdarkmode"
        className="ps-2 cursor-pointer w-24 text-green dark:text-pink"
      >
        {isChecked ? "Dark mode" : "Light mode "}
      </label>
      <svg
        className={`absolute w-6 h-6 p-1 transition-transform ${
          isChecked ? "translate-x-6" : "-translate-x-0"
        } `}
        width="22"
        height="22"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill={isChecked ? "#D97E96" : "#025E73"}
          d="M12 22q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Z"
        />
      </svg>
    </div>
  );
}

function Nav() {
  return (
    <nav className="flex justify-between ">
      <Logo />
      <ul className="flex flex-row flex-wrap mx-auto dark:text-pink text-green ">
        <li key={"home"} className="group m-1 pt-5">
          <NavLink
            to="/"
            className="m-3 p-3 dark:text-pink text-green dark:hover:text-white-pink hover:bg-green dark:hover:bg-pink hover:text-white-pink"
          >
            {" "}
            Venues
          </NavLink>
        </li>
        <li key={"bookings"} className="group m-1 pt-5">
          <NavLink
            to="/bookings"
            className="m-3 p-3 dark:text-pink text-green dark:hover:text-white-pink hover:bg-green dark:hover:bg-pink hover:text-white-pink"
          >
            {" "}
            My bookings
          </NavLink>
        </li>
        <li key={"createvenue"} className="group m-1 pt-5">
          <NavLink
            to="/createvenue"
            className="m-3 p-3 dark:text-pink text-green dark:hover:text-white-pink hover:bg-green dark:hover:bg-pink hover:text-white-pink"
          >
            {" "}
            Create venue
          </NavLink>
        </li>
        <li key={"profiles"} className="group m-1 pt-5">
          <NavLink
            to="/profiles"
            className="m-3 p-3 dark:text-pink text-green dark:hover:text-white-pink hover:bg-green dark:hover:bg-pink hover:text-white-pink"
          >
            {" "}
            Profiles
          </NavLink>
        </li>
        <li key={"login"} className="group m-1 pt-5">
          {!myToken ? (
            <NavLink
              to="/login"
              className="m-3 p-3 dark:text-pink text-green dark:hover:text-white-pink hover:bg-green dark:hover:bg-pink hover:text-white-pink"
            >
              {" "}
              Login
            </NavLink>
          ) : (
            <LogoutUser />
          )}
        </li>
        <ProfileIcon />
        {/* <li key={"profiles"} className="group m-3 p-3">
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
        </li> */}
      </ul>
      <LightDarkMode />
    </nav>
  );
}

function Footer() {
  return (
    <footer className="text-white-pink text-center backdrop-blur-lg backdrop-brightness-90 bg-white/30 p-6">
      Ken Thore Bjerke Bøeng 2023
    </footer>
  );
}

function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<GetVenues />}></Route>
            <Route path="venues/:id" element={<VenuePage />}></Route>
            <Route path="bookings" element={<BookingPage />}></Route>
            <Route path="createvenue" element={<CreateVenue />}></Route>
            <Route path="editvenue/:id" element={<EditVenue />}></Route>
            <Route path="profiles" element={<GetProfiles />}></Route>
            <Route path="profiles/:name" element={<ProfilePage />}></Route>
            <Route path="register" element={<RegisterUserForm />}></Route>
            <Route path="login" element={<LoginUserForm />}></Route>
          </Route>
          {/* <h1 className="text-2xl font-bold underline">Venues</h1> */}
        </Routes>
      </div>
    </>
  );
}

export default App;

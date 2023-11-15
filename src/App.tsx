import HomeIcon from "../src/assets/home-fill.svg";
import { useEffect, useState } from "react";
import "./App.css";
import { Outlet, Link, Route, Routes, NavLink } from "react-router-dom";
import VenuePage from "./components/VenuePage";
import RegisterUserForm from "./components/RegisterUserForm";
import LoginUserForm from "./components/LoginUser";
import ProfilePage from "./components/ProfilePage";
import BookingPage from "./components/CreateBookingUser";
import GetProfiles from "./components/Profiles";
import DefaultProfile from "../src/assets/profile-circle.svg";
import { load } from "./components/Storage";

export const venuesUrl: string = "/venues";
export const url: string = "https://api.noroff.dev/api/v1/holidaze";

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

  console.log(data);

  return (
    <>
      <div className="max-w-md mx-auto">
        <span className="flex px-4 my-3">
          <Link to={`/`}>
            <img src={HomeIcon} alt="Home icon" className="h-8 w-8" />
          </Link>
          <h1 className="text-2xl font-bold px-4 text-white-pink">
            Our venues
          </h1>
        </span>
        <ul>
          {data.map((venue) => (
            <div key={venue.id}>
              <li className="max-w-md mx-auto mb-4 rounded-2xl p-4 backdrop-blur-lg bg-black/30 inset-0 dark:text-white-pink text-dark-green border border-green">
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
                <h3 className="text-xl font-bold">{venue.name}</h3>
                <p>Max guests: {venue.maxGuests}</p>
                <p className="break-all">{venue.description}</p>
                <button className="btn-primary">
                  <Link to={`/venues/${venue.id}`}>Read more</Link>
                </button>
              </li>
            </div>
          ))}
        </ul>
        <div>
          <button onClick={decreaseOffset} disabled={queryOffset === 0}>
            Previous results
          </button>
          <button onClick={addOffset} disabled={reachedLastPage === true}>
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
        className="relative peer appearance-none w-12 h-6 border-2 dark:border-pink border-green rounded-3xl"
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
      <ul className="flex flex-row flex-wrap mx-auto">
        <li key={"home"} className="group m-1 pt-5 active:bg-pink ">
          <NavLink
            to="/"
            className="m-3 p-3 dark:text-pink text-green dark:hover:text-white-pink hover:bg-green dark:hover:bg-pink hover:text-white-pink"
          >
            {" "}
            Venues
          </NavLink>
        </li>
        <li key={"bookings"} className="group m-1 pt-5 active:bg-pink">
          <NavLink
            to="/bookings"
            className="m-3 p-3 dark:text-pink text-green dark:hover:text-white-pink hover:bg-green dark:hover:bg-pink hover:text-white-pink"
          >
            {" "}
            Bookings
          </NavLink>
        </li>
        <li key={"profiles"} className="group m-1 pt-5 active:bg-pink">
          <NavLink
            to="/profiles"
            className="m-3 p-3 dark:text-pink text-green dark:hover:text-white-pink hover:bg-green dark:hover:bg-pink hover:text-white-pink"
          >
            {" "}
            Profiles
          </NavLink>
        </li>
        <li key={"register"} className="group m-1 pt-5 active:bg-pink">
          <NavLink
            to="/register"
            className="m-3 p-3 dark:text-pink text-green dark:hover:text-white-pink hover:bg-green dark:hover:bg-pink hover:text-white-pink"
          >
            {" "}
            Login
          </NavLink>
        </li>
        <li key={"profiles"} className="group m-3 p-3 active:bg-pink">
          <NavLink to={`/profiles/${myProfileDetails.name}`} className="">
            <img
              src={myProfileDetails.avatar || DefaultProfile}
              className="h-8 w-8"
            ></img>
          </NavLink>
        </li>
      </ul>
      <LightDarkMode />
    </nav>
  );
}

function Footer() {
  return (
    <footer className="text-white-pink backdrop-blur-lg backdrop-brightness-90 bg-white/30 p-6">
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

const myProfileDetails = load("profile");
console.log(myProfileDetails);

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<GetVenues />}></Route>
            <Route path="venues/:id" element={<VenuePage />}></Route>
            <Route path="bookings" element={<BookingPage />}></Route>
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

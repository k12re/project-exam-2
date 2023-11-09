import HomeIcon from "../src/assets/home-fill.svg";
import { useEffect, useState } from "react";
import "./App.css";
import { Outlet, Link, Route, Routes, NavLink } from "react-router-dom";
import VenuePage from "./components/VenuePage";
import RegisterUserForm from "./components/RegisterUserForm";
import LoginUserForm from "./components/LoginUser";
import ProfilePage from "./components/EditProfile";
import BookingPage from "./components/CreateBookingUser";

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
  media?: string[];
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
}

function GetVenues() {
  const [data, setData] = useState<Venue[]>([]);
  const [totalResults, setTotalResults] = useState(0);
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

  console.log(queryOffset);
  console.log(totalResults);

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

  return (
    <>
      <div className="max-w-md mx-auto">
        <span className="flex px-4 my-3">
          <Link to={`/`}>
            <img src={HomeIcon} alt="Home icon" className="h-8 w-8" />
          </Link>
          <h1 className="text-2xl font-bold px-4">Our venues</h1>
        </span>
        <ul>
          {data.map((venue) => (
            <div key={venue.id}>
              <li className="max-w-md mx-auto mb-4 rounded-2xl p-4 bg-white-pink">
                {Array.isArray(venue.media) ? (
                  venue.media.map((imgUrl, index) => (
                    <img
                      className="h-72 w-full object-cover rounded-xl"
                      key={index}
                      src={imgUrl}
                      alt={venue.name}
                    />
                  ))
                ) : (
                  <img src={venue.media} alt={venue.name} />
                )}
                <h3 className="text-xl font-bold">{venue.name}</h3>
                <p>Max guests: {venue.maxGuests}</p>
                <p>{venue.description}</p>
                <button className="bg-light-pink hover:bg-pink w-full py-3 my-3 rounded-xl font-bold">
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
  return <h2 className="font-bold m-3 p-3 w-40">Holidaze</h2>;
}

function Header() {
  return (
    <header>
      <Nav />
    </header>
  );
}

//Under Construction
function LightDarkMode() {
  const [isChecked, setIsChecked] = useState(false);

  const handleSwitch = () => {
    setIsChecked((prev) => !prev);
  };

  return (
    <div className="flex p-3 m-3">
      <input
        id="lightdarkmode"
        type="checkbox"
        className="relative peer appearance-none w-12 h-6 border-2 border-pink rounded-3xl checked:bg-light-pink"
        checked={isChecked}
        onChange={handleSwitch}
      ></input>
      <label htmlFor="lightdarkmode" className="ps-2 cursor-pointer w-24">
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
          fill="#ec4899"
          d="M12 22q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Z"
        />
      </svg>
    </div>
  );
}
//Under Construction

function Nav() {
  return (
    <nav className="flex justify-between bg-white-pink">
      <Logo />
      <ul className="flex flex-row flex-wrap mx-auto">
        <li key={"home"} className="m-3 p-3 active:bg-pink hover:bg-light-pink">
          <NavLink to="/"> Venues</NavLink>
        </li>
        <li
          key={"bookings"}
          className="m-3 p-3 active:bg-pink hover:bg-light-pink"
        >
          <NavLink to="/bookings"> Bookings</NavLink>
        </li>
        <li
          key={"profile"}
          className="m-3 p-3 active:bg-pink hover:bg-light-pink"
        >
          <NavLink to="/profile"> Profile</NavLink>
        </li>
        <li
          key={"register"}
          className="m-3 p-3 active:bg-pink hover:bg-light-pink"
        >
          <NavLink to="/register"> Login</NavLink>
        </li>
      </ul>
      <LightDarkMode />
    </nav>
  );
}

function Footer() {
  return <footer>Ken Thore Bjerke Bøeng 2023</footer>;
}

function Layout() {
  return (
    <div>
      <Header />
      <Outlet />
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
            <Route path="profile" element={<ProfilePage />}></Route>
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

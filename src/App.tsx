import { useEffect, useState } from "react";
import "./App.css";
import { Outlet, Link, Route, Routes } from "react-router-dom";
import VenuePage from "./components/VenuePage";
import RegisterUserForm from "./components/RegisterUserForm";
import LoginUserForm from "./components/LoginUser";
import ProfilePage from "./components/ProfilePage";
import GetProfiles from "./components/Profiles";
import { load } from "./components/Storage";
// import LogoutUser from "./components/Logout";
// import { ProfileIcon } from "./components/Logout";
import CreateVenue from "./components/CreateVenueAdmin";
import EditVenue from "./components/EditVenueAdmin";
import Search from "./components/Search";
import { Venue } from "./components/Interfaces";
// import LightDarkMode from "./components/LightDarkMode";
import Nav from "./components/Nav";
import { AuthProvider } from "./components/AuthContext";

export const bookingsUrl: string = "/bookings";
export const venuesUrl: string = "/venues";
export const url: string = "https://api.noroff.dev/api/v1/holidaze";

export const myProfileDetails = load("profile");
export const myToken = load("accessToken");
// console.log(myProfileDetails.venueManager);
// console.log(myToken);

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
                  {Array.isArray(venue.media) && venue.media.length > 0 ? (
                    <img
                      className="h-72 w-full object-cover rounded-xl"
                      src={venue.media[0]}
                      alt={venue.name}
                    />
                  ) : venue.media &&
                    typeof venue.media === "string" &&
                    venue.media.trim() !== "" ? (
                    <img
                      src={venue.media.split(",")[0]}
                      alt={venue.name}
                      className="h-72 w-full object-cover rounded-xl"
                    />
                  ) : (
                    <img
                      src="https://source.unsplash.com/1600x900/?hotel"
                      alt="Default Image"
                      className="h-72 w-full object-cover rounded-xl"
                    />
                  )}
                  <h3 className="text-xl font-bold truncate">
                    {venue.name.substring(0, 36)}...
                  </h3>
                  <p>Max guests: {venue.maxGuests}</p>
                  <p className="truncate">
                    {venue.description.substring(0, 40)}
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
                  {Array.isArray(venue.media) && venue.media.length > 0 ? (
                    <img
                      className="h-72 w-full object-cover rounded-xl"
                      src={venue.media[0]}
                      alt={venue.name}
                    />
                  ) : venue.media &&
                    typeof venue.media === "string" &&
                    venue.media.trim() !== "" ? (
                    <img
                      src={venue.media.split(",")[0]}
                      alt={venue.name}
                      className="h-72 w-full object-cover rounded-xl"
                    />
                  ) : (
                    <img
                      src="https://source.unsplash.com/1600x900/?hotel"
                      alt="Default Image"
                      className="h-72 w-full object-cover rounded-xl"
                    />
                  )}
                  <h3 className="text-xl font-bold truncate">
                    {venue.name.substring(0, 36)}...
                  </h3>
                  <p>Max guests: {venue.maxGuests}</p>
                  <p className="truncate">
                    {venue.description.substring(0, 40)}
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

export function Logo() {
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
      <AuthProvider>
        <div>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<GetVenues />}></Route>
              <Route path="venues/:id" element={<VenuePage />}></Route>
              {/* <Route path="bookings" element={<BookingPage />}></Route> */}
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
      </AuthProvider>
    </>
  );
}

export default App;

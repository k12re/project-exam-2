import { useEffect, useState } from "react";
import "./App.css";
import { Outlet, Link, Route, Routes } from "react-router-dom";

export const venuesUrl: string = "/venues";
export const url: string = "https://api.noroff.dev/api/v1/holidaze";

interface Venue {
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

  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch(`${url}${venuesUrl}`);
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.log(error);
      } finally {
        console.log(data);
      }
    }
    getData();
  }, []);

  return (
    <>
      <h2>Our venues:</h2>
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
              <button className="bg-light-pink w-full py-3 my-4 rounded-xl font-bold">
                Read more
              </button>
            </li>
          </div>
        ))}
      </ul>
    </>
  );
}

function Logo() {
  return <h2 className="font-bold">Holidaze</h2>;
}

function Header() {
  return (
    <header>
      <Logo />
      <Nav />
    </header>
  );
}

function Nav() {
  return (
    <nav>
      <ul>
        <li key={"home"}>
          <Link to="/"> Venues</Link>
        </li>
        <li key={"bookings"}>
          <Link to="/"> Bookings</Link>
        </li>
        <li key={"profile"}>
          <Link to="/"> Profile</Link>
        </li>
        <li key={"logout"}>
          <Link to="/"> Logout</Link>
        </li>
      </ul>
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
            <Route path="bookings"></Route>
            <Route path="profile"></Route>
            <Route path="logout"></Route>
          </Route>
          {/* <h1 className="text-2xl font-bold underline">Venues</h1> */}
        </Routes>
      </div>
      <GetVenues />
    </>
  );
}

export default App;

import DefaultProfile from "../../assets/profile-circle.svg";
import { useEffect, useState } from "react";
import { url, venuesUrl } from "../../components/Constants";
import { useParams, Link } from "react-router-dom";
import { AuthContextType, Venue } from "../Interfaces";
import MyCalendar from "../MyCalendar";
import "react-calendar/dist/Calendar.css";
import { useAuth } from "../AuthContext";

function VenuePage() {
  const [venue, setVenue] = useState<Venue | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  let { id } = useParams();
  const { isLoggedIn } = useAuth() as AuthContextType;

  useEffect(() => {
    async function getData(url: string) {
      try {
        setIsLoading(true);
        const response = await fetch(url);
        const json = await response.json();
        setVenue(json);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    getData(`${url}${venuesUrl}/${id}/?_owner=true&_bookings=true`);
  }, [id]);

  if (isLoading || venue === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto">
      <span className="flex px-4 my-3 text-dark-green dark:text-white-pink">
        <Link to={`/`}>
          <svg
            width="32"
            height="36"
            viewBox="0 0 256 512"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="currentColor"
              d="m31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z"
            />
          </svg>
        </Link>
        <h1 className="text-2xl font-bold px-4 dark:text-white-pink text-dark-green">
          Venue
        </h1>
      </span>
      {/* <div className="flex flex-row "> */}
      <div className="m-4">
        <div className="grid grid-cols-3 gap-4 mx-auto mb-4 rounded-2xl p-4 backdrop-blur-lg bg-black/30 inset-0 dark:text-white-pink text-dark-green border border-green">
          {/* LEFT */}
          {/* <div className="flex flex-col"> */}
          <div className="row-start-1 row-span-1 col-span-3 md:col-start-1 md:col-span-5 md:row-span-3 lg:col-span-1 lg:row-span-3 ">
            <div className="h-full">
              <img
                className="object-cover rounded-xl h-96 w-full mb-4"
                src={
                  (venue.media && venue.media[0]) ||
                  "https://source.unsplash.com/1600x900/?hotel"
                }
                alt={venue.name}
              />
              {Array.isArray(venue.media) && venue.media.length > 1 && (
                <div className="flex flex-row flex-wrap gap-4 ">
                  {venue.media &&
                    (venue.media as string[])
                      .slice(1)
                      .map((imgUrl: string, index: number) => (
                        <img
                          className="h-24 object-cover rounded-xl flex-grow"
                          key={index}
                          src={imgUrl}
                          alt={venue.name}
                        />
                      ))}
                </div>
              )}
            </div>
          </div>
          {/* MIDDLE */}
          {/* <div className="flex flex-col"> */}
          <div className="row-start-2 col-span-3 row-span-1 md:col-start-1 md:col-span-2 md:row-span-3 lg:col-start-2 lg:row-span-1 lg:col-span-1">
            <div className=" mb-4">
              <h3 className="text-xl font-bold">Venue name: {venue.name}</h3>
              <p className="break-words max-h-56 overflow-auto">
                Description: {venue.description}
              </p>
            </div>
            <div className="mb-4">
              {isLoggedIn ? (
                <Link to={`/profiles/${venue.owner?.name}`}>
                  <div className="flex flex-row">
                    {!venue.owner?.avatar || venue.owner?.avatar === null ? (
                      <img
                        className="h-6 w-6 rounded-full flex-none"
                        src={DefaultProfile}
                      />
                    ) : (
                      <img
                        className="h-6 w-6 rounded-full"
                        src={venue.owner && venue.owner.avatar}
                      />
                    )}
                    <p className="flex-auto">
                      Owner: {venue.owner && venue.owner.name}
                    </p>
                    <p className="flex-auto">
                      Email: {venue.owner && venue.owner.email}
                    </p>
                  </div>
                </Link>
              ) : null}
            </div>
            <div className="mb-4">
              <h2 className="text-l font-bold">Location:</h2>
              <p>Country: {venue.location?.country}</p>
              <p>City: {venue.location?.city}</p>
              <p>Address: {venue.location?.address}</p>
              <p>Continent: {venue.location?.continent}</p>
            </div>
          </div>
          {/* RIGHT */}
          {/* <div className="flex flex-col"> */}
          <div className="row-start-3 col-span-3 row-span-1 md:col-start-3 md:row-span-3 lg:col-start-3 lg:row-span-3">
            <div className="flex justify-between">
              <div className=" mb-4">
                <h2 className="text-l font-bold">Details:</h2>
                <p>Max guests: {venue.maxGuests}</p>
                <p>Price: {venue.price}</p>
                <p>Rating: {venue.rating}</p>
              </div>
              <div className="mb-4">
                <h2 className="text-l font-bold">Includes:</h2>
                <p>Dogs: Icon</p>
                <p>Parking: Icon</p>
                <p>Wifi: Icon</p>
                <p>Breakfast: Icon</p>
              </div>
            </div>
            <div className="col-start-1 row-start-3 md:row-start-2 md:row-span-1">
              <MyCalendar />
            </div>
          </div>
        </div>
      </div>
      <h3 className="text-xl font-bold px-4 text-dark-green dark:text-white-pink mb-4 ml-4">
        Bookings:
      </h3>
      <ul className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 auto-cols-auto m-4">
        {venue.bookings &&
          venue.bookings.map((bookings) => (
            <li
              key={bookings.id}
              className="w-full mx-auto rounded-2xl p-5 backdrop-blur-lg bg-black/30 inset-0 dark:text-white-pink text-dark-green border border-green"
            >
              {/* <h2 className="font-bold">{bookings.venue.name}</h2> */}
              <p className="font-bold">Booked from:</p>
              <p>{bookings.dateFrom.substring(0, 10)}</p>
              <p className="font-bold">Booked to:</p>
              <p>{bookings.dateTo.substring(0, 10)}</p>
              <p className="font-bold">Number of guests: </p>
              <p>{bookings.guests}</p>
              <p className="text-xs ">Id: {bookings.id}</p>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default VenuePage;

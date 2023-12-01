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

  console.log(venue.meta?.breakfast);

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
      <div className="m-4">
        <div className="grid grid-cols-3 gap-4 mx-auto mb-4 rounded-2xl p-4 backdrop-blur-lg bg-black/30 inset-0 dark:text-white-pink text-dark-green border border-green">
          {/* LEFT */}
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
                    <p className="flex-auto ml-2">
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
                <span className="flex items-center">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="currentColor"
                      d="M11.9 8.4c1.3 0 2.1-1.9 2.1-3.1c0-1-.5-2.2-1.5-2.2c-1.3 0-2.1 1.9-2.1 3.1c0 1 .5 2.2 1.5 2.2zm-3.8 0c1 0 1.5-1.2 1.5-2.2C9.6 4.9 8.8 3 7.5 3C6.5 3 6 4.2 6 5.2c-.1 1.3.7 3.2 2.1 3.2zm7.4-1c-1.3 0-2.2 1.8-2.2 3.1c0 .9.4 1.8 1.3 1.8c1.3 0 2.2-1.8 2.2-3.1c0-.9-.5-1.8-1.3-1.8zm-8.7 3.1c0-1.3-1-3.1-2.2-3.1c-.9 0-1.3.9-1.3 1.8c0 1.3 1 3.1 2.2 3.1c.9 0 1.3-.9 1.3-1.8zm3.2-.2c-2 0-4.7 3.2-4.7 5.4c0 1 .7 1.3 1.5 1.3c1.2 0 2.1-.8 3.2-.8c1 0 1.9.8 3 .8c.8 0 1.7-.2 1.7-1.3c0-2.2-2.7-5.4-4.7-5.4z"
                    />
                  </svg>
                  <p className="pl-2">
                    Pets allowed: {venue.meta && venue.meta.pets ? "Yes" : "No"}
                  </p>
                </span>
                <span className="flex items-center">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="currentColor"
                      d="M13.2 11H10V7h3.2a2 2 0 0 1 2 2a2 2 0 0 1-2 2M13 3H6v18h4v-6h3a6 6 0 0 0 6-6c0-3.32-2.69-6-6-6Z"
                    />
                  </svg>
                  <p className="pl-2">
                    Parking: {venue.meta && venue.meta.parking ? "Yes" : "No"}
                  </p>
                </span>
                <span className="flex items-center">
                  <svg
                    width="20"
                    height="16"
                    viewBox="0 0 640 512"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="currentColor"
                      d="M634.91 154.88C457.74-8.99 182.19-8.93 5.09 154.88c-6.66 6.16-6.79 16.59-.35 22.98l34.24 33.97c6.14 6.1 16.02 6.23 22.4.38c145.92-133.68 371.3-133.71 517.25 0c6.38 5.85 16.26 5.71 22.4-.38l34.24-33.97c6.43-6.39 6.3-16.82-.36-22.98zM320 352c-35.35 0-64 28.65-64 64s28.65 64 64 64s64-28.65 64-64s-28.65-64-64-64zm202.67-83.59c-115.26-101.93-290.21-101.82-405.34 0c-6.9 6.1-7.12 16.69-.57 23.15l34.44 33.99c6 5.92 15.66 6.32 22.05.8c83.95-72.57 209.74-72.41 293.49 0c6.39 5.52 16.05 5.13 22.05-.8l34.44-33.99c6.56-6.46 6.33-17.06-.56-23.15z"
                    />
                  </svg>
                  <p className="pl-2">
                    Wifi: {venue.meta && venue.meta.wifi ? "Yes" : "No"}
                  </p>
                </span>
                <span className="flex items-center">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 2048 2048"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="currentColor"
                      d="M1408 592q-26 0-45-19t-19-45q0-51 19-98t56-83l79-80q38-38 38-91q0-26 19-45t45-19q26 0 45 19t19 45q0 51-19 98t-56 83l-79 80q-38 38-38 91q0 26-19 45t-45 19zm-384 0q-26 0-45-19t-19-45q0-51 19-98t56-83l79-80q38-38 38-91q0-26 19-45t45-19q26 0 45 19t19 45q0 51-19 98t-56 83l-79 80q-38 38-38 91q0 26-19 45t-45 19zm832 176q40 0 75 15t61 41t41 61t15 75v384q0 40-15 75t-41 61t-61 41t-75 15h-57q-2 7-3 13t-4 12v39q0 66-25 124t-69 102t-102 69t-124 25h-384q-78 0-144-35t-110-93H334q-66 0-124-25t-102-68t-69-102t-25-125v-64h256q0-79 30-149t83-122t122-83t149-30q30 0 58 5t56 14V640h1024v128h64zM654 1152q-53 0-99 20t-82 55t-55 81t-20 100h370v-228q-26-13-54-20t-60-8zm-320 512h441q-7-29-7-64v-64H153q10 28 28 51t41 41t52 26t60 10zm463 67v1l1 2v-1l-1-2zm867-131V768H896v832q0 40 15 75t41 61t61 41t75 15h384q40 0 75-15t61-41t41-61t15-75zm256-256V960q0-26-19-45t-45-19h-64v512h64q26 0 45-19t19-45z"
                    />
                  </svg>
                  <p className="pl-2">
                    Breakfast:{" "}
                    {venue.meta && venue.meta.breakfast ? "Yes" : "No"}
                  </p>
                </span>
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

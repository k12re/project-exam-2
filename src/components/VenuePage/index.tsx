import LightArrow from "../../assets/light-left.svg";
import DefaultProfile from "../../assets/profile-circle.svg";
import { useEffect, useState } from "react";
import { url, venuesUrl } from "../../App";
import { useParams, Link } from "react-router-dom";
import { Venue } from "../../App";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function MyCalendar() {
  const [bookings, setBookings] = useState([]);
  const [value, onChange] = useState(new Date());

  let { id } = useParams();

  useEffect(() => {
    const fetchDates = async () => {
      try {
        const response = await fetch(
          `${url}${venuesUrl}/${id}/?_owner=true&_bookings=true`
        );
        const data = await response.json();
        setBookings(data.bookings);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDates();
  }, []);

  console.log(bookings);

  function getDates(bookings) {
    return bookings.map((booking) => ({
      from: new Date(booking.dateFrom),
      to: new Date(booking.dateTo),
    }));
  }
  const dateRanges = getDates(bookings);

  const tileClassName = ({ date }) => {
    // const dateString = date.toISOString().split("T")[0];

    for (const range of dateRanges) {
      if (date >= range.from && date <= range.to) {
        console.log(dateRanges);
        return "unavailable-date";
      }
    }

    return "available-date";
  };

  return (
    <div>
      <Calendar
        className="rounded-xl green w-full"
        onChange={onChange}
        value={value}
        tileClassName={tileClassName}
      />
    </div>
  );
}

function VenuePage() {
  const [venue, setVenue] = useState<Venue | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  let { id } = useParams();

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
    <div className="max-w-6xl mx-auto ">
      <span className="flex px-4 my-3">
        <Link to={`/`}>
          <img src={LightArrow} alt="Back arrow" className="h-10 w-10 " />
        </Link>
        <h1 className="text-2xl font-bold px-4 dark:text-white-pink text-dark-green">
          Venue
        </h1>
      </span>
      {/* <div className="flex flex-row "> */}
      <div className="">
        <div className="grid grid-rows-1 md:grid-rows-3 grid-cols-3 grid-flow-col gap-4 mx-auto mb-4 rounded-2xl p-4 backdrop-blur-lg bg-black/30 inset-0 dark:text-white-pink text-dark-green border border-green">
          {/* LEFT */}
          {/* <div className="flex flex-col"> */}
          <div className="row-start-1 row-span-1 col-span-3 md:col-start-1 md:row-span-4 md:col-span-1">
            <div className="h-full">
              <img
                className="object-cover rounded-xl h-96 w-full mb-4"
                src={venue.media[0]}
                alt={venue.name}
              />
              <div className="flex flex-row flex-wrap gap-4 ">
                {venue.media?.slice(1).map((imgUrl, index) => (
                  <img
                    className="h-24 object-cover rounded-xl flex-grow"
                    key={index}
                    src={imgUrl}
                    alt={venue.name}
                  />
                ))}
              </div>
            </div>
          </div>
          {/* MIDDLE */}
          {/* <div className="flex flex-col"> */}
          <div className="row-start-2 row-span-1 md:col-start-2 md:row-span-1">
            <h3 className="text-xl font-bold">Venue name: {venue.name}</h3>
            <p className="break-all max-h-48 overflow-auto mb-8">
              Description: {venue.description}
            </p>
            <p>Max guests: {venue.maxGuests}</p>
            <p>Price: {venue.price}</p>
            <p>Rating: {venue.rating}</p>
          </div>
          <div className="col-start-3 row-start-2 row-span-1 md:col-start-2 md:row-span-3 md:row-start-2">
            <h2 className="text-l font-bold">Location:</h2>
            <p>Country: {venue.location?.country}</p>
            <p>City: {venue.location?.city}</p>
            <p>Address: {venue.location?.address}</p>
            <p>Continent: {venue.location?.continent}</p>
          </div>
          <div className="col-start-3 row-start-2 row-span-1 md:col-start-2 md:row-start-3 md:row-span-1">
            <Link to={`/profiles/${venue.owner?.name}`}>
              <div className="flex flex-row">
                {(venue.owner.avatar === "" || venue.owner.avatar === null) |
                null ? (
                  <img
                    className="h-6 w-6 rounded-full flex-none"
                    src={DefaultProfile}
                  />
                ) : (
                  <img
                    className="h-6 w-6 rounded-full"
                    src={venue.owner.avatar}
                  />
                )}
                <p className="flex-auto">Owner: {venue.owner.name}</p>
                <p className="flex-auto">Email: {venue.owner.email}</p>
              </div>
            </Link>
          </div>
          {/* RIGHT */}
          {/* <div className="flex flex-col"> */}
          <div className="row-start-4 col-span-4 md:col-start-3 md:row-span-3">
            <h2 className="text-l font-bold">Includes:</h2>
            <p>Dogs: Icon</p>
            <p>Parking: Icon</p>
            <p>Wifi: Icon</p>
            <p>Breakfast: Icon</p>

            <MyCalendar />
            <button className="btn-primary mt-8">
              See availability
              {/* <Link to={`/`}>See availability</Link> */}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VenuePage;

import LightArrow from "../../assets/light-left.svg";
import DefaultProfile from "../../assets/profile-circle.svg";
import { useEffect, useState } from "react";
import { url, venuesUrl, bookingsUrl } from "../../App";
import { useParams, Link } from "react-router-dom";
import { Venue } from "../../App";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { AuthFetch } from "../AuthFetch";

function MyCalendar() {
  const [bookings, setBookings] = useState([]);
  const [selectedDate, setSelectedDate] = useState([]);
  const [numberOfGuests, setNumberOfGuests] = useState(0);
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

  function getDates(bookings) {
    return bookings.map((booking) => ({
      from: new Date(booking.dateFrom),
      to: new Date(booking.dateTo),
    }));
  }
  const dateRanges = getDates(bookings);

  const tileClassName = ({ date }) => {
    const isBooked = dateRanges.some(
      (range) => date >= range.from && date <= range.to
    );

    const isSelected = selectedDate.some(
      (selectedDate) => selectedDate.getDate() === date.getDate()
    );

    if (isBooked) {
      return "unavailable-date";
    } else if (isSelected) {
      return "selected-date";
    } else {
      return "available-date";
    }
  };

  const setDates = (selectedRange) => {
    const { from, to } = selectedRange;

    const fromDate = new Date(from);
    const toDate = new Date(to);

    const datesToSend = [];
    let currentDate = new Date(fromDate);

    while (currentDate <= toDate) {
      datesToSend.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    // const localDates = datesToSend.map((date) => new Date(date.toLocaleDateString))

    setSelectedDate(datesToSend);

    console.log("Selected date", selectedRange);
    console.log("Dates to send", datesToSend);

    console.log(datesToSend);
    return datesToSend;
  };

  const handleDateChange = (date) => {
    setSelectedDate((prevDate) => {
      if (prevDate.length === 0 || prevDate.length === 1) {
        return [...prevDate, date];
      }

      return [date];
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const bookingData = {
      dateFrom: selectedDate[0].toDateString(),
      dateTo: selectedDate[1].toDateString(),

      guests: Number(numberOfGuests),
      venueId: id,
    };

    try {
      const response = await AuthFetch(`${url}${bookingsUrl}`, {
        method: "POST",
        body: JSON.stringify(bookingData),
      });
      console.log(bookingData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Calendar
        className="rounded-xl green w-full mb-4"
        onChange={handleDateChange}
        value={value}
        tileClassName={tileClassName}
      />
      <form onSubmit={handleSubmit}>
        <label htmlFor="numberOfGuests" className="block">
          <input
            placeholder="No of guests..."
            type="number"
            id="numberOfGuests"
            name="guests"
            onChange={(event) =>
              setNumberOfGuests(parseInt(event.target.value, 10))
            }
            className="mt-2 mb-2 mx-auto block w-full bg-white-pink border border-white-pink rounded-md focus:outline-none focus:border-pink text-dark-green"
          />
        </label>
        <button type="submit" className="btn-primary">
          Book dates
        </button>
      </form>
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
      <div className="m-6">
        <div className="grid grid-rows-1 md:grid-rows-3 grid-cols-3 grid-flow-row gap-4 mx-auto mb-4 rounded-2xl p-4 backdrop-blur-lg bg-black/30 inset-0 dark:text-white-pink text-dark-green border border-green">
          {/* LEFT */}
          {/* <div className="flex flex-col"> */}
          <div className="row-start-1 row-span-1 col-span-3 md:col-start-1 md:row-span-3 md:col-span-1">
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
          <div className="row-start-2 row-span-1 col-span-1 md:col-start-2 md:row-span-1">
            <div className="col-span-2">
              <h3 className="text-xl font-bold">Venue name: {venue.name}</h3>
              <p className="break-all max-h-48 overflow-auto mb-8">
                Description: {venue.description}
              </p>
            </div>
            <div className="col-start-3 row-start-2 row-span-1 md:col-start-2 md:row-span-1 md:row-start-2">
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
          </div>
          {/* RIGHT */}
          {/* <div className="flex flex-col"> */}
          <div className="row-start-3 col-span-3 md:col-start-3 md:row-span-3">
            <div className="flex justify-between">
              <div>
                <h2 className="text-l font-bold">Includes:</h2>
                <p>Dogs: Icon</p>
                <p>Parking: Icon</p>
                <p>Wifi: Icon</p>
                <p>Breakfast: Icon</p>
              </div>
              <div className="md:row-start-2 md:row-span-1">
                <p>Max guests: {venue.maxGuests}</p>
                <p>Price: {venue.price}</p>
                <p>Rating: {venue.rating}</p>
              </div>
            </div>
            <div className="col-start-1 row-start-3 md:row-start-2 md:row-span-1">
              <MyCalendar />
              {/* <button className="btn-primary mt-8">
                See availability
                <Link to={`/`}>See availability</Link>
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VenuePage;

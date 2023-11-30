import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { AuthContextType, Booking, Bookings } from "../Interfaces";
import { AuthFetch } from "../AuthFetch";
import Calendar from "react-calendar";
import { bookingsUrl, url, venuesUrl } from "../Constants";
import { useAuth } from "../AuthContext";

function MyCalendar() {
  const [bookings, setBookings] = useState<Bookings>([]);
  const [selectedDate, setSelectedDate] = useState<Date[]>([]);
  const [numberOfGuests, setNumberOfGuests] = useState(0);
  const [value] = useState(new Date());
  const [maxGuests, setMaxGuests] = useState();
  const [bookingError, setBookingError] = useState<string | null>(null);
  const { isLoggedIn } = useAuth() as AuthContextType;

  let { id } = useParams();

  useEffect(() => {
    const fetchDates = async () => {
      try {
        const response = await fetch(
          `${url}${venuesUrl}/${id}/?_owner=true&_bookings=true`
        );
        const data = await response.json();
        setBookings(data.bookings);
        setMaxGuests(data.maxGuests);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDates();
  }, [bookingError]);

  function getDates(bookings: Booking[]) {
    return bookings.map((booking) => ({
      from: new Date(booking.dateFrom),
      to: new Date(booking.dateTo),
    }));
  }
  const dateRanges = getDates(bookings);

  const tileClassName = ({ date }: { date: Date }) => {
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

  const handleDateChange = (value: any) => {
    setSelectedDate((prevDate) => {
      if (prevDate.length === 0 || prevDate.length === 1) {
        return [...prevDate, value];
      }

      return [value];
    });
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
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

      if (!response.ok) {
        const errorData = await response.json();
        setBookingError(errorData.errors[0].message);
      } else {
        setBookingError("Booking successful");
        setTimeout(() => {
          setBookingError(null);
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      setBookingError("An error occurred");
    }
  };

  return (
    <div>
      <Calendar
        className="rounded-xl green w-full mb-4 dark:bg-dark-green dark:border-green"
        onChange={handleDateChange}
        value={value}
        tileClassName={tileClassName}
      />
      {isLoggedIn ? (
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
              className="mt-2 mb-2 mx-auto block w-full drop-shadow bg-white-pink border border-white-pink rounded-md focus:outline-none focus:border-green dark:focus:border-pink text-dark-green dark:bg-dark-green dark:text-white-pink dark:border-green dark:placeholder-white-pink focus:ring-green dark:focus:ring-pink"
              max={maxGuests}
              min="1"
            />
          </label>
          <p className="text-dark-red pl-3 pb-2">{bookingError}</p>
          <button type="submit" className="btn-primary">
            Book dates
          </button>
        </form>
      ) : null}
    </div>
  );
}

export default MyCalendar;

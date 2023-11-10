import LeftArrow from "../../assets/angle-left.svg";
import DefaultProfile from "../../assets/profile-circle.svg";
import { useEffect, useState } from "react";
import { url, venuesUrl } from "../../App";
import { useParams, Link } from "react-router-dom";
import { Venue } from "../../App";

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

  console.log(venue);

  if (isLoading || venue === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto ">
      <span className="flex px-4 my-3">
        <Link to={`/`}>
          <img src={LeftArrow} alt="Back arrow" className="h-10 w-10" />
        </Link>
        <h1 className="text-2xl font-bold px-4 text-white-pink">
          {venue.name}
        </h1>
      </span>
      <div className="flex flex-row">
        <div className="max-w-md mx-auto mb-4 rounded-2xl p-4 backdrop-blur-lg bg-black/30 inset-0 text-white-pink border border-green ">
          <div className="flex flex-col">
            <img
              className="object-cover rounded-xl h-72 w-full mb-4"
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
          <div className="flex flex-col">
            <h3 className="text-xl font-bold">Venue name: {venue.name}</h3>
            <p className="break-all">Description: {venue.description}</p>
            <p>Max guests: {venue.maxGuests}</p>
            <p>Price: {venue.price}</p>
            <p>Rating: {venue.rating}</p>
          </div>
          <div className="flex flex-col">
            <h2 className="text-l font-bold">Location:</h2>
            <p>Country: {venue.location?.country}</p>
            <p>City: {venue.location?.city}</p>
            <p>Address: {venue.location?.address}</p>
            <p>Continent: {venue.location?.continent}</p>
          </div>
          <div className="flex flex-col">
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
          <button className="bg-light-pink hover:bg-pink w-full py-3 my-3 rounded-xl font-bold">
            See availability
          </button>
        </div>
      </div>
    </div>
  );
}

export default VenuePage;

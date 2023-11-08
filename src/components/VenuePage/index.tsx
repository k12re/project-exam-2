import LeftArrow from "../../assets/angle-left.svg";
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

    getData(`${url}${venuesUrl}/${id}`);
  }, [id]);

  if (isLoading || venue === null) {
    return <div>Loading...</div>;
  }

  //   if (venue === null) {
  //     return null;
  //   }

  return (
    <div className="max-w-md mx-auto">
      <span className="flex px-4 my-3">
        <Link to={`/`}>
          <img src={LeftArrow} alt="Back arrow" className="h-10 w-10" />
        </Link>
        <h1 className="text-2xl font-bold px-4">{venue.name}</h1>
      </span>
      <div className="max-w-md mx-auto mb-4 rounded-2xl p-4 bg-white-pink">
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
          Read more
        </button>
      </div>
    </div>
  );
}

export default VenuePage;

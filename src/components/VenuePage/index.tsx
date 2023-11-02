import LeftArrow from "../../assets/angle-left.svg";
import { useEffect, useState } from "react";
import { url, venuesUrl } from "../../App";
import { useParams, Link } from "react-router-dom";

// interface Venue {
//   id: string;
//   name: string;
//   description: string;
//   price: number;
//   maxGuests: number;
//   rating?: number;
//   created: string;
//   updated?: string;
//   media?: string[];
//   meta?: {
//     wifi: boolean;
//     parking: boolean;
//     breakfast: boolean;
//     pets: boolean;
//   };
//   location?: {
//     address?: string;
//     city?: string;
//     zip?: string;
//     country?: string;
//     continent?: string;
//     lat?: number;
//     lng?: number;
//   };
// }

function VenuePage() {
  const [venue, setVenue] = useState(null);
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (venue === null) {
    return null;
  }

  return (
    <div className="max-w-md mx-auto">
      <span className="flex px-4">
        <Link to={`/`}>
          <img src={LeftArrow} alt="Back arrow" className="w-5" />
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
          <Link to={`/venue/${venue.id}`}>Read more</Link>
        </button>
      </div>
    </div>
  );
}

export default VenuePage;

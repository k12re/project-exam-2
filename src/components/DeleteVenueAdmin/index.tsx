import { useState } from "react";
import { useParams } from "react-router-dom";
import { AuthFetch } from "../AuthFetch";
import { url } from "../../App";

const action = "/venues";

function useDeleteVenueAPI() {
  //   const [venueData, setVenueData] = useState(null);

  let { id } = useParams();

  const deleteVenue = async (venue: object) => {
    const venuesUrl = url + action + `/${id}`;
    console.log(venue);

    try {
      const response = await AuthFetch(venuesUrl, { method: "DELETE" });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return { deleteVenue };
}

function DeleteVenue() {
  const { deleteVenue } = useDeleteVenueAPI();
  function onClick(venueData: object) {
    console.log(venueData);
    deleteVenue(venueData);
  }

  return (
    <span>
      <p
        className="text-md font-bold px-4 pt-2 hover:cursor-pointer"
        onClick={deleteVenue}
      >
        Delete venue
      </p>
    </span>
  );
}

export default DeleteVenue;

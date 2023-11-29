import { useState } from "react";
import { url } from "../../App";
import { AuthFetch } from "../AuthFetch";
import { useParams } from "react-router-dom";

function useEditVenueAPI() {
  const [venueData, setVenueData] = useState(null);
  let { id } = useParams();

  const editVenue = async (venue: object) => {
    const postData = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(venue),
    };
    const venuesUrl = url + `/venues/${id}`;

    try {
      const response = await AuthFetch(venuesUrl, postData);
      const json = await response.json();
      setVenueData(json);
      console.log(venueData);
      console.log(json);
    } catch (error) {
      console.log(error);
    }
  };

  return { editVenue, venueData };
}

export default useEditVenueAPI;

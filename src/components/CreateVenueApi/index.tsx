import { useState } from "react";
import { url } from "../Constants";
import { AuthFetch } from "../AuthFetch";
import { VenueData } from "../Interfaces";

function useCreateVenueAPI() {
  const [venueData, setVenueData] = useState<VenueData | null>(null);

  const createVenue = async (venue: object) => {
    const postData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(venue),
    };
    const venuesUrl = url + `/venues`;
    console.log(venue);

    try {
      const response = await AuthFetch(venuesUrl, postData);
      const json = await response.json();
      setVenueData(json);
      console.log(json);
    } catch (error) {
      console.log(error);
    }
  };

  return { createVenue, venueData };
}

export default useCreateVenueAPI;

import { useEffect, useState } from "react";
import { AuthFetch } from "../AuthFetch";
import { url } from "../../App";
import DefaultProfile from "../../assets/profile-circle.svg";
import { Link } from "react-router-dom";

export const profilesUrl: string = "/profiles";

function GetProfiles() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getData(url: string) {
      try {
        const response = await AuthFetch(url);
        const json = await response.json();

        setData(json);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }

    getData(`${url}${profilesUrl}/?_venues=true&_bookings=true`);
  }, []);

  console.log(data);

  return (
    <>
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold px-4">Profiles</h1>
      </div>
      <ul>
        {data.map((profile) => (
          <li
            key={profile.id}
            className="max-w-md mx-auto mb-4 rounded-2xl p-4 backdrop-blur-lg bg-black/30 inset-0 dark:text-white-pink text-dark-green border border-green"
          >
            {(profile.avatar === "" || profile.avatar === null) | null ? (
              <img className="h-10 w-10 rounded-full" src={DefaultProfile} />
            ) : (
              <img className="h-10 w-10 rounded-full" src={profile.avatar} />
            )}
            <h3 className="text-xl font-bold">{profile.name}</h3>
            <p>Email: {profile.email}</p>
            <p>{profile.description}</p>
            <button className="bg-light-pink hover:bg-pink w-full py-3 my-3 rounded-xl font-bold">
              <Link to={`/profiles/${profile.name}`}>Read more</Link>
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default GetProfiles;

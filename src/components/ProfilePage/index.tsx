import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { AuthFetch } from "../AuthFetch";
import { url } from "../../App";
import { profilesUrl } from "../Profiles";
import LightArrow from "../../assets/light-left.svg";
import DefaultProfile from "../../assets/profile-circle.svg";

function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  let { name } = useParams();

  useEffect(() => {
    async function getData(url: string) {
      try {
        setIsLoading(true);
        const response = await AuthFetch(url);
        const json = await response.json();
        setProfile(json);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    getData(`${url}${profilesUrl}/${name}/?_venues=true&_bookings=true`);
  }, [name]);

  if (isLoading || profile === null) {
    return <div>Loading...</div>;
  }

  console.log(profile);

  return (
    <div className="max-w-md mx-auto">
      <span className="flex px-4 my-3">
        <Link to={`/profiles`}>
          <img src={LightArrow} alt="Back arrow" className="h-10 w-10" />
        </Link>
        <h1 className="text-2xl font-bold px-4">{profile.name}</h1>
      </span>
      <div className="max-w-md mx-auto mb-4 rounded-2xl p-4 bg-white-pink">
        {(profile.avatar === "" || profile.avatar === null) | null ? (
          <img className="h-10 w-10 rounded-full" src={DefaultProfile} />
        ) : (
          <img className="h-10 w-10 rounded-full" src={profile.avatar} />
        )}
        <h3 className="text-xl font-bold">Name: {profile.name}</h3>
        <p>Email: {profile.email}</p>
        <p>Venue manager: {profile.venueManager}</p>
        <button className="bg-light-pink hover:bg-pink w-full py-3 my-3 rounded-xl font-bold">
          Read more
        </button>
      </div>
    </div>
  );
}

export default ProfilePage;

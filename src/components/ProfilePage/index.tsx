import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { AuthFetch } from "../AuthFetch";
import { url } from "../../App";
import { profilesUrl } from "../Profiles";
import LightArrow from "../../assets/light-left.svg";
import Settings from "../../assets/settings.svg";
import DefaultProfile from "../../assets/profile-circle.svg";
import { load, save } from "../Storage";
// import { useLocation } from "react-router-dom";

// const location = useLocation();

// const myProfileDetails = load("profile");

function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOwnUser, setIsOwnUser] = useState();
  const [venueManager, setVenueManager] = useState(false);
  const [avatar, setAvatar] = useState(null);
  let { name } = useParams();
  const navigate = useNavigate();
  const navigateVenue = (venues) => {
    navigate(`/venues/${venues.id}`);
  };

  const loggedInUser = load("profile");
  const user = loggedInUser.name;

  useEffect(() => {
    const accessToken = load("accessToken");
    setIsLoggedIn(!!accessToken);

    // if (isLoggedIn) {
    //   const userProfile = getData(name);
    // }
  }, []);

  const handleAvatarUrlChange = (e) => {
    setAvatar(e.target.value);
  };

  const handleSubmitAvatar = async () => {
    try {
      const existingProfileDetails = load("profile") || {};

      const updatedProfileDetails = {
        ...existingProfileDetails,
        avatar: avatar,
      };

      save("profile", updatedProfileDetails);

      const response = await AuthFetch(`${url}${profilesUrl}/${name}/media`, {
        method: "PUT",
        body: JSON.stringify({ avatar }),
      });
      const json = await response.json();
      console.log(json);
    } catch (error) {
      console.log(error);
    }
  };

  const handleVenueManagerChange = async () => {
    const updatedVenueManager = !venueManager;
    setVenueManager(updatedVenueManager);

    try {
      const response = await AuthFetch(`${url}${profilesUrl}/${name}`, {
        method: "PUT",
        body: JSON.stringify({ venueManager: updatedVenueManager }),
      });
      const json = await response.json();
      console.log(json);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function getData(url: string) {
      try {
        setIsLoading(true);
        const response = await AuthFetch(url);
        const json = await response.json();
        setProfile(json);
        // console.log(json);
        setVenueManager(json.venueManager);
        setIsOwnUser(user === json.name);
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
      <span className="flex my-3">
        <Link to={`/profiles`}>
          <img src={LightArrow} alt="Back arrow" className="h-10 w-10" />
        </Link>
        <h1 className="text-2xl font-bold px-4 text-dark-green dark:text-white-pink">
          Profile
        </h1>
      </span>
      <div className="max-w-md mx-auto mb-4 rounded-2xl p-4 backdrop-blur-lg bg-black/30 inset-0 dark:text-white-pink text-dark-green border border-green ">
        <div>
          {isLoggedIn && isOwnUser && (
            <div className="absolute flex pl-2 left-20">
              <img
                src={Settings}
                alt="Back arrow"
                className="h-8 w-8 cover cursor-pointer"
                onClick={() => setIsSettingsVisible(!isSettingsVisible)}
              />
              {isSettingsVisible && isOwnUser && (
                <label className="flex">
                  <input
                    type="text"
                    placeholder="Image url..."
                    id="avatar"
                    name="avatar"
                    value={avatar}
                    onChange={handleAvatarUrlChange}
                    className="w-full rounded-md ml-1 px-2 py-1 bg-white border border-green focus:outline-none focus:border-green focus:ring-green focus:ring-1 dark:border-pink dark:focus:border-pink dark:focus:ring-pink"
                  />
                  <button
                    onClick={handleSubmitAvatar}
                    className=" text-white-pink bg-green dark:bg-pink rounded-md ml-2 px-3"
                  >
                    Submit
                  </button>
                </label>
              )}
            </div>
          )}

          <img
            className="h-24 w-24 rounded-full object-cover"
            alt={profile.name}
            src={profile.avatar || DefaultProfile}
          />
        </div>
        <h3 className="text-xl font-bold">Name: {profile.name}</h3>
        <p>Email: {profile.email}</p>
        {isOwnUser && (
          <fieldset>
            <input
              type="radio"
              name="status"
              id="manager"
              checked={venueManager}
              onChange={handleVenueManagerChange}
              className="peer/manager w-4 h-4 mx-2 form-radio  border-green text-green focus:ring-green dark:border-pink dark:text-pink dark:focus:ring-pink"
            ></input>
            <label
              htmlFor="manager"
              className=" peer-checked/manager:text-green dark:peer-checked/manager:text-pink"
            >
              Manager
            </label>
            <input
              type="radio"
              name="status"
              id="guest"
              checked={!venueManager}
              onChange={handleVenueManagerChange}
              className="peer/guest w-4 h-4 mx-2 form-radio  border-green text-green focus:ring-green dark:border-pink dark:text-pink dark:focus:ring-pink"
            ></input>
            <label
              htmlFor="guest"
              className=" peer-checked/guest:text-green dark:peer-checked/guest:text-pink "
            >
              Guest
            </label>
          </fieldset>
        )}

        {/* <button className="btn-primary">Save changes</button> */}
      </div>
      <div key={profile.name}>
        <h3 className="text-xl font-bold px-4 relative left-0">Venues:</h3>
        <ul>
          {profile.venues.map((venues) => (
            <li
              key={venues.id}
              className="max-w-md mx-auto mb-4 rounded-2xl p-4 backdrop-blur-lg bg-black/30 inset-0 dark:text-white-pink text-dark-green border border-green"
            >
              <img
                onClick={() => navigateVenue(venues)}
                src={venues.media[0]}
                alt={venues.name}
                className="h-28 w-full object-cover rounded-xl"
              />
              <h3 className="text-xl font-bold">Venue: {venues.name}</h3>
              <span className="flex justify-between">
                <p>Description: {venues.description}</p>

                <button
                  onClick={() => navigate(`/editvenue/${venues.id}`)}
                  className="text-white-pink bg-green dark:bg-pink rounded-md ml-2 px-3 py-1 w-20"
                >
                  Edit
                </button>
              </span>
            </li>
          ))}
        </ul>
        <h3 className="text-xl font-bold px-4">Bookings:</h3>
        <ul>
          {profile.bookings.map((bookings) => (
            <li className="max-w-md mx-auto mb-4 rounded-2xl p-4 backdrop-blur-lg bg-black/30 inset-0 dark:text-white-pink text-dark-green border border-green">
              <h2 className="font-bold">{bookings.venue.name}</h2>
              <p className="font-bold">Booked from:</p>
              <p>{bookings.dateFrom.substring(0, 10)}</p>
              <p className="font-bold">Booked to:</p>
              <p>{bookings.dateTo.substring(0, 10)}</p>
              <p className="font-bold">Number of guests: </p>
              <p>{bookings.guests}</p>
              <p className="text-xs ">Id: {bookings.id}</p>
              {/* <button className="bg-light-pink hover:bg-pink w-full py-3 my-3 rounded-xl font-bold">
                <Link to={`/profiles/${profile.name}`}>Read more</Link>
              </button> */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ProfilePage;

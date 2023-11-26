import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { AuthFetch } from "../AuthFetch";
import { url } from "../../App";
import { profilesUrl } from "../Profiles";
import DefaultProfile from "../../assets/profile-circle.svg";
import { load, save } from "../Storage";
import { Profile } from "../Interfaces";
import { AuthContextType, useAuth } from "../AuthContext";

// const existingProfileDetails = load("profile") || {};

function ProfilePage() {
  const { updateVenueManager, updateAvatarChange } =
    useAuth() as AuthContextType;
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSettingsVisible, setIsSettingsVisible] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isOwnUser, setIsOwnUser] = useState<boolean>();
  const [venueManager, setVenueManager] = useState<boolean>(false);
  const [avatar, setAvatar] = useState<string>("");
  let { name } = useParams();
  const navigate = useNavigate();
  const navigateVenue = (venues: { id: string }) => {
    navigate(`/venues/${venues.id}`);
  };

  const loggedInUser = load("profile");
  const user = loggedInUser.name;

  useEffect(() => {
    const accessToken = load("accessToken");
    setIsLoggedIn(!!accessToken);
  }, []);

  const handleAvatarUrlChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAvatar(event.target.value);
  };

  const handleSubmitAvatar = async () => {
    const updatedAvatarChange = avatar;
    updateAvatarChange(updatedAvatarChange);

    try {
      await AuthFetch(`${url}${profilesUrl}/${name}/media`, {
        method: "PUT",
        body: JSON.stringify({ avatar: updatedAvatarChange }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleVenueManagerChange = async () => {
    const updatedVenueManager = !venueManager;
    setVenueManager(updatedVenueManager);
    updateVenueManager(updatedVenueManager);

    try {
      await AuthFetch(`${url}${profilesUrl}/${name}`, {
        method: "PUT",
        body: JSON.stringify({ venueManager: updatedVenueManager }),
      });
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

  // console.log(profile);

  return (
    <div className="max-w-md mx-auto">
      <span className="flex my-3 text-dark-green dark:text-white-pink">
        <Link to={`/`}>
          <svg
            width="32"
            height="36"
            viewBox="0 0 256 512"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="currentColor"
              d="m31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z"
            />
          </svg>
        </Link>
        <h1 className="text-2xl font-bold px-4 text-dark-green dark:text-white-pink">
          Profile
        </h1>
      </span>
      <div className="max-w-md mx-auto mb-4 rounded-2xl p-4 backdrop-blur-lg bg-black/30 inset-0 dark:text-white-pink text-dark-green border border-green ">
        <div>
          {isLoggedIn && isOwnUser && (
            <div className="absolute flex pl-2 left-20 ">
              <svg
                className="h-8 w-8 cover cursor-pointer "
                onClick={() => setIsSettingsVisible(!isSettingsVisible)}
                width="32"
                height="32"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="currentColor"
                  d="M19.14 12.94c.04-.3.06-.61.06-.94c0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.488.488 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6s3.6 1.62 3.6 3.6s-1.62 3.6-3.6 3.6z"
                />
              </svg>
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
      </div>
      <div key={profile.name}>
        <h3 className="text-xl font-bold px-4 relative left-0 dark:text-white-pink text-dark-green">
          Venues:
        </h3>
        <ul>
          {profile.venues &&
            profile.venues.map((venues) => (
              <li
                key={venues.id}
                className="max-w-md mx-auto mb-4 rounded-2xl p-4 backdrop-blur-lg bg-black/30 inset-0 dark:text-white-pink text-dark-green border border-green"
              >
                <img
                  onClick={() => navigateVenue(venues)}
                  src={venues.media?.[0]}
                  alt={venues.name}
                  className="h-36 w-full object-cover rounded-xl"
                />
                <h3 className="text-xl font-bold">Venue: {venues.name}</h3>
                <span className="flex justify-between">
                  <p>Description: {venues.description}</p>

                  {isOwnUser && (
                    <button
                      onClick={() => navigate(`/editvenue/${venues.id}`)}
                      className="text-white-pink bg-green dark:bg-pink rounded-md ml-2 px-3 py-1 w-20"
                    >
                      Edit
                    </button>
                  )}
                </span>
              </li>
            ))}
        </ul>
        <h3 className="text-xl font-bold px-4 dark:text-white-pink text-dark-green">
          Bookings:
        </h3>
        <ul>
          {profile.bookings &&
            profile.bookings.map((bookings) => (
              <li
                key={bookings.id}
                className="max-w-md mx-auto mb-4 rounded-2xl p-4 backdrop-blur-lg bg-black/30 inset-0 dark:text-white-pink text-dark-green border border-green"
              >
                <div className="flex">
                  <div>
                    <h2 className="font-bold w-44">
                      Venue: {bookings.venue?.name}
                    </h2>
                    <img
                      className="h-36 w-44 object-cover rounded-xl"
                      src={bookings.venue?.media[0]}
                      alt={bookings.venue?.name}
                    />
                  </div>
                  <div className="pl-8">
                    <p className="font-bold">Booked from:</p>
                    <p>{bookings.dateFrom.substring(0, 10)}</p>
                    <p className="font-bold">Booked to:</p>
                    <p>{bookings.dateTo.substring(0, 10)}</p>
                    <p className="font-bold">Number of guests: </p>
                    <p>{bookings.guests}</p>
                    <p className="text-xs ">Id: {bookings.id}</p>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default ProfilePage;

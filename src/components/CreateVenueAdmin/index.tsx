import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { url } from "../../App";
import { AuthFetch } from "../AuthFetch";
import { Link } from "react-router-dom";
// import { useLocation } from "react-router-dom";

const venueSchema = yup.object({
  name: yup.string().required(),
  description: yup.string().required(),
  media: yup.string(),
  price: yup.number().required(),
  maxGuests: yup.number().required(),
  rating: yup.number(),
  wifi: yup.boolean(),
  parking: yup.boolean(),
  breakfast: yup.boolean(),
  petsAllowed: yup.boolean(),
});

const action = "/venues";

function useCreateVenueAPI() {
  const [venueData, setVenueData] = useState(null);

  const createVenue = async (venue: object) => {
    const postData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(venue),
    };
    const venuesUrl = url + action;
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

function CreateVenueForm() {
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(venueSchema),
  });
  const { createVenue } = useCreateVenueAPI();

  function onSubmit(venueData: object) {
    console.log(venueData);
    createVenue(venueData);
  }

  //   const location = useLocation();

  //   console.log(location.pathname);

  return (
    <>
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
          <h1 className="text-2xl font-bold px-4">Create Venue</h1>
        </span>
      </div>
      <div className="max-w-md mx-auto">
        <div className="mb-4 rounded-2xl p-4 backdrop-blur-lg bg-black/30 inset-0 border border-green">
          <form id="venueform" onSubmit={handleSubmit(onSubmit)}>
            <label className="block text-white-pink">
              <label htmlFor="name" className="block">
                <input
                  placeholder="Please enter venue name..."
                  autoComplete="name"
                  type="text"
                  id="name"
                  {...register("name")}
                  className="form-input mt-2 mb-8 mx-auto block w-full bg-white-pink border border-white-pink rounded-md focus:outline-none focus:border-pink text-dark-green"
                />
              </label>
              <label htmlFor="description" className="block">
                <textarea
                  placeholder="Please enter description..."
                  autoComplete="text"
                  rows={5}
                  id="description"
                  {...register("description")}
                  className="mt-2 mb-8 mx-auto block w-full bg-white-pink border border-white-pink rounded-md focus:outline-none focus:border-pink text-dark-green"
                />
              </label>
              <label htmlFor="media" className="block">
                <input
                  placeholder="Please enter image urls..."
                  type="url"
                  id="media"
                  {...register("media")}
                  className="mt-2 mb-8 mx-auto block w-full bg-white-pink border border-white-pink rounded-md focus:outline-none focus:border-pink text-dark-green"
                />
              </label>
              <span className="flex gap-4">
                <label htmlFor="price" className="block">
                  <input
                    placeholder="Price..."
                    type="number"
                    id="price"
                    {...register("price")}
                    className="mt-2 mb-6 mx-auto block w-full bg-white-pink border border-white-pink rounded-md focus:outline-none focus:border-pink text-dark-green"
                  />
                </label>
                <label htmlFor="maxGuests" className="block">
                  <input
                    placeholder="No of guests..."
                    type="number"
                    id="maxGuests"
                    {...register("maxGuests")}
                    className="mt-2 mb-6 mx-auto block w-full bg-white-pink border border-white-pink rounded-md focus:outline-none focus:border-pink text-dark-green"
                  />
                </label>
                <label htmlFor="rating" className="block">
                  <input
                    placeholder="Rating..."
                    type="number"
                    id="rating"
                    {...register("rating")}
                    className="mt-2 mb-6 mx-auto block w-full bg-white-pink border border-white-pink rounded-md focus:outline-none focus:border-pink text-dark-green"
                  />
                </label>
              </span>
              <label
                htmlFor="wifi"
                className="inline-block ml-2 mb-6 text-dark-green dark:text-white-pink"
              >
                Wifi
              </label>
              <input
                className="
                form-checkbox ml-3 h-5 w-5 rounded-md
                dark:border-pink
                border-green
                dark:checked:bg-pink
                checked:bg-green
                dark:bg-white
                bg-white
                active:bg-white-pink dark:active:bg-white-pink
                hover:bg-white-pink checked:hover:bg-dark-green
                dark:hover:bg-light-pink
                focus:bg-white-pink dark:focus:bg-white-pink
                checked:focus:bg-green dark:checked:focus:bg-pink dark:focus:ring-pink focus:ring-green
              "
                type="checkbox"
                id="wifi"
                {...register("wifi")}
              ></input>
              <label
                htmlFor="parking"
                className="inline-block ml-2 mb-6 text-dark-green dark:text-white-pink"
              >
                Parking
              </label>
              <input
                className="
                form-checkbox ml-3 h-5 w-5 rounded-md
                dark:border-pink
                border-green
                dark:checked:bg-pink
                checked:bg-green
                dark:bg-white
                bg-white
                active:bg-white-pink dark:active:bg-white-pink
                hover:bg-white-pink checked:hover:bg-dark-green
                dark:hover:bg-light-pink
                focus:bg-white-pink dark:focus:bg-white-pink
                checked:focus:bg-green dark:checked:focus:bg-pink dark:focus:ring-pink focus:ring-green
              "
                type="checkbox"
                id="parking"
                {...register("parking")}
              ></input>
              <label
                htmlFor="breakfast"
                className="inline-block ml-2 mb-6 text-dark-green dark:text-white-pink"
              >
                Breakfast
              </label>
              <input
                className="
                form-checkbox ml-3 h-5 w-5 rounded-md
                dark:border-pink
                border-green
                dark:checked:bg-pink
                checked:bg-green
                dark:bg-white
                bg-white
                active:bg-white-pink dark:active:bg-white-pink
                hover:bg-white-pink checked:hover:bg-dark-green
                dark:hover:bg-light-pink
                focus:bg-white-pink dark:focus:bg-white-pink
                checked:focus:bg-green dark:checked:focus:bg-pink dark:focus:ring-pink focus:ring-green
              "
                type="checkbox"
                id="breakfast"
                {...register("breakfast")}
              ></input>
              <label
                htmlFor="petsAllowed"
                className="inline-block ml-2 mb-6 text-dark-green dark:text-white-pink"
              >
                Pets allowed
              </label>
              <input
                className="
                form-checkbox ml-3 h-5 w-5 rounded-md
                dark:border-pink
                border-green
                dark:checked:bg-pink
                checked:bg-green
                dark:bg-white
                bg-white
                active:bg-white-pink dark:active:bg-white-pink
                hover:bg-white-pink checked:hover:bg-dark-green
                dark:hover:bg-light-pink
                focus:bg-white-pink dark:focus:bg-white-pink
                checked:focus:bg-green dark:checked:focus:bg-pink dark:focus:ring-pink focus:ring-green
              "
                type="checkbox"
                id="petsAllowed"
                {...register("petsAllowed")}
              ></input>

              <button className="btn-primary">Save venue</button>
            </label>
          </form>
        </div>
      </div>
    </>
  );
}

export default CreateVenueForm;

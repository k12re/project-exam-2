import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { venueSchema } from "../Schema";
import { VenueData } from "../Interfaces";
import { Link } from "react-router-dom";
import useCreateVenueAPI from "../CreateVenueApi";

function CreateVenueForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(venueSchema),
  });
  const { createVenue } = useCreateVenueAPI();

  const [showMessage, setShowMessage] = useState(false);

  function ShowSuccessMessage() {
    return (
      <div className="text-dark-green mx-auto"> Venue created successfully</div>
    );
  }

  const onSubmit = async (venueData: any) => {
    console.log(venueData);

    const formData: VenueData = {
      ...venueData,
      media: venueData.media
        ? venueData.media.split(",").map((url: string) => url.trim())
        : ["https://source.unsplash.com/1600x900/?hotel"],
      meta: {
        wifi: false,
        parking: false,
        breakfast: false,
        pets: false,
      },
    };
    await createVenue(formData);

    reset();
    setShowMessage(true);

    setTimeout(() => {
      setShowMessage(false);
    }, 3000);
  };

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
        <div className="drop-shadow mb-4 rounded-2xl p-4 backdrop-blur-lg bg-black/30 inset-0 border border-green">
          <form id="venueform" onSubmit={handleSubmit(onSubmit)}>
            <label className="block text-dark-green dark:text-white-pink text-xs">
              <label htmlFor="name" className="block">
                Name:
                <input
                  placeholder="Please enter venue name..."
                  autoComplete="name"
                  type="text"
                  id="name"
                  {...register("name")}
                  className="mt-1 mb-4 mx-auto block w-full bg-white-pink border border-white-pink rounded-md focus:outline-none focus:border-green dark:focus:border-pink text-dark-green dark:bg-dark-green dark:text-white-pink dark:border-green dark:placeholder-white-pink focus:ring-green dark:focus:ring-pink"
                />
                <p className="text-dark-red pl-3 pb-2">
                  {errors.name?.message}
                </p>
              </label>
              <label htmlFor="description" className="block">
                Description:
                <textarea
                  placeholder="Please enter description..."
                  autoComplete="text"
                  rows={5}
                  id="description"
                  {...register("description")}
                  className="mt-1 mb-4 mx-auto block w-full bg-white-pink border border-white-pink rounded-md focus:outline-none focus:border-green dark:focus:border-pink text-dark-green dark:bg-dark-green dark:text-white-pink dark:border-green dark:placeholder-white-pink focus:ring-green dark:focus:ring-pink"
                />
                <p className="text-dark-red pl-3 pb-2">
                  {errors.description?.message}
                </p>
              </label>
              <label htmlFor="media" className="block">
                Media Url:
                <input
                  placeholder="Please enter image urls..."
                  type="text"
                  id="media"
                  {...register("media")}
                  className="mt-1 mb-4 mx-auto block w-full bg-white-pink border border-white-pink rounded-md focus:outline-none focus:border-green dark:focus:border-pink text-dark-green dark:bg-dark-green dark:text-white-pink dark:border-green dark:placeholder-white-pink focus:ring-green dark:focus:ring-pink"
                />
              </label>
              <span className="flex gap-4">
                <label htmlFor="price" className="block">
                  Price:
                  <input
                    placeholder="Price..."
                    type="number"
                    id="price"
                    {...register("price")}
                    className="mt-1 mb-4 mx-auto block w-full bg-white-pink border border-white-pink rounded-md focus:outline-none focus:border-green dark:focus:border-pink text-dark-green dark:bg-dark-green dark:text-white-pink dark:border-green dark:placeholder-white-pink focus:ring-green dark:focus:ring-pink"
                  />
                  <p className="text-dark-red pl-3 pb-2">
                    {errors.price?.message}
                  </p>
                </label>
                <label htmlFor="maxGuests" className="block">
                  Guests:
                  <input
                    placeholder="No of guests..."
                    type="number"
                    id="maxGuests"
                    {...register("maxGuests")}
                    className="mt-1 mb-4 mx-auto block w-full bg-white-pink border border-white-pink rounded-md focus:outline-none focus:border-green dark:focus:border-pink text-dark-green dark:bg-dark-green dark:text-white-pink dark:border-green dark:placeholder-white-pink focus:ring-green dark:focus:ring-pink"
                  />
                  <p className="text-dark-red pl-3 pb-2">
                    {errors.maxGuests?.message}
                  </p>
                </label>
                <label htmlFor="rating" className="block">
                  Rating:
                  <input
                    placeholder="Rating..."
                    type="number"
                    id="rating"
                    {...register("rating")}
                    className="mt-1 mb-4 mx-auto block w-24 bg-white-pink border border-white-pink rounded-md focus:outline-none focus:border-green dark:focus:border-pink text-dark-green dark:bg-dark-green dark:text-white-pink dark:border-green dark:placeholder-white-pink focus:ring-green dark:focus:ring-pink"
                    min="0"
                    max="5"
                  />
                </label>
              </span>
              <label
                htmlFor="wifi"
                className="inline-block ml-2 mb-6 mt-4 text-dark-green dark:text-white-pink"
              >
                Wifi
              </label>
              <input
                className="checkbox-primary"
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
                className="checkbox-primary"
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
                className="checkbox-primary"
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
                className="checkbox-primary"
                type="checkbox"
                id="petsAllowed"
                {...register("petsAllowed")}
              ></input>

              <button className="btn-primary">Save venue</button>
              {showMessage && <ShowSuccessMessage />}
            </label>
          </form>
        </div>
      </div>
    </>
  );
}

export default CreateVenueForm;

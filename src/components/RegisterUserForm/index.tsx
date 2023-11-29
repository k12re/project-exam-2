import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link, useLocation } from "react-router-dom";
import { registerSchema } from "../Schema";
import useRegisterUserAPI from "../RegisterUserApi";

function RegisterUserForm() {
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(registerSchema),
  });
  const { registerUser } = useRegisterUserAPI();

  function onSubmit(profileData: object) {
    console.log(profileData);
    registerUser(profileData);
  }

  const location = useLocation();

  console.log(location.pathname);

  return (
    <div className="max-w-md mx-auto">
      <span className="flex px-4 my-3">
        <h1 className="text-2xl font-bold px-4 dark:text-white-pink text-dark-green">
          Fill out to register
        </h1>
      </span>
      <div className="drop-shadow mb-4 rounded-2xl p-4 backdrop-blur-lg bg-black/30 inset-0 border border-green">
        <span className="flex justify-center pt-6">
          <Link to={`/register`}>
            <div className="bg-white-pink rounded-l-full w-32 p-1">
              <h1
                className={`text-xl font-bold px-4 pb-1 text-center text-white-pink dark:text-dark-green ${
                  location.pathname === "/register"
                    ? "bg-green dark:bg-pink rounded-full"
                    : ""
                }`}
              >
                Register
              </h1>
            </div>
          </Link>
          <Link to={`/login`}>
            <div className="bg-white-pink rounded-r-full w-32">
              <h1 className="text-xl font-bold mb-4 px-1 pt-1 pb-2 text-center">
                Login
              </h1>
            </div>
          </Link>
        </span>
        <form id="registerform" onSubmit={handleSubmit(onSubmit)}>
          <label className="block text-white-pink">
            <label htmlFor="name" className="block">
              <input
                placeholder="Please enter username..."
                autoComplete="name"
                type="text"
                id="name"
                {...register("name")}
                className="mt-2 mb-8 mx-auto block w-full bg-white-pink border border-white-pink rounded-md focus:outline-none focus:border-green dark:focus:border-pink text-dark-green dark:bg-dark-green dark:text-white-pink dark:border-green dark:placeholder-white-pink focus:ring-green dark:focus:ring-pink"
              />
            </label>
            <label htmlFor="email" className="block">
              <input
                placeholder="Please enter email..."
                autoComplete="email"
                type="text"
                id="email"
                {...register("email")}
                className="mt-2 mb-8 mx-auto block w-full bg-white-pink border border-white-pink rounded-md focus:outline-none focus:border-green dark:focus:border-pink text-dark-green dark:bg-dark-green dark:text-white-pink dark:border-green dark:placeholder-white-pink focus:ring-green dark:focus:ring-pink"
              />
            </label>
            <label htmlFor="password" className="block">
              <input
                placeholder="Please enter your password..."
                type="password"
                id="password"
                {...register("password")}
                className="mt-2 mb-8 mx-auto block w-full bg-white-pink border border-white-pink rounded-md focus:outline-none focus:border-green dark:focus:border-pink text-dark-green dark:bg-dark-green dark:text-white-pink dark:border-green dark:placeholder-white-pink focus:ring-green dark:focus:ring-pink"
              />
            </label>
            <label htmlFor="avatar" className="block">
              <input
                placeholder="Please enter valid image url..."
                type="text"
                id="avatar"
                {...register("avatarUrl")}
                className="mt-2 mb-6 mx-auto block w-full bg-white-pink border border-white-pink rounded-md focus:outline-none focus:border-green dark:focus:border-pink text-dark-green dark:bg-dark-green dark:text-white-pink dark:border-green dark:placeholder-white-pink focus:ring-green dark:focus:ring-pink"
              />
            </label>
            <label
              htmlFor="venueManager"
              className="inline-block ml-2 mb-6 text-dark-green dark:text-white-pink"
            >
              Manager
            </label>
            <input
              className="checkbox-primary"
              type="checkbox"
              id="venueManager"
              {...register("venueManager")}
            ></input>

            <button className="btn-primary">Register</button>
          </label>
        </form>
      </div>
    </div>
  );
}

export default RegisterUserForm;

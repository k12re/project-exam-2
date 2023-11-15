import { yupResolver } from "@hookform/resolvers/yup/src/yup.js";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { url } from "../../App";
import { Link, useLocation } from "react-router-dom";
import { save } from "../Storage";

const schema = yup.object({
  email: yup.string().required(),
  password: yup.string().required(),
});

const authEndpoint = "/auth";
const action = "/login";
const methodPOST = "POST";

function useLoginUserAPI() {
  const [profileData, setProfileData] = useState(null);

  const loginUser = async (profile: object) => {
    const postData = {
      method: methodPOST,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profile),
    };
    const registerUrl = url + authEndpoint + action;
    console.log(profile);

    try {
      const response = await fetch(registerUrl, postData);
      const json = await response.json();
      setProfileData(json);
      console.log(json);

      if (response.ok) {
        const accessToken = json.accessToken;
        save("accessToken", accessToken);
        delete json.accessToken;
        save("profile", json);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { loginUser, profileData };
}

function LoginUserForm() {
  const { register, handleSubmit } = useForm({ resolver: yupResolver(schema) });
  const { loginUser } = useLoginUserAPI();

  function onSubmit(profileData: object) {
    console.log(profileData);
    loginUser(profileData);
  }

  const location = useLocation();

  console.log(location.pathname);

  return (
    <div className="max-w-md mx-auto">
      <span className="flex px-4 my-3">
        <h1 className="text-2xl font-bold px-4 text-white-pink">
          Fill out to login
        </h1>
      </span>
      <div className="mb-4 rounded-2xl p-4 backdrop-blur-lg bg-black/30 inset-0 border border-green">
        <span className="flex justify-center pt-6">
          <Link to={`/register`}>
            <div className="bg-white-pink rounded-l-full w-32">
              <h1 className="text-xl font-bold mb-4 px-1 pt-1 pb-2">
                Register
              </h1>
            </div>
          </Link>
          <Link to={`/login`}>
            <div className="bg-white-pink rounded-r-full w-32 p-1">
              <h1
                className={`text-xl font-bold px-4 pb-1 ${
                  location.pathname === "/login" ? "bg-pink rounded-full" : ""
                }`}
              >
                Login
              </h1>
            </div>
          </Link>
        </span>
        <form id="registerform" onSubmit={handleSubmit(onSubmit)}>
          <label className="block text-white-pink">
            <label htmlFor="email" className="block ">
              Email:{" "}
            </label>
            <input
              autoComplete="name"
              type="text"
              id="email"
              {...register("email")}
              className="mt-2 mx-auto block w-full bg-white-pink border border-white-pink rounded-md focus:outline-none focus:border-pink"
            />
            <label htmlFor="password" className="block">
              Password:{" "}
            </label>
            <input
              type="password"
              id="password"
              {...register("password")}
              className="mt-2 mx-auto block w-full bg-white-pink border border-white-pink rounded-md focus:outline-none focus:border-pink"
            />

            <button className="mt-2 mx-auto block bg-light-pink hover:bg-pink w-full py-3 my-3 rounded-xl font-bold">
              Login
            </button>
          </label>
        </form>
      </div>
    </div>
  );
}

export default LoginUserForm;

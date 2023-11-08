import { yupResolver } from "@hookform/resolvers/yup/src/yup.js";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { url } from "../../App";
import { Link } from "react-router-dom";
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

  return (
    <div className="max-w-md mx-auto">
      <span className="flex">
        <Link to={`/register`}>
          <h1 className="text-2xl font-bold px-4 mb-4">Register user</h1>
        </Link>
        <Link to={`/login`}>
          <h1 className="text-2xl font-bold px-4 mb-4">Login user</h1>
        </Link>
      </span>
      <form id="registerform" onSubmit={handleSubmit(onSubmit)}>
        <label className="block">
          <label htmlFor="email" className="block">
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
  );
}

export default LoginUserForm;

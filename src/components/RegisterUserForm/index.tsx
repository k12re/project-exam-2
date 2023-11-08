import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { url } from "../../App";
import { Link } from "react-router-dom";

const schema = yup.object({
  name: yup.string().required(),
  email: yup.string().required(),
  password: yup.string().required(),
  avatarUrl: yup.string(),
  venueManager: yup.boolean(),
});

const authEndpoint = "/auth";
const action = "/register";
const methodPOST = "POST";

function useRegisterUserAPI() {
  const [profileData, setProfileData] = useState(null);

  const registerUser = async (profile: object) => {
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
    } catch (error) {
      console.log(error);
    }
  };

  return { registerUser, profileData };
}

function RegisterUserForm() {
  const { register, handleSubmit } = useForm({ resolver: yupResolver(schema) });
  const { registerUser } = useRegisterUserAPI();

  function onSubmit(profileData: object) {
    console.log(profileData);
    registerUser(profileData);
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
          <label htmlFor="name" className="block">
            Name:{" "}
          </label>
          <input
            autoComplete="name"
            type="text"
            id="name"
            {...register("name")}
            className="mt-2 mx-auto block w-full bg-white-pink border border-white-pink rounded-md focus:outline-none focus:border-pink"
          />
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
          <label htmlFor="avatar" className="block">
            Avatar URL
          </label>
          <input
            type="text"
            id="avatar"
            {...register("avatarUrl")}
            className="mt-2 mx-auto block w-full bg-white-pink border border-white-pink rounded-md focus:outline-none focus:border-pink"
          />
          <label htmlFor="venueManager" className="block">
            Manager
          </label>
          <input
            type="checkbox"
            id="venueManager"
            {...register("venueManager")}
          ></input>
          <button className="mt-2 mx-auto block bg-light-pink hover:bg-pink w-full py-3 my-3 rounded-xl font-bold">
            Register
          </button>
        </label>
      </form>
    </div>
  );
}

export default RegisterUserForm;

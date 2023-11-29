import { useState } from "react";
import { url } from "../../App";

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

    try {
      const response = await fetch(registerUrl, postData);
      const json = await response.json();
      setProfileData(json);
    } catch (error) {
      console.log(error);
    }
  };

  return { registerUser, profileData };
}

export default useRegisterUserAPI;

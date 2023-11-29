import { useState } from "react";
import { url } from "../../App";
import { save } from "../Storage";
import { useAuth } from "../AuthContext";
import { AuthContextType } from "../Interfaces";

const authEndpoint = "/auth";
const action = "/login";
const methodPOST = "POST";

function useLoginUserAPI() {
  const { login } = useAuth() as AuthContextType;
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

    try {
      const response = await fetch(registerUrl, postData);
      const json = await response.json();
      setProfileData(json);

      login(json);

      if (response.ok) {
        const accessToken = json.accessToken;
        save("accessToken", accessToken);
        delete json.accessToken;
        save("profile", json);
      }
      setProfileData(json);
    } catch (error) {
      console.log(error);
    }
  };

  return { loginUser, profileData };
}

export default useLoginUserAPI;

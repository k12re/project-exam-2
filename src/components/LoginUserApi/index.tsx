import { useState } from "react";
import { authEndpoint, url } from "../Constants";
import { save } from "../Storage";
import { useAuth } from "../AuthContext";
import { AuthContextType } from "../Interfaces";
import { useNavigate } from "react-router";

const action = "/login";

function useLoginUserAPI() {
  const { login } = useAuth() as AuthContextType;
  const [profileData, setProfileData] = useState(null);
  const navigate = useNavigate();

  const loginUser = async (profile: object) => {
    const postData = {
      method: "POST",
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

      if (response.ok) {
        const accessToken = json.accessToken;
        save("accessToken", accessToken);
        delete json.accessToken;
        save("profile", json);
        login(json);
        navigate("/");
      } else {
        console.log("Login failed:", json.errors);
      }
      setProfileData(json);
    } catch (error) {
      console.log(error);
    }
  };

  return { loginUser, profileData };
}

export default useLoginUserAPI;

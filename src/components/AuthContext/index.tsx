import { createContext, useContext, useState, useEffect } from "react";
import { load, remove, save } from "../Storage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileDetails, setProfileDetails] = useState(null);
  const [venueManager, setVenueManager] = useState(false);

  const login = (profileData) => {
    setIsLoggedIn(true);
    setProfileDetails(profileData);
    setVenueManager(profileData?.venueManager);
  };

  const logout = () => {
    remove("accessToken");
    remove("profile");
    setIsLoggedIn(false);
    setProfileDetails(null);
    setVenueManager(false);
  };

  const updateVenueManager = (status) => {
    setVenueManager(status);
    save("profile", { ...profileDetails, venueManager: status });
  };

  useEffect(() => {
    const storedToken = load("accessToken");
    const storedProfile = load("profile");

    if (storedToken && storedProfile) {
      login(storedProfile);
    }
  }, [venueManager]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
        profileDetails,
        venueManager,
        updateVenueManager,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

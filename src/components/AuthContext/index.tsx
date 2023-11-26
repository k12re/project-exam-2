import { createContext, useContext, useState, useEffect } from "react";
import { load, remove, save } from "../Storage";
import { Profile } from "../Interfaces";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export interface AuthContextType {
  isLoggedIn: boolean;
  login: (profile: Profile) => void;
  logout: () => void;
  profileDetails: Profile | null;
  venueManager: boolean;
  updateVenueManager: (status: boolean) => void;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileDetails, setProfileDetails] = useState<Profile | null>(null);
  const [venueManager, setVenueManager] = useState(false);

  const login = (profileData: Profile) => {
    setProfileDetails(profileData);
    setVenueManager(profileData?.venueManager);
    setIsLoggedIn(true);
  };

  const logout = (): void => {
    remove("accessToken");
    remove("profile");
    setIsLoggedIn(false);
    setProfileDetails(null);
    setVenueManager(false);
  };

  const updateVenueManager = (status: boolean) => {
    setVenueManager(status);
    save("profile", { ...profileDetails, venueManager: status });
  };

  useEffect(() => {
    console.log("Checking login status...");
    const storedToken = load("accessToken");
    const storedProfile = load("profile");

    if (storedToken && storedProfile) {
      console.log("Stored token and profile found. Logging in...");
      login(storedProfile);
    }

    if (!isLoggedIn) {
      console.log("is not logged in");
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

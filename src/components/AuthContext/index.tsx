import { createContext, useContext, useState, useEffect } from "react";
import { load, remove, save } from "../Storage";
import { AuthContextType, AuthProviderProps, Profile } from "../Interfaces";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileDetails, setProfileDetails] = useState<Profile | null>(null);
  const [venueManager, setVenueManager] = useState(false);
  const [avatarChange, setAvatarChange] = useState("");
  const [avatar, setAvatar] = useState("");

  const login = (profileData: Profile) => {
    setProfileDetails(profileData);
    setVenueManager(profileData?.venueManager);
    setAvatar(profileData?.avatar || "");
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

  const updateAvatarChange = (avatarChange: string) => {
    setAvatarChange(avatarChange);
    save("profile", { ...profileDetails, avatar: avatarChange });
  };

  useEffect(() => {
    // const storedProfile = load("profile");
    // setAvatar(storedProfile?.avatar || "");
  }, [avatarChange, avatar]);

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
        avatarChange,
        updateAvatarChange,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

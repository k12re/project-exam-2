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
  avatarChange: string;
  updateAvatarChange: (newAvatar: string) => void;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

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

  const updateAvatarChange = (newAvatar: string) => {
    setAvatarChange(newAvatar);
    save("profile", { ...profileDetails, avatar: newAvatar });
  };

  useEffect(() => {
    const storedProfile = load("profile");
    setAvatar(storedProfile?.avatar || "");
  }, [avatarChange]);

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

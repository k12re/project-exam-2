import { NavLink } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { AuthContextType, ClickProps } from "../Interfaces";

const LogoutUser: React.FC<ClickProps> = ({ onClick = () => {} }) => {
  const { logout } = useAuth() as AuthContextType;

  const handleLogout = async () => {
    logout();
    onClick();
  };

  return (
    <NavLink
      onClick={handleLogout}
      to="/"
      className="m-3 p-3 dark:text-pink text-green dark:hover:text-white-pink hover:bg-green dark:hover:bg-pink hover:text-white-pink"
    >
      Logout
    </NavLink>
  );
};

export default LogoutUser;

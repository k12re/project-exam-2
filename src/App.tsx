import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./components/AuthContext";
import { Layout } from "./components/Layout";
import VenuePage from "./components/VenuePage";
import RegisterUserForm from "./components/RegisterUserForm";
import LoginUserForm from "./components/LoginUserForm";
import ProfilePage from "./components/ProfilePage";
import GetVenues from "./components/GetVenues";
import EditVenueForm from "./components/EditVenueForm";
import CreateVenueForm from "./components/CreateVenueForm";

function App() {
  return (
    <>
      <AuthProvider>
        <div>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<GetVenues />}></Route>
              <Route path="venues/:id" element={<VenuePage />}></Route>
              <Route path="createvenue" element={<CreateVenueForm />}></Route>
              <Route path="editvenue/:id" element={<EditVenueForm />}></Route>
              <Route path="profiles/:name" element={<ProfilePage />}></Route>
              <Route path="register" element={<RegisterUserForm />}></Route>
              <Route path="login" element={<LoginUserForm />}></Route>
            </Route>
          </Routes>
        </div>
      </AuthProvider>
    </>
  );
}

export default App;

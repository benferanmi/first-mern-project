import { Route, Routes } from "react-router-dom";
import "./App.css";
import IndexPage from "./pages/IndexPage.jsx";
import Layout from "./pages/Layout.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import axios from "axios";
import { UserContextProvider } from "./UserContext";
import ProfilePage from "./pages/ProfilePage";
import PlacesPage from "./pages/PlacesPage";
import PlacesFormPage from "./pages/PlacesFormPage";
import PlaceSinglePage from "./pages/PlaceSinglePage";
import BookingPage from "./pages/Booking/BookingPage";
import BookingSinglePage from "./pages/Booking/BookingSinglePage";

axios.defaults.baseURL = "https://first-mern-project-bend-production.up.railway.app";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account" element={<ProfilePage />} />
          <Route path="/account/places" element={<PlacesPage />} />
          <Route path="/account/bookings" element={<BookingPage />} />
          <Route path="/account/places/new" element={<PlacesFormPage />} />
          <Route path="/account/places/:id" element={<PlacesFormPage />} />
          <Route path="/account/bookings/:id" element={<BookingSinglePage />} />
          <Route path="/place/:id" element={<PlaceSinglePage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;

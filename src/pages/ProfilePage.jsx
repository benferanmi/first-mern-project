import React, { useContext, useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { UserContext } from "../UserContext";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccountNav from "./component/AccountNav";

const ProfilePage = () => {
  const { ready, user, setUser } = useContext(UserContext);
  const [redirect, setRedirect ] = useState(null);
  let { subpage } = useParams();


    if(!user) {
        axios.get('/profile').then(({data}) =>{
            setUser(data);
            setReady(true);
            console.log(data)
        })
    }

  if (subpage === undefined) {
    subpage = "profile";
  }

  async function logout() {
    await axios.post("/logout");
    setRedirect("/login");
    setUser(null);;
    localStorage.setItem("token", 'a');

  }
  if (!ready) {
    return "Loading.......";
  }

  if (ready && !user) {
    return <Navigate to={"/login"} />;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div>
      <AccountNav />
      {subpage === "profile" && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user.name} and {user.email}
          <button onClick={logout} className="primary max-w-sm mt-2">
            Logout
          </button>
        </div>
      )}

{subpage === "bookings" && (
        <div className="text-center max-w-lg mx-auto">
          this is booking page
        </div>
      )}

      {subpage === "places" && (
        <div>
          <PlacesPage />
        </div>
      )}
    </div>
  );
};

export default ProfilePage;

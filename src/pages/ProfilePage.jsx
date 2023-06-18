import React, { useContext, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { UserContext } from "../UserContext";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccountNav from "./component/AccountNav";

const ProfilePage = () => {
  const { ready, user, setUser } = useContext(UserContext);
  const { redirect, setRedirect } = useState(null);
  let { subpage } = useParams();

  if (subpage === undefined) {
    subpage = "profile";
  }

  //getting saved user data tfrom cookies.
  function getUserDataFromCookie() {
    const encodedCookie = document.cookie.split(';').find(cookie => cookie.trim().startsWith('userData='));
      const json = decodeURIComponent(encodedCookie.split('=')[1]);
    return json
  }

  const retrievedUserData = getUserDataFromCookie();
  console.log('from cookies' + retrievedUserData);
  console.log(JSON.parse(retrievedUserData))

  function deleteUserDataCookie() {
    document.cookie = 'userData=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  }
  

  async function logout() {
    await axios.post("/logout");
    deleteUserDataCookie()
    setRedirect("/login");
    setUser(null);;
  }
  if (!ready) {
    return "Loading.......";
  }
  if (ready && !user && !redirect) {
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

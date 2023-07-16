import React, { useEffect, useState } from "react";
import Perks from "./component/Perks";
import axios from "axios";
import PhotoUploader from "./component/PhotoUploader";
import AccountNav from "./component/AccountNav";
import { Navigate, useParams } from "react-router-dom";
import GetTokenFormCookie from './reuseable/Token.jsx'

const PlacesFormPage = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [perks, setPerks] = useState("");
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [redirect, setRedirect] = useState(false);
  const [price, setPrice] = useState('');

  const {token} = GetTokenFormCookie()


  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/places/" + id).then((response) => {
      const { data } = response;
      setTitle(data.title);
      setAddress(data.address);
      setDescription(data.description);
      setAddedPhotos(data.photos);
      setPerks(data.perks);
      setExtraInfo(data.extraInfo);
      setCheckIn(data.checkIn);
      setCheckOut(data.checkOut);
      setMaxGuests(data.maxGuests);
      setPrice(data.price);
    });
  }, [id]);
  function inputHeader(text) {
    return <h2 className="text-2xl mt-4">{text}</h2>;
  }

  function inputDescription(text) {
    return <p className="text-gray-500 text-sm">{text}</p>;
  }

  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }

  async function savePlace(e) {
    e.preventDefault();
    const placeData = {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    };
    if (token) {
      const api = axios.create({
        baseURL: 'http://localhost:4000/places',
      });
  
      api.interceptors.request.use((config) => {
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      });
      if (id) {
        //updating existing place
        await api.put("/", {
          id,
          ...placeData,
        });
        setRedirect(true);
      } else {
        //adding new place
        await api.post("/", placeData);
        setRedirect(true);
      }
    }
  }

  if (redirect) {
    return <Navigate to={"/account/places"} />;
  }

  return (
    <>
      <AccountNav />
      <form onSubmit={savePlace}>
        {preInput(
          "Title",
          "Title for your place, should be short and catchy as inadvertistment"
        )}
        <input
          type="text"
          placeholder="title, for Example: My lovely appartment"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {preInput("Address", "Address for your place.")}
        <input
          type="text"
          placeholder=" address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        {/* //input for photos */}
        {preInput("Photos", "more = better")}
        <PhotoUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
        {/* input for description */}
        {preInput("Description", "Description of the place")}
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* input for perks */}
        {preInput("Perks", "Select all the perks of your place.")}
        <Perks selected={perks} onChange={setPerks} />
        {preInput("Extra info", "house rules, etc.")}
        <textarea
          value={extraInfo}
          onChange={(e) => setExtraInfo(e.target.value)}
        />
        {preInput(
          "Check In And Out Times.",
          "Add check in and out times, remember to have some time windows for cleaning the room between guests "
        )}
        <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
          <div>
            <h3 className="tm-2 -mb-1">Check In Time</h3>
            <input
              type="text"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              placeholder="14"
            />
          </div>
          <div>
            <h3 className="tm-2 -mb-1">Check Out Time</h3>
            <input
              type="text"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              placeholder="11"
            />
          </div>
          <div>
            <h3 className="tm-2 -mb-1">Max number of guests</h3>
            <input
              type="number"
              placeholder="2"
              value={maxGuests}
              onChange={(e) => setMaxGuests(e.target.value)}
            />
          </div>
          <div>
            <h3 className="tm-2 -mb-1">Price per Night</h3>
            <input
              type="number"
              placeholder="100"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>

        <div>
          <button className="primary my-4">Save</button>
        </div>
      </form>
    </>
  );
};

export default PlacesFormPage;

//4:30h:23

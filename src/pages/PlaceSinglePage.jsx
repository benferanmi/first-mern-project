import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import BookingWidget from "./BookingWidget.jsx";
import PlaceGallery from "./reuseable/PlaceGallery.jsx";
import AddressLinks from "./reuseable/AddressLinks.jsx";
import GetTokenFormCookie from "./reuseable/Token.jsx";

const PlaceSinglePage = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const { token } = GetTokenFormCookie();

  useEffect(() => {
    if (!id) {
      return;
    }
    if (token) {
      const api = axios.create({
        baseURL: `http://localhost:4000/places/${id}`,
      });

      api.interceptors.request.use((config) => {
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      });
    }
    axios.get("/").then((response) => {
      setPlace(response.data);
    });
  }, []);
  console.log(place);

  if (!place) return "";

  return (
    <div className="mt-4 bg-gray-100 -mx-8 px-8 pt-8">
      <h1 className="text-2xl">{place.title}</h1>
      <AddressLinks> {place.address}</AddressLinks>
      <div className="relative">
        <PlaceGallery place={place} />

        <div className="mt-8 mb-8 gap-8 grid grid-cols-1 md:grid-cols-[2fr_1fr]">
          <div className="">
            <div className="my-4">
              <h2 className="font-semibold text-2xl">Description</h2>
              {place.description}
            </div>
            Check In: {place.checkIn} <br />
            Check-out: {place.checkOut}
            Max Number Of Guests: {place.maxGuests}
          </div>
          <div className="">
            <BookingWidget place={place} />
          </div>
        </div>
      </div>
      <div className="bg-white mx-8 px-8 py-8 border-t">
        <div className="">
          <h2 className="font-semibold text-2xl">Extra Information </h2>
        </div>
        <div className="text-sm text-gray-700 leading-5 mb-4 mt-2">
          {place.extraInfo}
        </div>
      </div>
    </div>
  );
};

export default PlaceSinglePage;

//5:21

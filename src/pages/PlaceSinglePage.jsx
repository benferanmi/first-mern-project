import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CloseSvg, ImageSvg, MapSvg } from "./component/SvgComponent.jsx";
import BookingWidget from "./BookingWidget.jsx";

const PlaceSinglePage = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/places/${id}`).then((response) => {
      setPlace(response.data);
    });
  }, []);
  console.log(place);

  if (!place) return "";

  if (showAllPhotos) {
    return (
      <div className="absolute inset-8 bg-black text-white  min-h-screen ">
        <div className="bg-black p-8 grid gap-4">
          <div>
            <h2 className="text-3xl mr-48 ">Photos of {place.title}</h2>
            <button
              onClick={() => setShowAllPhotos(false)}
              className="fixed right-12 top-8 gap-1 py-2 px-4 rounded-2xl shadow shadow-black bg-white text-black flex"
            >
              Close Photo
              <CloseSvg />
            </button>
          </div>
          {place?.photos?.length > 0 &&
            place.photos.map((photo) => (
              <div>
                <img src={"http://localhost:4000/uploads/" + photo} alt="" />
              </div>
              
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4 bg-gray-100 -mx-8 px-8 pt-8">
      <h1 className="text-2xl">{place.title}</h1>
      <a
        className="flex gap-1 my-3  font-semibold underline "
        target="_blank"
        href={"https://maps.google.com/?g=" + place.address}
      >
        <MapSvg />
        {place.address}
      </a>

      <div className="relative">
        <div className=" relative grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden">
          <div className="">
            {place.photos?.[0] && (
              <div className="">
                <img 
                  onClick={() => setShowAllPhotos(true)}
                  className="aspect-square cursor-pointer object-cover"
                  src={"http://localhost:4000/uploads/" + place.photos[0]}
                  alt=""
                />
              </div>
            )}
          </div>
          <div className="grid ">
            {place.photos?.[1] && (
              <img 
                onClick={() => setShowAllPhotos(true)}
                className="aspect-square cursor-pointer object-cover"
                src={"http://localhost:4000/uploads/" + place.photos[1]}
                alt=""
              />
            )}
            <div className="overflow-hidden">
              {place.photos?.[2] && (
                <img 
                  onClick={() => setShowAllPhotos(true)}
                  className="aspect-square cursor-pointer object-cover relative top-2"
                  src={"http://localhost:4000/uploads/" + place.photos[2]}
                  alt=""
                />
              )}
            </div>
          </div>
          <button
            onClick={() => setShowAllPhotos(true)}
            className="absolute bottom-2 py-2 px-4 bg-white rounded-2xl shadow shadow:md shadow-gray-500 right-2"
          >
            <ImageSvg /> Show more Photos
          </button>
        </div>

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

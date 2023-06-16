import { CloseSvg, ImageSvg, } from "../component/SvgComponent.jsx";
import { useState } from "react";

const PlaceGallery = ({ place }) => {
  const [showAllPhotos, setShowAllPhotos] = useState(false);

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
  );
};

export default PlaceGallery;

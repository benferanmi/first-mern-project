import React, { useState } from "react";
import axios from "axios";
import {
  DeleteSvg,
  LightStarSvg,
  SolidStarSvg,
  UploadSvg,
} from "./SvgComponent";

const PhotoUploader = ({ addedPhotos, onChange }) => {
  const [photoLink, setPhotoLink] = useState("");

  async function addPhotoByLink(e) {
    e.preventDefault();
    const { data: filename } = await axios.post("/upload-by-link", {
      link: photoLink,
    });
    onChange((prev) => {
      return [...prev, filename];
    });
    setPhotoLink("");
  }

  function uploadPhotos(e) {
    const files = e.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }
    axios
      .post("/upload", data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        const { data: filenames } = response;
        onChange((prev) => {
          return [...prev, ...filenames];
        });
      });
  }

  function removePhoto(e, filename) {
    e.preventDefault();
    onChange([...addedPhotos.filter((photo) => photo !== filename)]);
  }

  function setAsMainPhoto(e, filename) {
    e.preventDefault();
    onChange([filename, ...addedPhotos.filter(photo => photo !== filename)]);
  }
  return (
    <>
      <div className="flex gap-2">
        <input
          type="text"
          value={photoLink}
          onChange={(e) => setPhotoLink(e.target.value)}
          placeholder="Add Using A Link........ jpg"
        />
        <button
          className="bg-gray-200 px-4 rounded-2xl"
          onClick={addPhotoByLink}
        >
          Add&nbsp;photo
        </button>
      </div>
      <div className=" mt-2 grid gap-2 p-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {addedPhotos.length > 0 &&
          addedPhotos.map((link) => (
            <div className="h-32 flex relative" key={link}>
              <img
                className="rounded-2xl w-full object-cover position-center"
                width="100%"
                height="100% "
                src={"http://localhost:4000/uploads/" + link}
                alt="house"
              />
              <button
                onClick={(e) => removePhoto(e, link)}
                className="absolute bottom-1 right-1 text-white bg-black bg-opacity-50 rounded-2xl p-3 py-2 cursor-pointer"
              >
                <DeleteSvg />
              </button>
              <button
                onClick={(e) => setAsMainPhoto(e, link)}
                className="absolute bottom-1 left-1 text-white bg-black bg-opacity-50 rounded-2xl p-3 py-2 cursor-pointer"
              >
                {link === addedPhotos[0] && <SolidStarSvg />}
                {link !== addedPhotos[0] && <LightStarSvg />}
              </button>
            </div>
          ))}
        <label className="h-32 cursor-pointer flex justify-around gap-1  border bg-transparent rounded-2xl p-4 text-2xl text-gray-600">
          <input
            multiple
            type="file"
            className="hidden"
            onChange={uploadPhotos}
          />
          <UploadSvg />
          Upload
        </label>
      </div>
    </>
  );
};

export default PhotoUploader;

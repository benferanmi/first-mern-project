import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AccountNav from "./component/AccountNav";
import axios from "axios";
import { PlusSvg } from "./component/SvgComponent";

const PlacesPage = () => { 
  const [places, setPlaces] = useState([])
  useEffect(() => { 
    axios.get('/user-places').then(({data}) => {
      setPlaces(data)
    });
  }, []);
  console.log(places)
  return (
    <div>
      <AccountNav />
        <div className="text-center">
          <br />
          <Link
            className="bg-primary text-white py-2 px-4 rounded-full flex"
            to={"/account/places/new"}
          >
           <PlusSvg />
            Add new place
          </Link>
        </div>

        <div className="mt-4">
          {places.length > 0 && places.map(place => (
            <Link to={'/account/places/'+place._id} className=" flex cursor-pointer bg-gray-100 p-2 rounded-2xl">
              <div className=" flex w-32 h-32 grow shrink-0">
                <PlaceImg place={place} />
              </div>
             <div className="grow-0 shrink">
             <h2 className="text-xl">{place.title}</h2>
              <p className="text-sm mt-2">{place.description}</p>
             </div>
            </Link>
          ))}
        </div>
    </div>
  );
};

export default PlacesPage;

//3.05.16
//4:14:57
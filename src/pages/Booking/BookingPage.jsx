import React, { useEffect, useState } from "react";
import axios from "axios";
import AccountNav from "../component/AccountNav";
import PlaceImg from "../reuseable/PlaceImg";
import { DateSvg, DollarSvg, MoonSvg } from "../component/SvgComponent";
import BookingDate from '../reuseable/BookingDate.jsx'
import { Link } from "react-router-dom";

function BookingPage() {
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    axios.get("/bookings").then((response) => {
      setBookings(response.data);
    });
  }, []);

  return (
    <div>
      <AccountNav />

      <div className="">
        {bookings?.length > 0 &&
          bookings.map((booking) => (
            <Link to={`/account/bookings/${booking._id}`} className="flex gap-4 bg-gray-200 rounded-2xl overflow-hidden">
              <div className="w-48">
                <PlaceImg place={booking.place} />
              </div>
              <div className="py-3 grow pr-3">
                <h2 className="text-xl"> {booking.place.title}</h2>
                <div className="text-xl ">
                 <BookingDate booking={booking} className=" mb-2 mt-4 text-gray-500"/>

                    <div className="flex gap-1">
                  <DollarSvg />
                  
                  <span className="text-lg">Total Price: ${booking.price}
                    </span> 
                        </div>                        
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default BookingPage;

//6:43

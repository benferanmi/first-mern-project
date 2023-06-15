import React, { useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { Navigate } from "react-router-dom";

const BookingWidget = ({ place }) => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [redirect, setRedirect] = useState('');

  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  async function bookThisPlace() {
  
   const response = await axios.post("/bookings", {
    checkIn,
    checkOut,
    numberOfGuests,
    name,
    phone,
    place: place._id,
    price: numberOfNights * place.price,
  });
    const bookingId = response.data._id
    setRedirect(`/account/bookings/${bookingId}`)
  }
  if (redirect) {
    return <Navigate to={redirect} />
  }

  return (
    <>
      <div className="bg-white shadown p-4 rounded-2xl">
        <div className="text-2xl text-center">
          Price: ${place.price} / per night
        </div>

        <div className="border round-2xl mt-4">
          <div className="flex">
            <div className="py-3 px-4 ">
              <label htmlFor="checkin">Check In:</label>
              <input
                type="date"
                id="checkin"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
              />
            </div>
            <div className="py-3 px-4 border-l">
              <label htmlFor="checkout">Check out:</label>
              <input
                type="date"
                id="checkout"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
              />
            </div>
          </div>
          <div className="py-3 px-4 border-t">
            <label htmlFor="guest">Number of Guests</label>
            <input
              type="number"
              id="guest"
              value={numberOfGuests}
              onChange={(e) => setNumberOfGuests(e.target.value)}
            />
          </div>
          {numberOfNights > 0 && (
            <div className="py-3 px-4 border-t">
              <label htmlFor="namef">Your Full Name</label>
              <input
                type="text"
                id="namef"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <label htmlFor="mobile">Your phone Number: </label>
              <input
                type="tel"
                id="mobile"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          )}
        </div>
        <button className="primary mt-4" onClick={bookThisPlace}>
          Book this Place for -
          {numberOfNights > 0 && <span>${numberOfNights * place.price}</span>}
        </button>
      </div>
    </>
  );
};

export default BookingWidget;

//5:53

//diffrenceincalenderdays is not defined.

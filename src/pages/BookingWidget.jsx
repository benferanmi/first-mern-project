import React, {useState} from 'react'

const BookingWidget = ({place}) => {
    const [checkIn, setCheckIn] = useState('')
    const [checkOut, setCheckOut] = useState('')
    const [numberOfGuests, setNumberOfGuests] = useState(1)

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
                  <input type="date" id="checkin"  value={checkIn} onChange={e => setCheckIn(e.target.value)}/>
                </div>
                <div className="py-3 px-4 border-l">
                  <label htmlFor="checkout">Check out:</label>
                  <input type="date" id="checkout" value={checkOut} onChange={e => setCheckOut(e.target.value)}/>
                </div>
              </div>
              <div className="py-3 px-4 border-l">
                <label htmlFor="guest">Number of Guests</label>
                <input type="number" id="guest" value={numberOfGuests} onChange={e => setNumberOfGuests(e.target.value)} />
              </div>
            </div>

            <button className="primary mt-4">Book this Place</button>
          </div>
    </>
  )
}

export default BookingWidget


//5:53
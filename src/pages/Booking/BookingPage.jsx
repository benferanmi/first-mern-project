import React, {useEffect, useState} from 'react'
import axios from 'axios'
import AccountNav from '../component/AccountNav';

function BookingPage() {
    const [bookings, setBookings] = useState([])
    useEffect(() => {
        axios.get('/bookings').then(response => {
            setBookings(response.data)
        });
    }, []);

  return (
    <div>
        <AccountNav />

        <div className="">
            {bookings?.length > 0 && bookings.map(booking => (
                <div>
                    {booking.checkIn} - {booking.checkOut}
                </div>
            ))}
        </div>
    </div>
  )
}

export default BookingPage

//6:25

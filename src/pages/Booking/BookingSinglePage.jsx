import { useParams } from 'react-router-dom'
import {useEffect, useState} from 'react'
import PlaceGallery from '../reuseable/PlaceGallery.jsx';
import AddressLinks from '../reuseable/AddressLinks.jsx';
import BookingDate from '../reuseable/BookingDate.jsx'
import axios from 'axios'

function BookingSinglePage() {
    const {id} = useParams()
    const [booking, setBooking] = useState(null)
    useEffect(() => {
      if (id) {
        axios.get('/bookings').then(response => {
          const foundBooking = response.data.find(({_id}) => _id === id);

          if (foundBooking) {
            setBooking(foundBooking);
          }
        });
      }
    }, [])

    if (!booking) {
      return '';
    }
  return (
    <div className='my-8'>
      < h1 className='text-3xl mb-2'>{booking.place.title}</h1>
      <AddressLinks className='my-2 flex'>{booking.place.address}</AddressLinks>

      <div className='bg-gray-200 p-6 my-6 items-center rounded-2xl flex justify-between' >
    <div>
    <h2 className="text-2xl mb-4">Your Booking Information</h2>
        <BookingDate booking={booking} />
    </div>

    <div className='bg-primary p-6 text-white rounded-2xl'>
      <div className="" >Total Price </div>
      <div className='text-3xl' >{booking.price}</div>
    </div>
       
      </div>
      <PlaceGallery place={booking.place} />

    </div>
  )
}

export default BookingSinglePage

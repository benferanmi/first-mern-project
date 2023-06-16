import {MoonSvg, DateSvg} from '../component/SvgComponent.jsx'
import { differenceInCalendarDays, format } from "date-fns";


const BookingDate = ({booking, className}) => {
    return (
        <div className={"flex gap-1 "+className}>
        <MoonSvg />
        {differenceInCalendarDays(
          new Date(booking.checkOut),
          new Date(booking.checkIn)
        )}
        nights.  <div className="flex gap-1 items-center ml-2">
        {format(new Date(booking.checkIn), "yyyy-MM-dd")}
        <DateSvg />
      </div>
      &rarr;
      <div className="flex gap-1 items-center">
      {format(new Date(booking.checkOut), "yyyy-MM-dd")} <DateSvg />
      </div>
      </div>
    )
}

export default BookingDate;
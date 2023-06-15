import React from 'react'
import { useParams } from 'react-router-dom'

function BookingSinglePage() {
    const {id} = useParams()
  return (
    <div>
      single booking page. {id}
    </div>
  )
}

export default BookingSinglePage

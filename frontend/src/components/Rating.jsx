import React from "react"
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa"

const Rating = ({ rating, totalReviews }) => {
  const stars = []

  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<FaStar key={i} className="text-yellow-500" />)
    } else if (rating >= i - 0.5) {
      stars.push(<FaStarHalfAlt key={i} className="text-yellow-500" />)
    } else {
      stars.push(<FaRegStar key={i} className="text-yellow-500" />)
    }
  }

  return (
    <div className="flex items-center gap-1">
      {stars}
      {totalReviews !== undefined && (
        <span className="pl-2">
          ({totalReviews} đánh giá)
        </span>
      )}
    </div>
  )
}

export default Rating

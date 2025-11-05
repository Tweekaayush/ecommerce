import React from "react";
import { Star, StarHalfIcon } from "lucide-react";

const Rating = ({ rating, size, className }) => {
  return (
    <div className={`flex ${className}`}>
      {new Array(5).fill(0).map((_, i) => {
        const index = i + 1;

        return index <= rating ? (
          <Star key={i} color="gold" fill="gold" size={size} />
        ) : index - rating >= 1 ? (
          <Star key={i} color="gold" size={size} />
        ) : (
          <span key={i} className="relative">
            <Star color="gold" size={size} />
            <StarHalfIcon
              color="gold"
              size={size}
              fill="gold"
              className="absolute top-0 left-0"
            />
          </span>
        );
      })}
    </div>
  );
};

export default Rating;

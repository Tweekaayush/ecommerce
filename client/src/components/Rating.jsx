import React from "react";
import { Star, StarHalfIcon } from "lucide-react";

const Rating = ({ rating }) => {
  return (
    <div className="flex mb-7">
      {new Array(5).fill(0).map((_, i) => {
        const index = i + 1;

        return index <= rating ? (
          <Star key={i} color="gold" fill="gold" size={"20px"} />
        ) : index - rating >= 1 ? (
          <Star key={i} color="gold" size={"20px"} />
        ) : (
          <span className="relative">
            <Star color="gold" size={"20px"} />
            <StarHalfIcon
              color="gold"
              size={"20px"}
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

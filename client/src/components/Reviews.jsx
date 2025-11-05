import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Rating from "./Rating";
import { addReview } from "../features/product.slice";
import { Star, Trash } from "lucide-react";
import Skeleton from "./Skeleton";

const Reviews = () => {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [formErrors, setFormErrors] = useState("");
  const {
    loading: productLoading,
    data: {
      productDetails: { _id, reviews },
    },
  } = useSelector((state) => state.product);
  const {
    loading: userLoading,
    data: {
      user: { _id: userId },
    },
  } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const validate = () => {
    let err = "";
    if (!rating) {
      err = "Please rate the product before submitting the review!";
    }
    if (!review) {
      err = "Please write a review before submitting the review!";
    }

    setFormErrors(err);

    return !err;
  };

  const writeReview = (e) => {
    e.preventDefault();
    if (validate()) {
      dispatch(addReview({ _id: _id, rating, comment: review }));
    }
  };

  return (
    <div className="mt-4 md:mt-0">
      <h1 className="heading-1 text-red-500 text-sm">Write review</h1>
      <form className="flex flex-col" onSubmit={writeReview}>
        <div className="flex">
          {[...Array(5)].map((star, index) => {
            const currentRating = index + 1;
            return (
              <label key={index} style={{ padding: "4px" }}>
                <input
                  type="radio"
                  name="rating"
                  style={{ display: "none" }}
                  value={currentRating}
                  onClick={() => setRating(currentRating)}
                  className="form-input"
                />
                <Star
                  size={18}
                  onMouseEnter={() => setHover(currentRating)}
                  onMouseLeave={() => setHover(null)}
                  fill={currentRating <= (hover || rating) ? "gold" : ""}
                  stroke={currentRating <= (hover || rating) ? "gold" : ""}
                />
              </label>
            );
          })}
        </div>
        <input
          type="text"
          placeholder="Write a review"
          name="review"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          className="p-4 border border-gray-500 rounded-sm my-2.5 outline-none"
        />
        <p className="form-error-msg">{formErrors}</p>
        <input
          type="submit"
          value="Submit"
          className="button-2 mt-2.5 self-start"
          disabled={productLoading}
        />
      </form>
      {!productLoading ? (
        reviews?.length !== 0 ? (
          <ul className="user-reviews">
            {reviews?.map((r) => {
              return (
                <div key={r?._id} className="p-4 bg-gray-100 mt-8">
                  <div className="flex justify-between mb-5">
                    <div>
                      <h1 className="heading-2 text-base">{r?.user?.name}</h1>
                      <div className="flex items-center gap-4">
                        <Rating rating={r?.rating} size={18} />
                        <p className="font-bold text-sm">
                          {r?.rating.toFixed(1)}
                        </p>
                      </div>
                    </div>
                    {r?.user?._id === userId && (
                      <Trash className="w-4 h-4 text-red-500 cursor-pointer" />
                    )}
                  </div>
                  <p className="my-2.5 body-text">{r?.comment}</p>
                </div>
              );
            })}
          </ul>
        ) : (
          <p className="body-text mt-8" style={{ textAlign: "center" }}>
            No reviews yet
          </p>
        )
      ) : (
        <Skeleton classname="w-full h-30 mt-4" />
      )}
    </div>
  );
};

export default Reviews;

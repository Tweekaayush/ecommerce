import React, { useState } from "react";
import ProductSlider from "../components/ProductSlider";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductById,
  getRecommendedProducts,
} from "../features/product.slice";
import { Star } from "lucide-react";
import Rating from "../components/Rating";
import { addToCart } from "../features/cart.slice";
import { addToWishlist } from "../features/user.slice";
import Reviews from "../components/Reviews";
import Skeleton from "../components/Skeleton";

const ProductPage = () => {
  const dispatch = useDispatch();
  const {
    loading: productLoading,
    data: {
      productDetails: {
        _id,
        name,
        image,
        description,
        price,
        countInStock,
        rating,
        numReviews,
        brand,
        category,
      },
      recommendedProducts,
    },
  } = useSelector((state) => state.product);
  const { loading: cartLoading } = useSelector((state) => state.cart);
  const {
    loading: userLoading,
    data: {
      user: { _id: userId },
    },
  } = useSelector((state) => state.user);
  const [quantity, setQuantity] = useState(1);
  const product = {
    title: "product",
    description:
      "        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore voluptates ut magnam ipsam modi quisquam quas nulla libero harum omnis.",
    stock: 43,
    price: 342,
  };

  const { id } = useParams();

  useEffect(() => {
    dispatch(getProductById(id));
    if (_id) dispatch(getRecommendedProducts(category));
    document.title = name;
  }, [id, name]);

  return (
    <>
      <section>
        <div className="container flex flex-col mb-30">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="flex justify-center items-center bg-gray-100">
              {!productLoading ? (
                <img
                  src={image}
                  alt={name}
                  className="w-full mix-blend-multiply"
                />
              ) : (
                <Skeleton classname="w-full h-full" />
              )}
            </div>
            <div className="flex flex-col pt-8 md:p-8">
              {!productLoading ? (
                <h1 className="text-lg md:text-2xl font-bold mb-2.5">{name}</h1>
              ) : (
                <Skeleton classname="w-full h-8 mb-2" />
              )}
              <div className="flex items-center gap-4 mb-8">
                {!productLoading ? (
                  <Rating rating={rating} size={20} />
                ) : (
                  <Skeleton classname="w-40 h-6 mb-2" />
                )}
                {!productLoading ? (
                  <h1 className="text-base">{numReviews} Reviews</h1>
                ) : (
                  <Skeleton classname="w-30 h-6" />
                )}
              </div>
              {!productLoading ? (
                <h1 className="text-base uppercase font-bold tracking-[2px] mb-4 text-black">
                  description
                </h1>
              ) : (
                <Skeleton classname="w-50 h-6 mb-4" />
              )}
              {!productLoading ? (
                <p className="body-text text-gray-800 mb-7">{description}</p>
              ) : (
                <Skeleton classname="w-full h-30 mb-2" />
              )}
              {!productLoading ? (
                <div className="flex items-center mb-4 gap-4">
                  <div className="flex items-center bg-gray-100">
                    <button
                      className="text-black px-3.5 py-2 cursor-pointer font-bold text-xl"
                      onClick={() =>
                        setQuantity((prev) => {
                          return prev === 1 ? 1 : prev - 1;
                        })
                      }
                    >
                      -
                    </button>
                    <span className="text-black px-3.5 py-2 cursor-pointer">
                      {quantity}
                    </span>
                    <button
                      className="text-black px-3.5 py-2 cursor-pointer font-bold text-xl"
                      onClick={() =>
                        setQuantity((prev) => {
                          return prev === countInStock ? prev : prev + 1;
                        })
                      }
                    >
                      +
                    </button>
                  </div>
                  <p
                    className={`${
                      countInStock ? "text-green-500" : "text-red-500"
                    } text-lg tracking-wider`}
                  >
                    {countInStock ? "In Stock" : "Out of Stock"}
                  </p>
                </div>
              ) : (
                <Skeleton classname="w-50 h-10 mb-2" />
              )}
              {!productLoading ? (
                <div className="flex mb-4 font-semibold">
                  <span className="text-xs mt-1">$</span>
                  <h1 className="text-2xl ml-0.5">{price}</h1>
                </div>
              ) : (
                <Skeleton classname="w-24 h-6 mb-2" />
              )}
              <div className="flex items-center gap-4">
                {!productLoading ? (
                  <button
                    className="button-1"
                    onClick={() =>
                      dispatch(
                        addToCart({
                          userId: userId,
                          item: {
                            name,
                            image,
                            price,
                            _id,
                            brand,
                            quantity,
                          },
                        })
                      )
                    }
                    disabled={cartLoading}
                  >
                    Add to cart
                  </button>
                ) : (
                  <Skeleton classname="w-40 h-10 mb-2" />
                )}
                {!productLoading ? (
                  <button
                    className="button-2"
                    onClick={() => {
                      dispatch(addToWishlist(id));
                    }}
                    disabled={userLoading}
                  >
                    wishlist
                  </button>
                ) : (
                  <Skeleton classname="w-40 h-10 mb-2" />
                )}
              </div>
            </div>
          </div>
        </div>
        <ProductSlider title={"Recommended"} products={recommendedProducts} />
        <div className="container mt-30">
          <h1 className="heading-2 text-2xl mb-8">Customer Reviews</h1>
          <div className="w-full grid grid-cols-[1fr] md:grid-cols-[4fr_8fr] gap-4">
            <div className="shadow-card flex flex-col p-4 h-fit">
              {!productLoading ? (
                <Rating rating={rating} size={20} className="mb-1" />
              ) : (
                <Skeleton classname="w-25 h-5 mb-2" />
              )}
              {!productLoading ? (
                <h1 className="mb-4 font-bold text-base">{rating} out of 5</h1>
              ) : (
                <Skeleton classname="w-24 h-4 mb-8" />
              )}
              {!productLoading ? (
                <p className="body-text text-gray-700">{numReviews} total rating(s)</p>
              ) : (
                <Skeleton classname="w-30 h-5 mb-2" />
              )}
            </div>
            <Reviews />
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductPage;

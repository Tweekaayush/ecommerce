import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import { getWishlist } from "../slices/user.slice";

const WishlistPage = () => {
  const dispatch = useDispatch();
  const {
    data: { wishlist },
  } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(getWishlist());
  }, []);
  return (
    <section className="min-h-screen">
      <div className="container flex flex-col gap-4">
        <h1 className="heading-4 uppercase text-red-500 mb-8">Wishlist</h1>
        <div className="grid grid-cols-[1fr]  xs:grid-cols-[1fr_1fr] md:grid-cols-[1fr_1fr_1fr] lg:grid-cols-[1fr_1fr_1fr_1fr] gap-4">
          {wishlist?.map((product) => {
            return <ProductCard key={product?._id} {...product.product} wishlist={true}/>;
          })}
        </div>
      </div>
    </section>
  );
};

export default WishlistPage;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import { getWishlist } from "../features/user.slice";
import Skeleton from "../components/Skeleton";

const WishlistPage = () => {
  const dispatch = useDispatch();
  const {
    loading,
    data: { wishlist },
  } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(getWishlist());
    document.title = 'Your wishlist'
  }, []);
  return (
    <section className="min-h-screen">
      <div className="container flex flex-col gap-4 h-full">
        <h1 className="heading-1 text-red-500 text-xl mb-8">Wishlist</h1>
        {wishlist.length !== 0? (
          <div className="grid grid-cols-[1fr]  xs:grid-cols-[1fr_1fr] md:grid-cols-[1fr_1fr_1fr] lg:grid-cols-[1fr_1fr_1fr_1fr] gap-4">
            {!loading
              ? wishlist?.map((product) => {
                  return (
                    <ProductCard
                      key={product?._id}
                      {...product.product}
                      wishlist={true}
                    />
                  );
                })
              : new Array(4).fill(0).map((_, i) => {
                  return <Skeleton classname="w-full h-96" key={i} />;
                })}
          </div>
        ) : (
          <div className="h-full flex justify-center items-center mt-20">
            <h1 className="heading-1 text-gray-500">Your wishlist is empty!</h1>
          </div>
        )}
      </div>
    </section>
  );
};

export default WishlistPage;

import React from "react";
import { useSelector } from "react-redux";

const ProfilePage = () => {
  const {
    loading,
    data: {
      user: { name, email, createdAt, fullAddress },
    },
  } = useSelector((state) => state.user);
  return (
    <div className="flex flex-col">
      <h1 className="heading-1 text-red-500 text-sm md:text-base mb-12.5">Account</h1>
      {!loading ? (
        <div className="flex flex-col">
          <div className="grid grid-cols-[3fr_9fr] gap-4 p-4">
            <h5 className="heading-1 text-sm">Name</h5>
            <p className="body-text">{name}</p>
          </div>
          <div className="grid grid-cols-[3fr_9fr] gap-4 p-4 bg-gray-100">
            <h5 className="heading-1 text-sm ">Email</h5>
            <p className="body-text"> {email}</p>
          </div>
          <div className="grid grid-cols-[3fr_9fr] gap-4 p-4">
            <h5 className="heading-1 text-sm ">Address</h5>
            <p className="body-text">
              {fullAddress?.address && (
                <>
                  {fullAddress?.address}, {fullAddress?.postalCode}
                  <br />
                  {fullAddress?.city}, {fullAddress?.country}
                </>
              )}
            </p>
          </div>
          <div className="grid grid-cols-[3fr_9fr] gap-4 p-4 bg-gray-100">
            <h5 className="heading-1 text-sm ">Joined On</h5>
            <p className="body-text">{createdAt.substring(0, 10)}</p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {new Array(4).fill(0).map((_, i) => {
            return <Skeleton key={i} classname="w-full h-16" />;
          })}
        </div>
      )}
    </div>
  );
};

export default ProfilePage;

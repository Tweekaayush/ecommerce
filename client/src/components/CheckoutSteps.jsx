import React from "react";

const CheckoutSteps = ({ stepNo, checkoutSteps, setStep }) => {
  return (
    <section>
      <div className="container flex justify-between relative overflow-hidden">
        <span
          className="absolute top-[50%] left-0 bg-green-500 h-1 -z-1 mx-9"
          style={{
            width: `calc(${
              (stepNo - 1) / (checkoutSteps.length - 1)
            }*100% - 55px)`,
          }}
        ></span>
        {checkoutSteps.map((step, i) => {
          return (
            <button
              key={i}
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                stepNo === i + 1
                  ? "bg-blue-500 text-white"
                  : stepNo > i + 1
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-black "
              }`}
              disabled={stepNo < i + 1}
              onClick={() => setStep(i + 1)}
            >
              {checkoutSteps[i].icon}
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default CheckoutSteps;

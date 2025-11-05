import React from "react";

const CheckoutSteps = ({ step, checkoutSteps, setStep }) => {
  return (
    <div className="flex justify-between relative">
      <span
        className="absolute top-[30%] left-0 bg-green-500 h-1 -z-1 mx-9"
        style={{
          width: `calc(${(step - 1) / (checkoutSteps.length - 1)}*100% - 60px)`,
        }}
      ></span>
      {checkoutSteps.map((_, i) => {
        return (
          <div key={i} className="flex flex-col items-center gap-2">
            <button
              key={i}
              className={`w-8 h-8 lg:w-10 lg:h-10 p-2 rounded-full flex items-center justify-center ${
                step === i + 1
                  ? "bg-blue-500 text-white"
                  : step > i + 1
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-black "
              }`}
              onClick={() => setStep(i + 1)}
              disabled={step <= i + 1}
            >
              {checkoutSteps[i].icon}
            </button>
            <h1 className="heading-1 text-[10px] lg:text-xs text-gray-500 text-center">
              {checkoutSteps[i].name}
            </h1>
          </div>
        );
      })}
    </div>
  );
};

export default CheckoutSteps;

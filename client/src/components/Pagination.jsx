import React, { useEffect, useState } from "react";

const Pagination = ({ totalPages, page, setPage }) => {
  const [paginationArray, setPaginationArray] = useState([]);

  const handlePrev = () => {
    setPage(page - 1);
  };
  const handleNext = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    const prevArray = Array.from({ length: 2 }, (_, i) => page - 1 - i)
      .filter((p) => p > 0)
      .reverse();
    const nextArray = Array.from({ length: 3 }, (_, i) => page + i).filter(
      (p) => p <= totalPages
    );
    setPaginationArray([...prevArray, ...nextArray]);
  }, [page, totalPages]);

  return (
    <div className="flex justify-center gap-1 mx-auto mt-7">
      {totalPages !== 0 && paginationArray[0] !== 1 && (
        <button
          onClick={() => setPage(1)}
          className="w-8 h-8 border-1 cursor-pointer"
        >
          {"<<"}
        </button>
      )}
      <button
        onClick={handlePrev}
        disabled={page <= 1}
        className="w-8 h-8 border-1 cursor-pointer"
      >
        {"<"}
      </button>
      {paginationArray?.map((p) => {
        return (
          <button
            key={p}
            onClick={() => setPage(p)}
            className={`${
              page === p ? "bg-black text-white" : ""
            } w-8 h-8 border-1 cursor-pointer`}
          >
            {p}
          </button>
        );
      })}
      <button
        className="w-8 h-8 border-1 cursor-pointer"
        onClick={handleNext}
        disabled={page >= totalPages}
      >
        {">"}
      </button>
      {totalPages !== 0 &&
        paginationArray[paginationArray.length - 1] !== totalPages && (
          <button
            className="w-8 h-8 border-1 cursor-pointer"
            onClick={() => setPage(totalPages)}
          >
            {">>"}
          </button>
        )}
    </div>
  );
};

export default Pagination;

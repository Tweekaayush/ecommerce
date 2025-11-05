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
    const prevLength = totalPages >= page + 2 ? 2 : 5 - (totalPages - page + 1);
    const prevArray = Array.from({ length: prevLength }, (_, i) => page - 1 - i)
      .filter((p) => p > 0)
      .reverse();
    const nextLength =
      prevArray.length <= 2 ? 5 - prevArray.length : 5 - prevArray.length;
    const nextArray = Array.from(
      { length: nextLength },
      (_, i) => page + i
    ).filter((p) => p <= totalPages);
    setPaginationArray([...prevArray, ...nextArray]);
  }, [page, totalPages]);

  return (
    <div className="flex justify-center gap-2 mx-auto mt-7">
      {totalPages !== 0 && paginationArray[0] !== 1 && (
        <button onClick={() => setPage(1)} className="pagination-btn">
          {"<<"}
        </button>
      )}
      <button
        onClick={handlePrev}
        disabled={page <= 1}
        className="pagination-btn"
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
            } pagination-btn`}
          >
            {p}
          </button>
        );
      })}
      <button
        className="pagination-btn"
        onClick={handleNext}
        disabled={page >= totalPages}
      >
        {">"}
      </button>
      {totalPages !== 0 &&
        paginationArray[paginationArray.length - 1] !== totalPages && (
          <button
            className="pagination-btn"
            onClick={() => setPage(totalPages)}
          >
            {">>"}
          </button>
        )}
    </div>
  );
};

export default Pagination;

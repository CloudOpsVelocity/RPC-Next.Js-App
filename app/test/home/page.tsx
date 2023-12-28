"use client";
import useCarouselData from "@/app/hooks/useCarouselData";
import React, { useCallback, useState } from "react";

export default function Page() {
  const [currentPage, setCurrentPage] = useState(1);
  const { isLoading, data, pageCount } = useCarouselData(currentPage);
  const totalPages = Math.ceil(pageCount / 4);

  const handleLoadNextData = useCallback(() => {
    setCurrentPage((prevPage) => {
      return prevPage < totalPages ? prevPage + 1 : prevPage;
    });
  }, [totalPages]);

  const handleLoadPrevData = useCallback(() => {
    setCurrentPage((prevPage) => {
      return prevPage > 1 ? prevPage - 1 : prevPage;
    });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-20">
      {JSON.stringify(data)}
      {JSON.stringify({ pageCount })}
      <button onClick={handleLoadPrevData} disabled={currentPage === 1}>
        Prev Page
      </button>
      <button
        onClick={handleLoadNextData}
        disabled={currentPage === totalPages}
      >
        Load Next Page
      </button>
    </div>
  );
}

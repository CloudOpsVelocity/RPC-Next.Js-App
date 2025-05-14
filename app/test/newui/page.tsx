"use client";
import React from "react";

const EventBubblingThreeContainers: React.FC = () => {
  const handleWrapperClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    console.log("%cWrapper clicked", "color: purple; font-weight: bold");
  };

  const handleContainerClick = (
    containerId: number,
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    console.log(
      `%cContainer ${containerId} clicked`,
      "color: green; font-weight: bold"
    );
    e.stopPropagation();
  };

  const handleCardClick = (
    cardId: number,
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    console.log(`%cCard ${cardId} clicked`, "color: blue; font-weight: bold");
    e.stopPropagation(); // Uncomment to stop bubbling at card level
  };

  return (
    <div
      // onClick={()}
      className="p-8 bg-purple-100 min-h-screen flex justify-center gap-8 pt-[10%]"
    >
      {[1, 2, 3].map((id) => (
        <div
          key={id}
          data-id={`container-${id}`}
          // onClickCapture={(e) => handleContainerClick(id, e)}
          className="p-6 bg-green-100 rounded-lg shadow-lg"
        >
          <div
            data-id={`card-${id}`}
            // onClick={(e) => handleCardClick(id, e)}
            className="w-40 h-24 bg-blue-100 shadow-md rounded-md flex items-center justify-center cursor-pointer hover:bg-blue-200 transition"
          >
            Card {id}
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventBubblingThreeContainers;

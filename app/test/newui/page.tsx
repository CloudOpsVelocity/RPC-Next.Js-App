"use client";
import React from "react";

const EventBubblingThreeContainers: React.FC = () => {
  let a = 10;
  function getDetails() {
    let name = "virender";
    console.log(a);
  }
  console.dir(getDetails);

  return <div>sdfds</div>;
};

export default EventBubblingThreeContainers;

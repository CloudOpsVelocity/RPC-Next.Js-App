import axios from "axios";
import React from "react";

export default async function page() {
  const data = await getCarouselData();
  return <div>{JSON.stringify(data)}</div>;
}
const getCarouselData = async () => {
  const res = await axios.get(
    `http://localhost:8081/project/new-launch-project?page=${1}`
  );
  return res.data;
};

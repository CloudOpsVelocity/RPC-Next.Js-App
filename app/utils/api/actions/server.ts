"use server";

const addRating = async (formData: FormData) => {
  const ratingItem = formData.get("review");
  console.log(ratingItem);
};
export { addRating };

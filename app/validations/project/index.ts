import * as yup from "yup";
const ratingSchema = yup.object().shape({
  review: yup
    .string()
    .matches(/^[a-zA-Z\s]*$/, "Only letters and spaces are allowed")
    .max(1500, "Review should not exceed 1500 characters")
    .required("Review is required"),

  rating: yup
    .number()
    .min(0, " Rating must be at least 0")
    .max(5, " Rating must be at most 5")
    .required("Rating is required"),
});

export { ratingSchema };

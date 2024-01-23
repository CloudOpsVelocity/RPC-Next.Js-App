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

const reqSchema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[a-zA-Z\s]*$/, "Only letters and spaces are allowed")
    .max(20, "Name should not exceed 20 characters")
    .required("Full name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  mobile: yup
    .number()
    .positive("Mobile number must be positive")
    .integer("Mobile number must be an integer")
    .typeError("Valid 10-digit contact number is required")
    .test(
      "len",
      "Mobile number must be exactly 10 digits",
      (val) => val?.toString().length === 10
    )
    .required("Mobile number is required"),
});
const qnaSchema = yup.object().shape({
  question: yup
    .string()
    .required("Question is required")
    .max(1500, "Question should not exceed 1500 characters"),
});
export { ratingSchema, reqSchema, qnaSchema };

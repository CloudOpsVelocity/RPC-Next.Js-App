import * as yup from "yup";
const schema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[a-zA-Z\s]*$/, "Only letters and spaces are allowed")
    .max(128, "Name should not exceed 128 characters")
    .required("Full name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(1, "Password is required")
    .required("Password is required"),
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
const agentSchema = yup.object().shape({
  userName: yup
    .string()
    .matches(/^[a-zA-Z\s]*$/, "Only letters and spaces are allowed")
    .max(128, "Name should not exceed 128 characters")
    .required("Full name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(1, "Password is required")
    .required("Password is required"),
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
const otpSchema = yup.object().shape({
  otp: yup
    .number()
    .typeError("OTP must be a number")
    .positive("OTP must be a positive number")
    .integer("OTP must be an integer")
    .min(1000, "OTP must be exactly 4 digits")
    .max(9999, "OTP must be exactly 4 digits")
    .required("OTP is required"),
});
export { schema as individualSchema, agentSchema, otpSchema };

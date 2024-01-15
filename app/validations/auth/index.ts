import * as yup from "yup";
const schema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[a-zA-Z\s]*$/, "Only letters and spaces are allowed")
    .max(20, "Name should not exceed 20 characters")
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
    .max(20, "Name should not exceed 20 characters")
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
    .typeError("Plese enter a valid OTPr")
    .positive("OTP must be a positive number")
    .integer("OTP must be an integer")
    .min(1000, "Plese enter a valid OTP")
    .max(9999, "OTP must be exactly 4 digits")
    .required("OTP is required"),
});
const builderSchema = yup.object().shape({
  companyName: yup
    .string()
    .trim()
    .min(2, "Company name must be at least 2 characters")
    .required("Company name is required"),

  branchName: yup
    .array()
    .min(1, "At least one branch must be selected")
    .required("At least one branch must be selected"),

  ceoName: yup.string().trim().required("CEO name is required"),

  foundedBy: yup.string().trim().required("Founded By name is required"),

  managingDirectorName: yup
    .string()
    .trim()
    .required("Managing Director name is required"),

  officeContact: yup
    .string()
    .matches(/^\d+$/, "Valid 10-digit contact number is required")
    .min(10, "Valid 10-digit contact number is required")
    .max(10, "Valid 10-digit contact number is required")
    .required("Valid 10-digit contact number is required"),

  // Add more validations for other fields as needed
});

export { schema as individualSchema, agentSchema, otpSchema, builderSchema };

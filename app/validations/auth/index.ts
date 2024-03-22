import * as yup from "yup";
const schema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[a-zA-Z\s]*$/, "Only letters and spaces are allowed")
    .max(40, "Name should not exceed 40 characters")
    .required("Full name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  mobile: yup
    .number()
    .positive("Mobile number must be positive")
    .integer("Mobile number must be an integer")
    .typeError("Mobile number is required")
    .test("mvalid", "Invalid mobile number", (val) => {
      const strVal = val?.toString();
      return /^[6-9]\d{9}$/.test(strVal ?? "");
    })
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
    .max(40, "Name should not exceed 40 characters")
    .required("Full name is required"),
  email: yup
    .string()
    .matches(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid email")
    .required("Email is required")
    .email("Invalid email"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  mobile: yup
    .number()
    .positive("Mobile number must be positive")
    .integer("Mobile number must be an integer")
    .typeError("Mobile number is required")
    .test("mvalid", "Invalid mobile number", (val) => {
      const strVal = val?.toString();
      return /^[6-9]\d{9}$/.test(strVal ?? "");
    })
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
    .typeError("OTP is required")
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
    .min(2, "Builder name must be at least 2 characters")
    .required("Builder name is required"),

  branch: yup
    .array()
    .min(1, "At least one branch must be selected")
    .required("At least one branch must be selected"),

  ceoName: yup
    .string()
    .required("CEO name is required")
    .matches(/^[a-zA-Z\s]*$/, "Only letters and spaces are allowed")
    .max(40, "Name should not exceed 40 characters"),

  foundedBy: yup
    .string()
    .trim()
    .required("Founded By name is required")
    .matches(/^[a-zA-Z\s]*$/, "Only letters and spaces are allowed")
    .max(40, "Name should not exceed 40 characters"),

  managingDirectorName: yup
    .string()
    .trim()
    .required("Managing Director name is required")
    .matches(/^[a-zA-Z\s]*$/, "Only letters and spaces are allowed")
    .max(40, "Name should not exceed 40 characters"),
  officeContact: yup
    .string()
    .matches(/^[\d()+-]+$/, "Invalid office contact number")
    .required("office contact number is required")
    .max(17, "Mobile number should not exceed 17 digits"),

  companyStartDate: yup.date().required("Company start date is required"),
});

const textAreaScema = yup.object().shape({
  vission: yup
    .string()
    .max(5000, "Vission should not exceed 5000 characters")
    .required("Vission is required"),
  mission: yup
    .string()
    .max(5000, "Mission should not exceed 5000 characters")
    .required("Mission is required"),
});
export {
  schema as individualSchema,
  agentSchema,
  otpSchema,
  builderSchema,
  textAreaScema,
};

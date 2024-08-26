import * as yup from "yup";
const nameRegex = /^[a-zA-Z\s.]*$/;
const itemSchema = yup.object().shape({
  name: yup.string().trim().max(40, "Name should not exceed 40 characters"),
});

const schema = yup.object().shape({
  name: yup
    .string()
    .matches(nameRegex, "Numbers and special characters are not allowed")
    .max(40, "Name should not exceed 40 characters")
    .required("Full name is required"),
  email: yup
    .string()
    .matches(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please enter a valid Email address"
    )
    .required("Email is required")
    .email("Please enter a valid Email address"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 Characters long")
    .required("Password is required"),
  mobile: yup
    .number()
    .positive("Contact number must be positive")
    .integer("Contact number must be an integer")
    .typeError("Contact number is required")
    .test("mvalid", "Enter Valid Contact Number", (val) => {
      const strVal = val?.toString();
      return /^[6-9]\d{9}$/.test(strVal ?? "");
    })
    .test(
      "len",
      "Contact number must be exactly 10 digits",
      (val) => val?.toString().length === 10
    )
    .required("Contact number is required"),
});
const agentSchema = yup.object().shape({
  userName: yup
    .string()

    .max(80, "Name should not exceed 80 characters")
    .required("Full name is required"),
  email: yup
    .string()
    .trim()
    .matches(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please enter a valid Email address"
    )
    .required("Email is required")
    .email("Please enter a valid Email address"),
  password: yup
    .string()
    .min(6, "Password must be at-least 6 digits")
    .required("Password is required"),
  mobile: yup
    .number()
    .positive("Contact number must be positive")
    .integer("Contact number must be an integer")
    .typeError("Contact number is required")
    .test("mvalid", "Enter Valid Contact Number", (val) => {
      const strVal = val?.toString();
      return /^[6-9]\d{9}$/.test(strVal ?? "");
    })
    .test(
      "len",
      "Contact number must be exactly 10 digits",
      (val) => val?.toString().length === 10
    )
    .required("Contact number is required"),
});
export const builderFirstStepSchema = yup.object().shape({
  userName: yup
    .string()
    .max(80, "Name should not exceed 80 characters")
    .required("Builder name is required"),
  email: yup
    .string()
    .trim()
    .matches(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please enter a valid Email address"
    )
    .required("Email is required")
    .email("Please enter a valid Email address"),
  password: yup
    .string()
    .min(6, "Password must be at-least 6 digits")
    .required("Password is required"),
  mobile: yup
    .number()
    .positive("Contact number must be positive")
    .integer("Contact number must be an integer")
    .typeError("Contact number is required")
    .test("mvalid", "Enter Valid Contact Number", (val) => {
      const strVal = val?.toString();
      return /^[6-9]\d{9}$/.test(strVal ?? "");
    })
    .test(
      "len",
      "Contact number must be exactly 10 digits",
      (val) => val?.toString().length === 10
    )
    .required("Contact number is required"),
});
export const agentSchema1 = yup.object().shape({
  address: yup
    .string()
    .trim()
    .min(2, "Address must be at least 2 characters")
    .required("Address is required"),
  companyName: yup
    .string()
    .trim()
    .min(2, "Company name must be at least 2 characters")
    .required("Company name is required"),
});
const otpSchema = yup.object().shape({
  otp: yup
    .number()
    .typeError("OTP is required")
    .positive("OTP must be a positive number")
    .integer("OTP must be an integer")
    .min(1000, "OTP is required")
    .max(9999, "OTP is required")
    .required("OTP is required"),
});
const builderSchema = yup.object().shape({
  companyName: yup
    .string()
    .trim()
    .min(2, "Builder company came by must be at least 2 characters")
    .required("Builder company name is required"),

  branch: yup
    .array()
    .min(1, "At least one branch must be selected")
    .required("At least one branch must be selected"),

  ceoName: yup
    .array()
    .of(itemSchema)
    .test(
      "first-item-name-validation",
      "CEO by name is required",
      function (value) {
        const { path, createError } = this;

        // Ensure there is at least one item in the array
        if (value && value.length > 0) {
          const firstItem = value[0];
          const firstItemName = firstItem.name;

          // Define the name validation schema
          const nameValidation = yup
            .string()
            .trim()
            .required("CEO by name is required")
            .matches(nameRegex, "Only letters and spaces are allowed")
            .max(40, "Name should not exceed 40 characters");

          // If the name field of the first item does not pass validation, create an error
          if (!nameValidation.isValidSync(firstItemName)) {
            return createError({
              path: `${path}[0].name`, // Path to the specific field
              // @ts-ignore
              message: nameValidation.describe().tests[0]?.message, // Error message
            });
          }
        }

        // If the array is empty or the first item is valid, validation is considered successful
        return true;
      }
    ),

  foundedBy: yup
    .array()
    .of(itemSchema)
    .test(
      "first-item-name-validation",
      "Founded by name is required",
      function (value) {
        const { path, createError } = this;

        // Ensure there is at least one item in the array
        if (value && value.length > 0) {
          const firstItem = value[0];
          const firstItemName = firstItem.name;

          // Define the name validation schema
          const nameValidation = yup
            .string()
            .trim()
            .required("Founded by name is required")
            .matches(nameRegex, "Only letters and spaces are allowed")
            .max(40, "Name should not exceed 40 characters");

          // If the name field of the first item does not pass validation, create an error
          if (!nameValidation.isValidSync(firstItemName)) {
            return createError({
              path: `${path}[0].name`, // Path to the specific field
              // @ts-ignore
              message: nameValidation.describe().tests[0]?.message, // Error message
            });
          }
        }

        // If the array is empty or the first item is valid, validation is considered successful
        return true;
      }
    ),

  managingDirectorName: yup
    .array()
    .of(itemSchema)
    .test(
      "first-item-name-validation",
      "Managing Director by name is required",
      function (value) {
        const { path, createError } = this;

        // Ensure there is at least one item in the array
        if (value && value.length > 0) {
          const firstItem = value[0];
          const firstItemName = firstItem.name;

          // Define the name validation schema
          const nameValidation = yup
            .string()
            .trim()
            .required("Managing Director name is required")
            .matches(nameRegex, "Only letters and spaces are allowed")
            .max(40, "Name should not exceed 40 characters");

          // If the name field of the first item does not pass validation, create an error
          if (!nameValidation.isValidSync(firstItemName)) {
            return createError({
              path: `${path}[0].name`, // Path to the specific field
              // @ts-ignore
              message: nameValidation.describe().tests[0]?.message, // Error message
            });
          }
        }

        // If the array is empty or the first item is valid, validation is considered successful
        return true;
      }
    ),
  officeContact: yup
    .string()
    .matches(/^[\d()+-]+$/, "Invalid office contact number")
    .required("Office contact number is required")
    .max(17, "Mobile number should not exceed 17 digits"),

  companyStartDate: yup.date().required("Company start date is required"),
});
export const builderSchemaIndex1 = yup.object().shape({
  address: yup.string().min(1, "Office Address is required"),
  state: yup.string().trim().required("State is required"),
  city: yup.string().trim().required("City is required"),
  pincode: yup
    .string()
    .required("PIN code is required")
    .matches(/^[1-9][0-9]{5}$/, "Valid 6-digit PIN code is required"),
});

const textAreaScema = yup.object().shape({
  vission: yup
    .string()
    .max(5000, "Vision should not exceed 5000 characters")
    .required("Company Vision is required"),
  mission: yup
    .string()
    .max(5000, "Description should not exceed 5000 characters")
    .required("Builder's Description is required"),
});
export {
  schema as individualSchema,
  agentSchema,
  otpSchema,
  builderSchema,
  textAreaScema,
};

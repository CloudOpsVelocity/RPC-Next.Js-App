import { ChangeEvent } from "react";
import { useForm } from "@mantine/form";

// Utility function to trim and replace multiple spaces with a single space
const handleTrimAndReplace = (
  e: ChangeEvent<HTMLInputElement>,
  fieldName: string,
  form: any
) => {
  const value = e.target.value.trim().replace(/\s+/g, " ");
  form.setFieldValue(fieldName, value);
};

export default handleTrimAndReplace;

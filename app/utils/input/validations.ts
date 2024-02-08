import { ChangeEvent } from "react";
import { useForm } from "@mantine/form";

// Utility function to trim and replace multiple spaces with a single space
const handleTrimAndReplace = (
  e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  fieldName: string,
  form: any,
  type?: "dis" | "full"
) => {
  const value = e.target.value.trim().replace(/\s+/g, " ");
  type === "dis"
    ? form(fieldName, value)
    : form.setFieldValue(fieldName, value);
};

export default handleTrimAndReplace;

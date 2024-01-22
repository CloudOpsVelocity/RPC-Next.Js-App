import { createFormContext } from "@mantine/form";

// Definition of form values is required
interface FormValues {
  units: number;
}

// createFormContext returns a tuple with 3 items:
// FormProvider is a component that sets form context
// useFormContext hook return form object that was previously set in FormProvider
// useForm hook works the same way as useForm exported from the package but has predefined type
const [FormProvider, useFormContext, useForm] = createFormContext<FormValues>();

export { FormProvider, useFormContext, useForm };

import { createFormContext } from "@mantine/form";

// Definition of form values is required
interface FormValues {
  units: number;
  selectedTower: string;
  selectedBlock: string;
  selectedFloor: string;
  selectedUnitNumber: string;
  selectedFacing: string;
  superBuiltUpArea: string;
  carpetArea: string;
  gardenArea: string;
  terraceArea: string;
  carParking: string;
  parkingType: string;
  numberOfBalcony: string;
  numberOfBathroom: string;
  balconySize: string;
  plotArea: string;
  plotLength: string;
  plotBreadth: string;
}
const [FormProvider, useFormContext, useForm] = createFormContext<any>();

export { FormProvider, useFormContext, useForm };

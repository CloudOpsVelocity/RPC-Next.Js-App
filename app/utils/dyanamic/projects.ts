import { projectprops } from "@/app/data/projectDetails";

export function setPropertyValues(data: any, propCgId: number): any {
  console.log(data);
  let updatedValues: any = {
    ...(data.facingName !== "Don't Know" && { facingName: data?.facingName }),
    bhkName: data?.bhkName,
    towerName: data?.towerName,
    unitNumber: data?.unitNumber,
    superBuildUparea: data?.superBuildUparea,
    caretarea: data?.caretarea,
    floor: data?.floor?.toString(),
    ...(data?.parkingType !== "None" && { parkingType: data?.parkingType }),
    noOfCarParking: data?.noOfCarParking?.toString(),
    ...(data?.totalNumberOfBalcony > 0 && {
      totalNumberOfBalcony: data?.totalNumberOfBalcony?.toString(),
    }),
    totalNumberofBathroom: data?.totalNumberofBathroom?.toString(),
    ...(data?.block && { block: data?.block }),
  };

  switch (propCgId) {
    case projectprops.apartment:
      break;

    case projectprops.villament:
      return {
        towerName: data?.towerName,
        unitNumber: data?.unitNumber,
        bhkName: data?.bhkName,
        floor: data?.floor?.toString(),
        facingName: data?.facingName,
        superBuildUparea: data?.superBuildUparea,
        ...(data?.caretarea && { caretarea: data?.caretarea }),
        ...(data.gardenArea && { gardenArea: data?.gardenArea }),
        ...(data?.parkingArea != "None" &&
          data?.parkingArea && { parkingArea: data?.parkingArea }),
        ...(data?.terraceArea &&
          data?.terraceArea !== "null" && { terraceArea: data?.terraceArea }),
        ...(data?.noOfCarParking > 0 && {
          noOfCarParking: data?.noOfCarParking?.toString(),
        }),
        ...(data?.totalNumberOfBalcony > 0 && {
          totalNumberOfBalcony: data?.totalNumberOfBalcony?.toString(),
        }),
        totalNumberofBathroom: data?.totalNumberofBathroom?.toString(),
        ...(data?.totalBalconySize && {
          totalBalconySize: data?.totalBalconySize?.toString(),
        }),
      };
      break;

    case projectprops.rowHouse:
      return {
        ...(data.facingName !== "Don't Know" && {
          facingName: data?.facingName,
        }),
        bhkName: data?.bhkName,
        unitNumber: data?.unitNumber,
        superBuildUparea: data?.superBuildUparea,
        caretarea: data?.caretarea,
        floor: data?.floor?.toString(),
        noOfCarParking: data?.noOfCarParking?.toString(),
        ...(data?.totalNumberOfBalcony > 0 && {
          totalNumberOfBalcony: data?.totalNumberOfBalcony?.toString(),
        }),
        totalNumberofBathroom: data?.totalNumberofBathroom?.toString(),
        ...(data?.gardenArea && { gardenArea: data?.gardenArea }),
        parkingArea: data?.parkingArea,
        ...(data?.terraceArea &&
          data?.terraceArea !== "null" && { terraceArea: data?.terraceArea }),
        plotArea: data?.plotArea.toString(),
        ...(data?.parkingArea != "None" &&
          data?.parkingArea && { parkingArea: data?.parkingArea }),
      };
      break;
    case projectprops.villa:
      return {
        ...(data.facingName !== "Don't Know" && {
          facingName: data?.facingName,
        }),
        bhkName: data?.bhkName,
        unitNumber: data?.unitNumber,
        superBuildUparea: data?.superBuildUparea,
        caretarea: data?.caretarea,
        floor: data?.floor?.toString(),
        noOfCarParking: data?.noOfCarParking?.toString(),
        ...(data?.totalNumberOfBalcony > 0 && {
          totalNumberOfBalcony: data?.totalNumberOfBalcony?.toString(),
        }),
        totalNumberofBathroom: data?.totalNumberofBathroom?.toString(),
        ...(data?.gardenArea && { gardenArea: data?.gardenArea }),
        ...(data?.parkingArea != "None" &&
          data?.parkingArea && {
            parkingArea: data?.parkingArea,
          }),
        ...(data?.terraceArea &&
          data?.terraceArea !== "null" && { terraceArea: data?.terraceArea }),
        plotArea: data?.plotArea.toString(),
      };
      break;
    case projectprops.plot:
      return {
        unitNumber: data?.unitNumber,
        facingName: data.facingName,
        plotArea: data.plotArea.toString(),
        width: data.width.toString(),
        length: data.length.toString(),
      };
      break;

    default:
      break;
  }

  return updatedValues;
}

export const get_posted_by = (str?: string) => {
  switch (str) {
    case "I":
      return "Owner";
      break;
    case "A":
      return "Agent";
      break;

    default:
      return "Builder";
      break;
  }
};

export const isReraverified = (str: string) => {
  return str === "Applied" || str === "Recieved";
};

export function getStringPartByIndex(
  input: string,
  index: number
): string | null {
  const parts = input?.split("_");
  if (index >= 0 && index < parts?.length) {
    return parts[index];
  }
  return null; // Return null if the index is out of bounds
}

import { projectprops } from "@/app/data/projectDetails";

export function setPropertyValues(data: any, propCgId: number): any {
  console.log(data);
  let updatedValues: any = {
    facingName: data?.facingName,
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
        ...(data?.parkingArea != "None" && { parkingArea: data?.parkingArea }),
        ...(data?.terraceArea && { terraceArea: data?.terraceArea }),
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
        facingName: data?.facingName,
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
        gardenArea: data?.gardenArea,
        parkingArea: data?.parkingArea,
        terraceArea: data?.terraceArea,
        plotArea: data?.plotArea.toString(),
      };
      break;
    case projectprops.villa:
      return {
        facingName: data?.facingName,
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
        gardenArea: data?.gardenArea,
        parkingArea: data?.parkingArea,
        terraceArea: data?.terraceArea,
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

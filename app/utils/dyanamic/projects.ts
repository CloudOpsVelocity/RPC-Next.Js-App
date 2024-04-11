import { projectprops } from "@/app/data/projectDetails";

export function setPropertyValues(data: any, propCgId: number): any {
  let updatedValues: any = {
    facingName: data?.facingName,
    bhkName: data?.bhkName,
    towerName: data?.towerName,
    unitNumber: data?.unitNumber,

    superBuildUparea: data?.superBuildUparea,
    caretarea: data?.caretarea,
    floor: data?.floor?.toString(),
    parkingType: data?.parkingType,
    noOfCarParking: data?.noOfCarParking?.toString(),
    totalNumberOfBalcony: data?.totalNumberOfBalcony?.toString(),
    totalNumberofBathroom: data?.totalNumberofBathroom?.toString(),
    ...(data?.block && { block: data?.block }),
  };

  switch (propCgId) {
    case projectprops.apartment:
      break;

    case projectprops.villament:
      return {
        unitNumber: data?.unitNumber,
        bhkName: data?.bhkName,
        towerName: data?.towerName,
        floor: data?.floor?.toString(),
        facingName: data?.facingName,
        superBuildUparea: data?.superBuildUparea,
        caretarea: data?.caretarea,
        gardenArea: data?.gardenArea,
        parkingArea: data?.parkingArea,
        terraceArea: data?.terraceArea,
        noOfCarParking: data?.noOfCarParking?.toString(),
        totalNumberOfBalcony: data?.totalNumberOfBalcony?.toString(),
        totalNumberofBathroom: data?.totalNumberofBathroom?.toString(),
        totalBalconySize: data?.totalBalconySize?.toString(),
      };
      break;

    case projectprops.rowHouse:
      return {
        facingName: data?.facingName,
        bhkName: data?.bhkName,
        towerName: data?.towerName,
        unitNumber: data?.unitNumber,
        superBuildUparea: data?.superBuildUparea,
        caretarea: data?.caretarea,
        floor: data?.floor?.toString(),
        noOfCarParking: data?.noOfCarParking?.toString(),
        totalNumberOfBalcony: data?.totalNumberOfBalcony?.toString(),
        totalNumberofBathroom: data?.totalNumberofBathroom?.toString(),
        gardenArea: data?.gardenArea,
        parkingArea: data?.parkingArea,
        terraceArea: data?.terraceArea,
      };
      break;
    case projectprops.villa:
      return {
        facingName: data?.facingName,
        bhkName: data?.bhkName,
        towerName: data?.towerName,
        unitNumber: data?.unitNumber,
        superBuildUparea: data?.superBuildUparea,
        caretarea: data?.caretarea,
        floor: data?.floor?.toString(),
        noOfCarParking: data?.noOfCarParking?.toString(),
        totalNumberOfBalcony: data?.totalNumberOfBalcony?.toString(),
        totalNumberofBathroom: data?.totalNumberofBathroom?.toString(),
        gardenArea: data?.gardenArea,
        parkingArea: data?.parkingArea,
        terraceArea: data?.terraceArea,
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

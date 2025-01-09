export interface PropertyUnit {
  unitIdEnc: string;
  projIdEnc: string;
  bhkName: string;
  towerName: string;
  floor: number;
  unitNumber: string;
  facingName: string;
  caretarea: string;
  superBuildUparea: string;
  terraceArea: string;
  parkingType: string;
  totalNumberofBathroom: number;
  totalNumberOfBalcony: number;
  noOfCarParking: number;
  floorPlanUrl: string;
  block: string;
  plotArea: string;
  width: string;
  length: string;
}

export interface TabItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

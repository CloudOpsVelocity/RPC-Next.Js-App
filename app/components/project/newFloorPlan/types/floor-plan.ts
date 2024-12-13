export interface PropertyUnit {
  id: string;
  type: string;
  bhk: string;
  bedrooms: number;
  bathrooms: number;
  tower: string;
  unitNumber: string;
  builtupArea: number;
  facing: string;
  carParking: number;
  floorPlanImage?: string;
}

export interface TabItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

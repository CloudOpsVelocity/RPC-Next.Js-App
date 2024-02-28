export interface Main {
  propIdEnc: string;
  propName: string;
  propTypeName: string;
  projIdEnc: string;
  postedById: number;
  postedByType: string;
  cg: string;
  stateName: string;
  ctName: string;
  ltName: string;
  pinCode: number;
  address: string;
  bhkName: string;
  facingName: string;
  tower: string;
  block: string;
  atFloor: number;
  totalFloor: number;
  unitNumber: string;
  nobt: number;
  nobl: number;
  furnshName: string;
  flooringType: string;
  availablityStatus: string;
  availableFrom: string;
  possassionDate: string;
  ca: string;
  sba: string;
  noocp: number;
  noobp: number;
  noccp: number;
  nocbp: number;
  price: number;
  otherPrice: OtherPrice;
  agrementduration: string;
  noticemonth: string;
  preferedTenent: string;
  isOkWithBrokerContact: number;
  projMedia: ProjMedia;
  amenities: number[];
  phaseName: string;
  otherRooms: string;
  ownershipName: string;
}

export interface OtherPrice {
  price: string;
  otherCharge: string;
  elctCharge: string;
  waterCharge: string;
  maintananceChargess: string;
}

export interface ProjMedia {
  coverImageUrl: string;
  floorPlanUrl: string;
}

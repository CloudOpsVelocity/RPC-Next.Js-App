export interface Main {
  projectName: string;
  projIdEnc: string;
  projectStatus: string;
  postedBy: string;
  minPrice: number;
  maxPrice: number;
  basePrice: number;
  totalLandArea: string;
  totalUnit: number;
  startDate: string;
  endDate: string;
  lat: string;
  lang: string;
  address: string;
  localityName: string;
  cityName: string;
  stateName: string;
  pinCode: number;
  media: Media;
  availableProperties: string[];
  phaseList: PhaseList[];
  amenityList: AmenityList[];
  specificationList: SpecificationList[];
  highlights: string[];
  wbtp: string;
  faqs: FAQ[];
  about: string;
  banks: Bank[];
  floorPlanCount: number;
}

export interface AmenityList {
  name: string;
  id: number;
}

export interface Bank {
  cid: number;
  constDesc: string;
}

export interface FAQ {
  qnaId: null;
  que: string;
  ans: string;
}

export interface Media {
  coverUrl: string;
  projReviewVideoUrl: string;
  projMasterPlanUrl: string;
  projWalkThroughVideoUrl: string;
  otherImgUrl: string[];
}

export interface PhaseList {
  phaseId: number;
  phaseName: string;
  slug: string;
}

export interface SpecificationList {
  specId: number;
  specName: string;
  values: string[];
}

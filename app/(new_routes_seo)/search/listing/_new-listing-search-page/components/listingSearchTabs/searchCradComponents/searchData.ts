import { generateListingLinkUrl } from "@/app/utils/linkRouters/ListingLink";
import { createProjectLinkUrl } from "@/app/utils/linkRouters/ProjectLink";

export interface TopLeftSectionData {
    src: string;
    projName: string;
    projstatus: string;
    type: string;
    availableFrom: string;
    possassionDate: string;
    propStatus: string;
    propTypeName: string;
    pageUrl: string;
    rerastatus: string;
    projOrPropName: string;
    furnish:string;
    isUsed: string;
} 

// export interface TopRightSectionData {
//     projName: string;
//     phaseName: string;
//     phaseCount: number;
//     minPrice: number;
//     maxPrice: number;
//     sortedBhks: string[]; // adjust if it's something else
//     propType: string;
//     cg: string;
//     city: string;
//     locality: string;
//     postedByName: string;
//     builderCity: string;
//     cityName: string;
//     projIdEnc: string;
//     localityName: string;
//     propName: string;
//     address: string;
//     postedBy: string;
//     type:string;
//     otherCharges: any;
//     bhkName:string[];
//     propTypeName:string;
//     category:string;
//     price:string;
//     projectAbout:string;
//     usp:string;
//     compareAdded: string;
//     shortListed: string;
// }

export interface ApprovedNamesSectionData {
    landArea: number;
    type: string;
    ca: number;
    sba: number;
    propertyAge: string;
    propTypeName: string;
    pa: number;
    maxSba: number;
    minSba: number;
    minCa: number;
    maxCa: number;
    noOfUnits: number;
    parking: string;
    balcony: string;
    bathroom: string;
    ownership: string;
    coverParking: string;
    propTypeId: number;
    minPa: number;
    maxPa: number;
    propStatus: string;
    towerData: string;
    availableFor: string;
    projAuthority: string;
    approvedById: string;
} 

export interface topCornerRightSectionData {    
    category: string; 
    type: string; 
    basePrice: number;  
    sqftPrice: number; 
    floorPlan: string; 
    Sh: string; 
    brochureUrl: string; 
    amenCount: number; 
    propTypeName: string; 
    atFloor: number; 
    facing: string; 
    towerName: string;
    projOrPropName: string
} 


type RawTopLeftData = Partial<TopLeftSectionData> & {
    coverImage?: string;
    coverUrl?: string;
  };

  export const sanitizeTopLeftSectionData = (
    rawData: RawTopLeftData
  ): TopLeftSectionData => ({    
    src: rawData.coverUrl ? rawData.coverUrl : rawData.coverImage ?? "",
    projName: rawData.projName ?? "",
    projstatus: rawData.projstatus ?? "",
    type: rawData.type ?? "",
    availableFrom: rawData.availableFrom ?? "",
    possassionDate: rawData.possassionDate ?? "",
    propStatus: rawData.propStatus ?? "",
    propTypeName: rawData.propTypeName ?? "",
    pageUrl: rawData.pageUrl ?? "",
    rerastatus: rawData.rerastatus ?? "",
    projOrPropName: rawData.projOrPropName ?? "",
    furnish: rawData.furnish ?? "",
    isUsed: rawData.isUsed ?? "",
});

// export const sanitizeTopRightSectionData = (rawData: Partial<Record<keyof TopRightSectionData, any>>): TopRightSectionData => ({
//     projName: rawData.projName ?? "",
//     phaseName: rawData.phaseName ?? "",
//     phaseCount: typeof rawData.phaseCount === "number" ? rawData.phaseCount : 0,
//     minPrice: typeof rawData.minPrice === "number" ? rawData.minPrice : 0,
//     maxPrice: typeof rawData.maxPrice === "number" ? rawData.maxPrice : 0,
//     sortedBhks: Array.isArray(rawData.sortedBhks) ? rawData.sortedBhks : [],
//     propType: rawData.propType ?? "",
//     cg: rawData.cg ?? "",
//     city: rawData.city ?? "",
//     locality: rawData.locality ?? "",
//     postedByName: rawData.postedByName ?? "",
//     builderCity: rawData.builderCity ?? "",
//     cityName: rawData.cityName ?? "",
//     projIdEnc: rawData.projIdEnc ?? "",
//     localityName: rawData.localityName ?? "",
//     propName: rawData.propName ?? "",
//     address: rawData.address ?? "",
//     postedBy: rawData.postedBy ?? "",
//     type: rawData.type ?? "",
//     otherCharges: rawData.otherCharges ?? "",
//     bhkName: rawData.bhkName ?? "",
//     propTypeName: rawData.propTypeName ?? "",
//     category: rawData.category ?? "",
//     price: rawData.price ?? "",
//     projectAbout: rawData.projectAbout ?? "",
//     usp: rawData.usp ?? '',
//     compareAdded: rawData.compareAdded ?? '',
//     shortListed: rawData.shortListed ?? '',
// });

export const sanitizeApprovedNamesSectionData = (rawData: Partial<Record<keyof ApprovedNamesSectionData, any>>): ApprovedNamesSectionData => ({
    landArea: rawData.landArea ?? "",
    type: rawData.type ?? "",
    ca: rawData.ca ?? "",
    sba: rawData.sba ?? "",
    propertyAge: rawData.propertyAge ?? "",
    propTypeName: rawData.propTypeName ?? "",
    pa: rawData.pa ?? "",
    maxSba: rawData.maxSba ?? "",
    minSba: rawData.minSba ?? "",
    minCa: rawData.minCa ?? "",
    maxCa: rawData.maxCa ?? "",
    noOfUnits: rawData.noOfUnits ?? "",
    parking: rawData.parking ?? "",
    balcony: rawData.balcony ?? "",
    bathroom: rawData.bathroom ?? "",
    ownership: rawData.ownership ?? "",
    coverParking: rawData.coverParking ?? "",
    propTypeId: rawData.propTypeId ?? "",
    minPa: rawData.minPa ?? "",
    maxPa: rawData.maxPa ?? "",
    propStatus: rawData.propStatus ?? "",
    towerData: rawData.towerData ?? "",
    availableFor: rawData.availableFor ?? "",
    projAuthority: rawData.projAuthority ?? "",
    approvedById: rawData.approvedById ?? "",
});


export const sanitizetopCornerRightSectionData = (rawData: Partial<Record<keyof topCornerRightSectionData, any>>): topCornerRightSectionData => ({
    category: rawData.category ?? "", 
    type: rawData.type ?? "",
    basePrice: rawData.basePrice ?? "",
    sqftPrice: rawData.sqftPrice ?? "",
    floorPlan: rawData.floorPlan ?? "", 
    Sh: rawData.Sh ?? "",
    brochureUrl: rawData.brochureUrl ?? "",
    amenCount: rawData.amenCount ?? "", 
    propTypeName: rawData.propTypeName ?? "",
    atFloor: rawData.atFloor ?? "",
    facing: rawData.facing ?? "", 
    towerName: rawData.towerName ?? "",
    projOrPropName: rawData.projOrPropName ?? "",
});


export const shearPropOrProj = (data:any) => {
  const {
    type, projName, propName, cityName, city, localityName, locality, 
    category, phaseName, propIdEnc, bhkName, propTypeName, projIdEnc, 
  } = data;
 
  const url =
  type === "proj"
    ? createProjectLinkUrl({
        city: cityName ? cityName : city ? city : "",
        locality: localityName ? localityName : locality ? locality : "",
        slug: projName ? projName : projName,
        projIdEnc: projIdEnc,
      })
    : generateListingLinkUrl({
        city: cityName,
        locality: localityName,
        projName: projIdEnc ? propName : null,
        category: category === "Sale" ? "for-sale" : "for-rent",
        phase: phaseName,
        propIdEnc: propIdEnc,
        bhkUnitType: bhkName
          ? `${bhkName + " " + propTypeName}`
          : "" + " " + propTypeName,
      });
 
  navigator.share({
    title: type === "proj" ? projName : propName,
    text: `Check out this ${
      type === "proj" ? "project" : "property"
    }: ${type === "proj" ? projName : propName}`,
    url: url,
  });
};

export const handleAgentOwner = (projIdEnc:string, projName:string, type: "A" | "I" | "B") => {
    window.open(
      `/search/listing?sf=projIdEnc=${projIdEnc}-listedBy=${type}-projName=${projName}`,
      "_self"
    );
}
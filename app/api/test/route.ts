import { NextResponse } from "next/server";
export async function GET(req: Request) {
  try {
    const generatedData = generateUniqueData(1000);
    return NextResponse.json({ data:generatedData, status: true });
  } catch (error) {
    console.error(error);
    return Response.json({ ok: false, error: "Error reading file" });
  }
}
function generateUniqueData(count:number) {
  const baseData = {
    propIdEnc: "2a3e7ae30bbe8ba7ace94b565ec17395",
    facing: "South East",
    projIdEnc: "069ae8e578e7bf234a7df1a1c00aeff5",
    bhkName: null,
    propTypeName: "Plot",
    aptTypeId: null,
    aptTypeName: null,
    foodAllowedType: null,
    phaseId: null,
    phaseName: null,
    propName: "Unitech The Heritage Towers",
    category: "Sale",
    localityName: "Yelahanka",
    cityName: "Bengaluru",
    stateName: "Karnataka",
    price: 3223,
    sba: null,
    ca: null,
    pa: "1234",
    postedBy: "Builder",
    postedById: 4,
    propStatus: "Ready To Move",
    availableFrom: "Thu Oct 24 05:30:00 IST 2024",
    availableFor: null,
    postedDate: "Sun Oct 13 11:33:45 IST 2024",
    possassionDate: "Thu Oct 17 05:30:00 IST 2024",
    lat: 13.098885,
    lang: 77.59741,
    propertyAge: null,
    coverImage: null,
    media: {
      coverImageUrl: "https://d2l0lb5gc1bw3t.cloudfront.net/images/varify/list/141/cover/cover.webp?v=1728802075505"
    },
    sqftPrice: 2,
    postedByName: null,
    amenCount: null,
    address: null,
    parking: null,
    coverParking: null,
    ownership: "Freehold",
    bathroom: null,
    balcony: null,
    usp: null,
    furnish: null,
    maintenanceCharge: null,
    securityDeposit: null,
    isUsed: null,
    towerName: null,
    atFloor: null,
    isOkBroker: null,
    isPetFriendly: null,
    floorPlan: null,
    otherCharges: null,
    shortListed: null,
    compareAdded: null
  };

  const dataArray = [];

  for (let i = 1; i <= count; i++) {
    const uniqueData = { ...baseData };
    // Generate unique propIdEnc by appending the incremental number to the base value
    uniqueData.propIdEnc = `${baseData.propIdEnc.slice(0, -4)}${i.toString().padStart(4, '0')}`;
    dataArray.push(uniqueData);
  }

  return dataArray;
}



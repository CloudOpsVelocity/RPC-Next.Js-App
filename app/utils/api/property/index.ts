import { LIstingResponse } from "@/app/validations/property";
import { Main as M } from "@/app/validations/types/project";
import axios from "axios";

const getProjectDetails = async (slug: string): Promise<M | any> => {
  if (slug) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/fetch/listing/project/data?projIdEnc=${slug}`
      // {
      //   cache: "no-cache",
      // }
      // {
      //   next: { revalidate: 30 },
      // }
    );
    const data = await response.json();

    return data as M;
  }
};

const getListingDetails = async (slug: string): Promise<LIstingResponse> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/fetch/listing/data?propIdEnc=${slug}`,
    {
      next: { tags: [slug] },
    }
  );
  const data = await response.json();
  const filterOtherDetails =
    data.listing.otherPrice &&
    Object?.keys(data.listing.otherPrice).filter(
      (item) =>
        ![
          "otherCharge",
          "price",
          "securetyType",
          "clubHouseTill",
          "securityMonth",
          "security",
        ].includes(item)
    );
  const ac = filterOtherDetails?.reduce(
    (a: any, b: any) =>
      b !== "price" &&
      !(
        b === "clubHouseCharge" &&
        data.listing.otherPrice.clubHouseCharge === "A"
      ) &&
      data.listing.otherPrice[b] !== "NA" &&
      data.listing.otherPrice[b] !== "A"
        ? Number(a) +
          (b === "otherCharge"
            ? parseOtherCharge(data.listing.otherPrice[b])
            : Number(data.listing.otherPrice[b] || "0"))
        : Number(a),
    0
  );

  const otherCharges =
    data.listing.otherPrice &&
    parseOtherCharge(data.listing.otherPrice.otherCharge);
  return { ...data, totalPrice: ac + otherCharges };
};

const getNearByLocations = async (slug: string): Promise<any> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/project/get-nearby?projIdEnc=${slug}`
  );
  const data = await response.json();
  return data;
};
const getReportConstData = async () => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/common/getConstantList`,
    ["propReport"]
  );
  console.log(res)
  return res.data;
};
/* export const getCommonData = async (key:any) => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}common/get/locality-name/id?id=${key}`,
    
  );
  return res.data;
}; */
export {
  getProjectDetails,
  getListingDetails,
  getNearByLocations,
  getReportConstData,
};

function parseOtherCharge(otherChargeString: string): number {
  let sum = 0;

  if (otherChargeString) {
    const charges: string[] = otherChargeString.split(",");
    charges.forEach((charge: string) => {
      const parts: string[] = charge.split("|");
      if (parts.length === 2) {
        const value: number = parseFloat(parts[1].trim());
        if (!isNaN(value)) {
          sum += value;
        }
      }
    });
  }

  return sum;
}

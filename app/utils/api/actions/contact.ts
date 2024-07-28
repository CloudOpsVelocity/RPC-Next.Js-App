import axios from "axios";
type Props = {
  name: string;
  email: string;
  mobile: number;
  isProjContact: "Y" | "N";
  projIdEnc: string;
  src: string;
};

export const addContact = async (data: any) => {
  console.log(data);
  const reqKey =
    data.MODAL_TYPE == "PROJECT_REQ_CALLBACK" || data.MODAL_TYPE === "REQ_QUOTE"
      ? "projIdEnc"
      : "propIdEnc";
  const reqData = {
    name: data.name,
    email: data.email,
    mobile: data.mobile,
    isProjContact:
      data.MODAL_TYPE == "PROJECT_REQ_CALLBACK" ||
      data.MODAL_TYPE === "REQ_QUOTE"
        ? "Y"
        : "N",
    [reqKey]: data.reqId,
    src: sourceMap.get(data.source),
  };
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/contact/v1/sendContactOtp`;
  try {
    const response = await axios.post(url, reqData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const sendContact = async (data: any) => {
  console.log(data);
  const reqKey =
    data.MODAL_TYPE == "PROJECT_REQ_CALLBACK" || data.MODAL_TYPE === "REQ_QUOTE"
      ? "projIdEnc"
      : "propIdEnc";
  let reqData = {
    name: data.name,
    email: data.email,
    mobile: data.mobile,
    conFor: sourceMap.get(data.MODAL_TYPE),
    [reqKey]: data.reqId,
    conType: data.MODAL_TYPE == "REQ_QUOTE" ? "priceQuote" : "callback",
    src: sourceMap.get(data.source),
    postedBy: data.postedId,
    ...(data.projUnitIdEnc && { projUnitIdEnc: data.projUnitIdEnc }),
    ...(data.otp && { otp: data.otp }),
  };
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/contact/v1/generate-contact`;
  try {
    const response = await axios.post(url, reqData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
function processConType(conType: string): string {
  const conTypeMapping: { [key in string]: string } = {
    PROJECT_REQ_CALLBACK: "callback",
    PROPERTY_REQ_CALLBACK: "callback",
    REQ_QUOTE: "priceQuote",
  };

  if (!conTypeMapping[conType]) {
    throw new Error(`Invalid conType provided: ${conType}`);
  }

  return `${conType},${conTypeMapping[conType]}`;
}
const sourceMap = new Map([
  ["projBanner", "projDetails"],

  ["propBanner", "propDetails"],

  ["propCard", "propCard"],

  ["projCard", "projCard"],
  ["PROJECT_REQ_CALLBACK", "project"],
  ["PROPERTY_REQ_CALLBACK", "listing"],
  ["REQ_QUOTE", "projUnit"],
]);

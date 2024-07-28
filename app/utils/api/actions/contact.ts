import axios from "axios";
type Props = {
  name: string;
  email: string;
  mobile: number;
  isProjContact: "Y" | "N";
  projIdEnc: string;
  src: string;
};

export const addContact = async (data: Props) => {
  console.log(data);
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/contact/v1/sendContactOtp`;
  try {
    const response = await axios.post(url, data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const sendContact = async (data: any) => {
  console.log(data);
  const reqKey =
    data.MODAL_TYPE == "PROJECT_REQ_CALLBACK" ? "projIdEnc" : "propIdEnc";
  let reqData = {
    name: data.name,
    email: data.email,
    mobile: data.mobile,
    conFor: sourceMap.get(data.MODAL_TYPE),
    [reqKey]: data.reqId,
    conType: data.MODAL_TYPE == "REQ_QUOTE" ? "priceQuote" : "callback",
    src: sourceMap.get(data.source),
    postedBy: data.postedId,
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

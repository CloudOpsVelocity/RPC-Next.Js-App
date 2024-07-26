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
  const reqKey = data.isProjContact == "Y" ? "projIdEnc" : "propIdEnc";
  let reqData = {
    name: data.name,
    email: data.email,
    mobile: data.mobile,
    conFor: data.isProjContact == "Y" ? "project" : "property", // this you need to add
    [reqKey]: data[reqKey],
    conType: "callback", // this you need to add
    src: sourceMap.get(data.src),
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

const sourceMap = new Map([
  ["projBanner", "projDetails"],

  ["propBanner", "propDetails"],

  ["propCard", "propCard"],

  ["projCard", "projCard"],
]);

import axios from "axios";
type Props = {
  name: string;
  email: string;
  mobile: number;
  isProjContact: "Y" | "N";
  projIdEnc: string;
  src: string;
};
type User = {
  name: string;
  email: string;
  mobile: string;
  isProjContact: "Y" | "N"; // Assuming it's a binary choice
  projIdEnc: string;
  src: string;
  otp?: number;
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
  let reqData = {
    name: data.name,
    email: data.email,
    mobile: data.mobile,
    projIdEnc: data.projIdEnc,
    conFor: data.isProjContact ? "project" : "property", // this you need to add
    conType: "callback", // this you need to add
    src: data.src,
  };
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/contact/v1/generate-contact`;
  try {
    const response = await axios.post(url, reqData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

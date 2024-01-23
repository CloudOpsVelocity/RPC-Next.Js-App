import axios from "axios";
type Props = {
  projIdEnc: string;
  rating: number;
  review: string;
};
export const addContact = async (data: Props) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/contact/v1/sendContactOtp`;
  try {
    const response = await axios.post(url, data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

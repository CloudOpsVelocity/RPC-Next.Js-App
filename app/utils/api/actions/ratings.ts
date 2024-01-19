import axios from "axios";
type Props = {
  projIdEnc: string;
  rating: number;
  review: string;
};
export const addRating = async (data: Props) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/user-actions/add-review`;
  try {
    const response = await axios.post(url, data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

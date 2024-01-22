import axios from "axios";
type Props = {
  projIdEnc: string;
  question: string;
};
export const addQna = async (data: Props) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/project/addProjectQNA`;
  try {
    const response = await axios.post(url, data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

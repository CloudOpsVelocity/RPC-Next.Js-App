import axios from "axios";
import toast from "react-hot-toast";
type Props = {
  projIdEnc: string;
  type: number;
  isactive: string;
};
export const addShortList = async (data: Props) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/user-actions/add?type=${data.type}`;
  try {
    const response = await axios.post(url, { projIdEnc: data.projIdEnc, isactive: data.isactive });
    toast.success("Property Shortlisted");
    return response.data;
  } catch (error) {
    toast.error("Something went wrong");
    console.error(error);
  }
};

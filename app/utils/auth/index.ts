import { BACKEND_BASE_URL } from "@/app/env";
import axios from "axios";

const resendOtp = async (email: string) => {
  try {
    const res = await axios.post(
      `${BACKEND_BASE_URL}//user/v1/sendMobileAndEmailOTP`,
      {
        email,
      }
    );
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export { resendOtp };

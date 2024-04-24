"use client";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import CryptoJS from "crypto-js";
import { WarningIcon } from "../images/commonSvgs";

interface Login {
  username: string | number;
  password: string;
}

interface Otp {
  username: string;
  otp: any;
}

type Action = {
  username: string;
  password: string;
};

type AuthResult = {
  success: boolean;
  message: string;
};

interface RegistrationData {
  email?: string;
  password: string;
  name: string;
  mobile: number | null;
  usertype: "I" | "A" | "B";
  userName?: string;
}

interface RegistrationOthersData {
  email: string;
  password: string;
  userName: string;
  mobile: number | null;
  address: string;
  companyName: string;

  state?: any;
  city?: string;
  pincode?: any;
  companyStartDate?: any;
  branchName?: number[];
  ceoName?: string;
  foundedBy?: string;
  mission?: string;
  vission?: string;
  officeContact?: number | null;
  managingDirectorName?: string;
  companyLogo?: File;
}

/**
 * A hook for handling authentication.
 * @returns An object with login and register functions.
 */
export default function useAuth({
  type = "register",
}: {
  type?: "login" | "register" | "otp";
  redirectUrl?: string;
}) {
  const router = useRouter();
  const params = useSearchParams();
  const projId = params.get("projId");
  const redirectPath = `/abc/delhi/some/${projId}`;

  const loginWithCredentials = async (data: Login): Promise<any> => {
    const encryptedPassword = CryptoJS.AES.encrypt(
      data.password,
      process.env.NEXT_PUBLIC_SECRET!!
    ).toString();
    const requestData = {
      username: data.username,
      password: encryptedPassword,
    };
    const res = await signIn("credentials", {
      ...requestData,
      redirect: false,
    });
    console.log(res);
    if (res?.ok) {
      type === "register"
        ? setTimeout(() => {
            router.push(projId ? redirectPath : "/");
          }, 5000)
        : router.push(projId ? redirectPath : "/");
    } else {
      toast.error(res?.error || "Something went wrong. Please try again.", {
        duration: 1000,
      });
    }
  };

  const login = (data: Action) => {
    loginWithCredentials({
      username: data.username,
      password: data.password,
    });
  };

  const register = async (data: RegistrationData): Promise<any> => {
    try {
      // Assuming you have an API endpoint for user registration
      const userDetails = {
        name: data.name != undefined ? data.name : data.userName,
        email: data.email,
        usertype: data.usertype,
        password: data.password,
        mobile: data.mobile,
      };
      const registrationResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/v1/registerUser`,
        userDetails
      );
      // Check the registration response and handle accordingly
      if (registrationResponse?.data.status) {
        // Registration success, you might want to automatically log in the user
        // const res = await loginWithCredentials({
        //   //@ts-ignore
        //   username: data.email, // Assuming email is the username
        //   password: data.password,
        // });
        // return res;
        return registrationResponse.data;
      }
      if (!registrationResponse.data.status) {
        toast.error(registrationResponse.data.message, {
          duration: 1000,
        });
        return registrationResponse.data;
      }
    } catch (error: any) {
      toast.error("User Already Exists");
      // throw new Error("Something went wrong during registration.");
    }
  };

  const registerOtherDetails = async (
    data: RegistrationOthersData
  ): Promise<AuthResult> => {
    try {
      const formData = new FormData();
      console.log(data.companyLogo);
      formData.append("data", JSON.stringify(data));
      formData.append("logo", data.companyLogo as any);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/v1/registerUser-other`,
        formData
      );

      if (response?.data.status) {
        return { success: true, message: "Registration successful." };
      } else {
        return { success: false, message: "Registration failed." };
      }
    } catch (error: any) {
      toast.error(
        (error.message as string) || "Something went wrong. Please try again."
      );
      throw new Error("Something went wrong during registration.");
    }
  };

  const verifyOtp = async (data: Otp): Promise<any> => {
    try {
      const otpResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/v1/isMobileAndEmailOTPVerified`,
        data
      );

      if (otpResponse?.data.status) {
        // Registration success, you might want to automatically log in the user

        return { success: true, message: "Otp Verified successful." };
      } else {
        return { success: false, message: "Otp Verifing failed." };
      }
    } catch (error: any) {
      console.log(error);
      console.log("Wrong Otp. Please enter your OTP again.");
    }
  };

  return { login, register, verifyOtp, registerOtherDetails };
}

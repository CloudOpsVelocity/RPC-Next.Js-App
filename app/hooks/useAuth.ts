"use client";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
interface Login {
  username: string;
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
  mobile: number;
  usertype: "I" | "A" | "B";
  userName?: string;
}

interface RegistrationOthersData {
  email: string;
  password: string;
  userName: string;
  mobile: number;
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
  officeContact?: Number;
  managingDirectorName?: string;
}

/**
 * A hook for handling authentication.
 * @returns An object with login and register functions.
 */
export default function useAuth() {
  const router = useRouter();

  const loginWithCredentials = async (data: Login): Promise<any> => {
    const res = await signIn("credentials", { ...data, redirect: false });
    if (res?.ok) {
      router.push("/");
    } else {
      toast.error(res?.error || "Something went wrong. Please try again.");
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
        toast.error(registrationResponse.data.message);
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
      formData.append("data", JSON.stringify(data));
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
      toast.error("Wrong Otp. Please enter your OTP again.");
    }
  };

  return { login, register, verifyOtp, registerOtherDetails };
}

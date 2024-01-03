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
}

interface RegistrationOthersData {
  email: string;
  password: string;
  fullname: string;
  contact: number;
  address: string;
  companyName: string;

  state?: string;
  city?: string;
  pincode?: any;
  startDate?: any;
  branch?: string[];
  ceo?: string;
  fd?: string;
  bd?: string;
  cv?: string;
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
      //alert(res?.error);

      toast.error(res?.error || "Something went wrong. Please try again.");
    }
  };

  const login = (data: Action) => {
    loginWithCredentials({
      username: data.username,
      password: data.password,
    });
  };

  const register = async (data: RegistrationData): Promise<AuthResult> => {
    try {
      // Assuming you have an API endpoint for user registration
      const registrationResponse = await axios.post(
        "http://localhost:8081/user/v1/registerUser",
        data
      );
      // Check the registration response and handle accordingly
      if (registrationResponse?.data.status) {
        // Registration success, you might want to automatically log in the user
        await loginWithCredentials({
          username: data.email, // Assuming email is the username
          password: data.password,
        });

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

  const registerOtherDetails = async (
    data: RegistrationOthersData
  ): Promise<AuthResult> => {
    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify(data));
      const response = await axios.post(
        "http://localhost:8081/user/v1/registerUser-other",
        formData
      );

      if (response?.data.status) {
        // Registration success, you might want to automatically log in the user

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
        "http://localhost:8081/user/v1/isMobileAndEmailOTPVerified",
        data
      );

      if (otpResponse?.data.status) {
        // Registration success, you might want to automatically log in the user

        return { success: true, message: "Otp Verified successful." };
      } else {
        return { success: false, message: "Otp Verifing failed." };
      }
    } catch (error: any) {
      toast.error(
        (error.message as string) || "Something went wrong. Please try again."
      );
      throw new Error("Something went wrong during registration.");
    }
  };

  return { login, register, verifyOtp, registerOtherDetails };
}

import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

interface Login {
  username: string;
  password: string;
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
  email: string;
  password: string;
  name: string;
  mobile: number;
  usertype: string;
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
      alert(res?.error);
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
      if (registrationResponse?.data.success) {
        // Registration success, you might want to automatically log in the user
        await loginWithCredentials({
          username: data.email, // Assuming email is the username
          password: data.password,
        });
        return { success: true, message: "Registration successful." };
      } else {
        return { success: false, message: "Registration failed." };
      }
    } catch (error) {
      console.error("Registration error:", error);
      throw new Error("Something went wrong during registration.");
    }
  };
  return { login, register };
}

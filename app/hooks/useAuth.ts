import axios from 'axios'
import { signIn } from 'next-auth/react';
import { useRouter } from "next/navigation";

interface Login {
    identifier: string;
    password:string
}

type Action = {
  identifier: string;
  password: string;
};

type AuthResult = {
  success: boolean;
  message: string;
};

/**
 * A hook for handling authentication.
 * @returns An object with login and register functions.
 */
export default function useAuth() {
  const router = useRouter();

  const loginWithCredentials = async (data: Login): Promise<AuthResult> => {
    try {
      signIn('credentials', {
        email: data.identifier,
        password: data.password,
      });
      return { success: true, message: "Login successful" };
    } catch (error) {
      return { success: false, message: "Login failed" };
    }
  };

  const login = (data: Action) => {
    loginWithCredentials({ identifier: data.identifier, password: data.password });
  };

  const register = async (data: any) => {
    try {
   const res =  await   signIn('credentials', {
        email: data.email,
        password: data.password,
      })
      // Handle the response here
    } catch (error) {
      throw new Error("Something went wrong");
    }
  };

  return { login, register };
}

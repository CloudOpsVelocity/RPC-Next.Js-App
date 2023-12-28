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

/**
 * A hook for handling authentication.
 * @returns An object with login and register functions.
 */
export default function useAuth() {
  const router = useRouter();

  const loginWithCredentials = async (data: Login): Promise<any> => {
    const res = await signIn("credentials", { ...data, redirect: false });
    if (res?.ok) {
      router.refresh();
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

  const register = async (data: any) => {
    try {
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
      });
      // Handle the response here
    } catch (error) {
      throw new Error("Something went wrong");
    }
  };

  return { login, register };
}

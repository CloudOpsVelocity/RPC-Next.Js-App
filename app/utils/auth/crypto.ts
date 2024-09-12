import CryptoJS from "crypto-js";
import { getCookie } from "cookies-next";
import { cookies, headers } from "next/headers";

export async function decryptResumeSignupToken() {
  console.log(headers().get("cookie"));
  // Get the encrypted token from cookies
  const encryptedToken = await cookies().get("resume_signup_token")?.value;
  if (!encryptedToken) {
    return;
  }

  try {
    // Decrypt the token
    const decryptedToken = CryptoJS.AES.decrypt(
      encryptedToken as string, // Type assertion for compatibility
      process.env.NEXT_PUBLIC_SECRET!!
    ).toString(CryptoJS.enc.Utf8);

    // Split the decrypted token into components
    const [username, encryptedPassword, step, timestamp] =
      decryptedToken.split(":");

    // Decrypt the password
    const decryptedPassword = CryptoJS.AES.decrypt(
      encryptedPassword,
      process.env.NEXT_PUBLIC_SECRET!!
    ).toString(CryptoJS.enc.Utf8);

    // Return the parsed and decrypted information
    return {
      username,
      password: decryptedPassword,
      step,
      timestamp: parseInt(timestamp, 10),
    };
  } catch (error) {
    return null;
    // throw new Error("Failed to decrypt signup token.");
  }
}

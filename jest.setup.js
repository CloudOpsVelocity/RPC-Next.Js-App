// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import dotenv from "dotenv";

dotenv.config({ path: ".env.test" });
console.log("NEXT_PUBLIC_NAME:", process.env.NEXT_PUBLIC_NAME);

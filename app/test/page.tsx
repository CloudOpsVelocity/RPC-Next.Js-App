"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
const semver = require("semver");

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    // Perform login request
    const response = { ok: true, redirectUrl: "/my-profile" };

    if (response.ok) {
      // Redirect to the target URL based on the response
      const data = response;
      router.push(data.redirectUrl);
    } else {
      // Handle login failure
      alert("Login failed");
    }
  };
  const str = "sdf sdfljdsfjkl jjfjldsfj j";
  console.log("*");
  console.log("");
  // console.log(str);
  // console.log(str.length);
  // console.log(str.at(0));
  // console.log(str.charAt(0));
  // console.log(str.at(0));

  let arr = [
    {
      mID: 1,
      name: "Metadata ",
      dataType: "Text",
      required: true,
      choices: ["Choice ", "Choice "],
    },

    {
      mID: 3,
      name: "Metadata ",
      dataType: "Text",
      required: true,
      choices: ["Choice ", "Choice "],
    },
    {
      mID: 3,
      name: "Metadata ",
      dataType: "Text",
      required: true,
      choices: ["Choice ", "Choice "],
    },
    {
      mID: 3,
      name: "Metadata ",
      dataType: "Text",
      required: true,
      choices: ["Choice ", "Choice "],
    },
  ];

  return (
    <section className="py-10 bg-gray-50 sm:py-16 lg:py-24">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
            {str}
            Frequently Asked Questions
          </h2>
          <p className="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-600">
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do
          </p>
        </div>
        <div className="max-w-3xl mx-auto mt-8 space-y-4 md:mt-16">
          <div className="transition-all duration-200 bg-white border border-gray-200 shadow-lg cursor-pointer hover:bg-gray-50">
            <button
              type="button"
              className="flex items-center justify-between w-full px-4 py-5 sm:p-6"
            >
              <span className="flex text-lg font-semibold text-black">
                {" "}
                How to create an account?{" "}
              </span>
              <svg
                className="w-6 h-6 text-gray-400 rotate-180"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <div className="px-4 pb-5 sm:px-6 sm:pb-6">
              <p>
                Amet minim mollit non deserunt ullamco est sit{" "}
                <a
                  href="#"
                  title=""
                  className="text-blue-600 transition-all duration-200 hover:underline"
                >
                  aliqua dolor
                </a>{" "}
                do amet sint. Velit officia consequat duis enim velit mollit.
              </p>
            </div>
          </div>
          <div className="transition-all duration-200 bg-white border border-gray-200 cursor-pointer hover:bg-gray-50">
            <button
              type="button"
              className="flex items-center justify-between w-full px-4 py-5 sm:p-6"
            >
              <span className="flex text-lg font-semibold text-black">
                {" "}
                How can I make payment using Paypal?{" "}
              </span>
              <svg
                className="w-6 h-6 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <div className="hidden px-4 pb-5 sm:px-6 sm:pb-6">
              <p>
                Amet minim mollit non deserunt ullamco est sit{" "}
                <a
                  href="#"
                  title=""
                  className="text-blue-600 transition-all duration-200 hover:underline"
                >
                  aliqua dolor
                </a>{" "}
                do amet sint. Velit officia consequat duis enim velit mollit.
              </p>
            </div>
          </div>
          <div className="transition-all duration-200 bg-white border border-gray-200 cursor-pointer hover:bg-gray-50">
            <div className="">
              <button
                type="button"
                className="flex items-center justify-between w-full px-4 py-5 sm:p-6"
              >
                <span className="flex text-lg font-semibold text-black">
                  {" "}
                  Can I cancel my plan?{" "}
                </span>
                <svg
                  className="w-6 h-6 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div className="hidden px-4 pb-5 sm:px-6 sm:pb-6">
                <p>
                  Amet minim mollit non deserunt ullamco est sit{" "}
                  <a
                    href="#"
                    title=""
                    className="text-blue-600 transition-all duration-200 hover:underline"
                  >
                    aliqua dolor
                  </a>{" "}
                  do amet sint. Velit officia consequat duis enim velit mollit.
                </p>
              </div>
            </div>
          </div>
          <div className="transition-all duration-200 bg-white border border-gray-200 cursor-pointer hover:bg-gray-50">
            <button
              type="button"
              className="flex items-center justify-between w-full px-4 py-5 sm:p-6"
            >
              <span className="flex text-lg font-semibold text-black">
                {" "}
                How can I reach to support?{" "}
              </span>
              <svg
                className="w-6 h-6 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <div className="hidden px-4 pb-5 sm:px-6 sm:pb-6">
              <p>
                Amet minim mollit non deserunt ullamco est sit{" "}
                <a
                  href="#"
                  title=""
                  className="text-blue-600 transition-all duration-200 hover:underline"
                >
                  aliqua dolor
                </a>{" "}
                do amet sint. Velit officia consequat duis enim velit mollit.
              </p>
            </div>
          </div>
        </div>
        <p className="text-center text-gray-600 textbase mt-9">
          Didn’t find the answer you are looking for?{" "}
          <a
            href="#"
            title=""
            className="font-medium text-blue-600 transition-all duration-200 hover:text-blue-700 focus:text-blue-700 hover:underline"
          >
            Contact our support
          </a>
        </p>
      </div>
    </section>
  );
}

// const reversedFn = (arr) => {
//   for (let i = 0; i < arr.length / 2; i++) {
//     [arr[i], arr[arr.length - 1 - i]] = [arr[arr.length - 1 - i], arr[i]];
//   }
//   console.log(arr);
//   return arr;
// };

// const customSlice = (arr, start, howMany, ...newEle) => {
//   if (start > arr.length) return "ARRAY TOO LONG";
//   for (let i = start; i < arr.length; i++) {}
// };

// const customAddInStr = (str, ...elements) => {
//   for (let i = 0; i < elements.length; i++) {
//     str += elements[i];
//   }
//   return str;
// };

const customEndsWith = (str: string, endWith: string) => {
  let diff = str.length - endWith.length;
  for (let i = 0; i < endWith.length; i++) {
    if (str[diff + i] !== endWith[i]) {
      return false;
    }
  }
  return true;
};

const customIncludes = (str: string, word: string) => {
  for (let i = 0; i < str.length; i++) {}
};

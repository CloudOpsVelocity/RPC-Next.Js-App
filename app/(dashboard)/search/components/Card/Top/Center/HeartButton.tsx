import React from "react";

type Props = {};

export default function HeartButton({}: Props) {
  return <button className="absolute right-2">{config.heartIcon}</button>;
}

let config = {
  heartIcon: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle
        cx="12"
        cy="12"
        r="11.75"
        fill="#ECF0F3"
        stroke="#A7C4DA"
        stroke-width="0.5"
      />
      <path
        d="M15.5334 6C13.1666 6 12 8.36363 12 8.36363C12 8.36363 10.8334 6 8.46665 6C6.54321 6 5.02006 7.63016 5.00037 9.57536C4.96027 13.6131 8.16224 16.4845 11.6719 18.8977C11.7687 18.9643 11.883 19 12 19C12.117 19 12.2314 18.9643 12.3281 18.8977C15.8374 16.4845 19.0394 13.6131 18.9996 9.57536C18.9799 7.63016 17.4568 6 15.5334 6Z"
        stroke="#4D6677"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  ),
};

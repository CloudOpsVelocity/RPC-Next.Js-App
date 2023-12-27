"use client";
import axios from "axios";
import React from "react";
import AuthPopup from "../components/molecules/auth/authPopup";
import AgentBuilderForm from "../components/molecules/auth/signup";
import Individual from "../components/molecules/auth/signup/individual";
import Agent from "../components/molecules/auth/signup/agent";
import { signIn } from "next-auth/react";

export default function page() {
  const createUSer = async () => {
    const res = await axios.post(
      `http://localhost:8081/user/v1/registerUser`,
      {}
    );
    console.log(res.data);
  };

  return (
    <div className="mt-20">
      <button
        onClick={async () => {
          const res = await signIn("credentials", {
            identifier: "builder@gmail.com",
            password: "987654321",
          });
          console.log(res);
        }}
      >
        Login User
      </button>
      {/* <AuthPopup /> */}
      {/* <Agent /> */}
    </div>
  );
}

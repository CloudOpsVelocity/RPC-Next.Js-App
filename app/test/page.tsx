"use client";
import axios from "axios";
import React from "react";
import AuthPopup from "../components/molecules/auth/authPopup";

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
      <button onClick={createUSer}>Create User</button>
      <AuthPopup />
    </div>
  );
}

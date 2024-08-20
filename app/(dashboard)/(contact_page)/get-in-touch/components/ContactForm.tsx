"use client";
import { useForm } from "@mantine/form";
import React from "react";

type Props = {};

export default function ContactForm({}: Props) {
  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      tel: "",
      questions: "",
    },

    validate: {
      name: (value) => (value.trim().length > 0 ? null : "Full Name is Required"),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Email is Required"),
      tel: (value) =>
        /^[0-9]{10}$/.test(value) ? null : "Contact Number is Required",
      questions: (value) =>
        value.trim().length > 0 ? null : "Please Enter Your Query",
    },
  });
  const onSubmit = async (values: any) => {
    // do api there
  };
  return (
    <form
      onSubmit={form.onSubmit((values) => onSubmit(values))}
      className="flex flex-col items-end gap-2.5 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.10)] p-4 sm:p-8 rounded-[10px] border-2 border-solid border-[#CAE3FF] bg-[#FAFAFA] w-full sm:w-auto sm:min-w-[500px]"
    >
      <label htmlFor="name" className="w-full">
        <p className=" textsm:-[#333] text-[12px] sm:text-base not-italic font-semibold text-left">
          Full Name
        </p>
        <input
          id="name"
          placeholder="Enter your Full Name Here"
          type="text"
          className="rounded-[5px] border-[0.5px] border-solid border-[#666] bg-white text-[12px] sm:text-[16px] placeholder:text-[#767270] px-2 py-1 w-full"
          {...form.getInputProps("name")}
        />
        {form.errors.name && (
          <div className="text-red-500 text-sm">{form.errors.name}</div>
        )}
      </label>

      <label htmlFor="email" className="w-full">
        <p className="text-[#333] text-[12px] sm:text-base not-italic font-semibold text-left">
          Email
        </p>
        <input
          id="email"
          placeholder="Enter your Email Here"
          type="email"
          className="rounded-[5px] border-[0.5px] border-solid border-[#666] bg-white text-[12px] sm:text-[16px] placeholder:text-[#767270] px-2 py-1 w-full"
          {...form.getInputProps("email")}
        />
        {form.errors.email && (
          <div className="text-red-500 text-sm">{form.errors.email}</div>
        )}
      </label>

      <label htmlFor="tel" className="w-full">
        <p className="text-[#333] text-[12px] sm:text-base not-italic font-semibold text-left">
          Contact Number
        </p>
        <input
          id="tel"
          placeholder="Enter your Contact Number Here"
          type="tel"
          className="rounded-[5px] border-[0.5px] border-solid border-[#666] bg-white text-[12px] sm:text-[16px] placeholder:text-[#767270] px-2 py-1 w-full"
          {...form.getInputProps("tel")}
        />
        {form.errors.tel && (
          <div className="text-red-500 text-sm">{form.errors.tel}</div>
        )}
      </label>

      <label htmlFor="questions" className="w-full">
        <p className="text-[#333] text-[12px] sm:text-base not-italic font-semibold text-left">
          What can we help you with?
        </p>
        <textarea
          id="questions"
          placeholder="Enter your query Here"
          className="rounded-[5px] border-[0.5px] border-solid border-[#666] bg-white text-[12px] sm:text-[16px] placeholder:text-[#767270] px-2 py-1 w-full"
          rows={4}
          {...form.getInputProps("questions")}
        />
        {form.errors.questions && (
          <div className="text-red-500 text-sm">{form.errors.questions}</div>
        )}
      </label>

      <button
        type="submit"
        className="justify-center items-center gap-2 text-white text-[12px] sm:text-base not-italic font-semibold leading-[normal] p-1.5 sm:p-2 rounded-[5px] bg-[#0073c6]"
      >
        Submit
      </button>
    </form>
  );
}

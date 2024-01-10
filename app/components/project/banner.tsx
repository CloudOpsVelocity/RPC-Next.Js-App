"use client";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Image from "next/image";
import React, { useState } from "react";
import Rating from "../atoms/Rating";

export default function Banner() {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <div className="bg-[#f0f9ff] w-[90%] px-8 py-12 mx-auto flex flex-col md:flex-row justify-between items-center">
      <div>
        <h2 className="text-[24px] lg:text-[32px] font-bold text-[#003366] mb-2">
          PROJECT RATING FOR <span className="text-green-600">SARANG</span>
        </h2>
        <p className="text-lg text-[#003366] mb-4">
          Your headline should show readers how your review can help them solve
          a problem or make a decision, offer something different or unexpected,
          and be clear and specific about what your review is about
        </p>
        <button
          onClick={open}
          className="inline-flex items-center justify-center rounded-md text-sm  ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 bg-[#007ace] text-white font-semibold"
        >
          ADD RATINGS
        </button>
      </div>
      <div className="flex-shrink-0">
        <Image
          src="/placeholder.svg"
          alt="Project Rating Illustration"
          className="h-[200px] w-[400px]"
          width={400}
          height={200}
          style={{ aspectRatio: "400 / 200", objectFit: "cover" }}
        />
      </div>
      <AddRating opened={opened} close={close} />
    </div>
  );
}
const AddRating = ({ opened, close }: { opened: any; close: any }) => {
  const [userRating, setUserRating] = useState(0);

  const handleRatingChange = (newRating: number) => {
    setUserRating(newRating);
  };
  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        centered
        title="Add Rating"
        size={"xl"}
      >
        <div className="max-w-[100%] mt-[2%] mx-auto my-8   rounded-lg space-y-2">
          <Rating
            maxStars={5}
            initialRating={userRating}
            onRatingChange={handleRatingChange}
          />
          <h2 className="font-[700] text-[#233333] text-[20px]  ">
            Add your feedback for Sarang by Sumadhura Project !
          </h2>

          <div className=" gap-4">
            <div className="flex-1">
              <textarea
                id="question"
                className="font-[500] text-[#4D6677] text-[20px] w-full p-2 border border-gray-300 rounded-md focus:outline-none h-[160px] mb-[1%] "
                placeholder="Start typing here"
                defaultValue={""}
                rows={3}
              />
            </div>
            <button className="inline-flex items-center justify-center rounded-md text-[20px] font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 bg-[#0073C6] text-white">
              Submit
            </button>
          </div>
        </div>
        {/* Modal content */}
      </Modal>
    </>
  );
};

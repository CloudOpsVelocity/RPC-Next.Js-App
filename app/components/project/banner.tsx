"use client";
import { Button, Modal, Rating, Textarea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Image from "next/image";
import React, { useState } from "react";
// import Rating from "../atoms/Rating";
import S from "@/app/styles/Rating.module.css";
import { useForm, yupResolver } from "@mantine/form";
import Flex from "../molecules/Utils/Flex";
import { ratingSchema } from "@/app/validations/project";
import { addRating } from "@/app/utils/api/actions/ratings";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { IconSun, RatingStar, infoIcon } from "@/app/images/commonSvgs";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";

export default function Banner() {
  const [opened, { open, close }] = useDisclosure(false);
  const { data: session } = useSession();

  const onAddingRatings = () => {
    session ? open() :  toast.custom((t) => (
      <div
        className={`${
          t.visible ? 'animate-enter' : 'animate-leave'
        } ml-auto w-full pointer-events-auto flex justify-end items-end ring-1 ring-transparent ring-opacity-5`}
      >
        <p className=" text-[#565D70] p-[8px] pr-[16px] pl-[16px] bg-white shadow-lg flex items-center rounded-lg gap-[10px] text-[20px] whitespace-nowrap font-[600] ">
          {infoIcon}  Please 
          <Link rel="shortcut icon" href="/login" >
            <span className=" cursor-pointer text-[#0073C6] ">
              login/ Signup
            </span>
          </Link> 
          to add Ratings
        </p>
      </div>
    ))
    
  };

  return (
    <div className="bg-[#f0f9ff] w-[90%] px-8 py-12 mx-auto mb-[5%] flex flex-col md:flex-row justify-between items-center">
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
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
          onClick={()=>onAddingRatings()}
          className="inline-flex items-center justify-center rounded-md text-sm  ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 bg-[#007ace] text-white font-semibold"
        >
          ADD RATINGS
        </button>
      </div>
      <div className="flex-shrink-0">
        <Image
          src="/project/rating.svg"
          alt="Project Rating Illustration"
          className="h-[200px] w-[600px]"
          width={600}
          height={300}
        />
      </div>
      <AddRating opened={opened} close={close} />
    </div>
  );
}
const AddRating = ({ opened, close }: { opened: any; close: any }) => {
  const params = useParams<{ slug: string }>();

  const [status, setStatus] = useState<
    "pending" | "idle" | "success" | "error"
  >("idle");
  const { getInputProps, onSubmit, reset } = useForm({
    initialValues: {
      review: "",
      rating: 0,
    },
    validate: yupResolver(ratingSchema),
  });
  const onClose = () => {
    reset();
    close();
  };

  const formSubmit = async (values: any) => {
    setStatus("pending");
    const data = await addRating({ ...values, projIdEnc: params?.slug });
    console.log(data);
    setStatus("success");
  };
  return (
    <Modal
      classNames={{
        title: S.title,
        root: S.root,
        close: S.close,
        content: S.content,
      }}
      opened={opened}
      onClose={onClose}
      centered
      title="Add Rating"
      size={"xl"}
    >
      <form
        onSubmit={onSubmit(formSubmit)}
        className="max-w-[100%] mt-[2%] mx-auto my-8   rounded-lg space-y-2"
      >
        <Flex>
          <Rating
            emptySymbol={<IconSun className="w-[82px] h-[82px]" />}
            mr={"xl"}
            fullSymbol={
              <RatingStar fill="#FFD600" className="w-[50px] h-[50px]" />
            }
            {...getInputProps("rating")}
          />
        </Flex>

        <h2 className="font-[700] text-[#233333] text-[20px]  ">
          Add your feedback for Sarang by Sumadhura Project !
        </h2>

        <div className=" gap-4">
          <div className="flex-1">
            <Textarea
              name="review"
              {...getInputProps("review")}
              w={"100%"}
              h={"100%"}
              id="review"
              className="font-[500] text-[#4D6677] text-[20px] w-full  rounded-md focus:outline-none h-[160px] mb-[1%] "
              placeholder="Start typing here"
              rows={7}
            />
          </div>
          <Button
            loading={status === "pending"}
            type="submit"
            className="inline-flex items-center justify-center rounded-md !text-[20px] font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 !bg-[#0073C6] text-white"
          >
            Submit
          </Button>
        </div>
      </form>
    </Modal>
  );
};

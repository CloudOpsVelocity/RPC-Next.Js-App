"use client";
import { Button, Modal, Rating, Textarea } from "@mantine/core";
import { useLocalStorage, useMediaQuery } from "@mantine/hooks";
import Image from "next/image";
import React, { useState } from "react";
import S from "@/app/styles/Rating.module.css";
import { yupResolver } from "@mantine/form";
import { ratingSchema, ratingSchema2 } from "@/app/validations/project";
import { addRating } from "@/app/utils/api/actions/ratings";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { IconSun, RatingStar } from "@/app/images/commonSvgs";
import toast, { Toaster } from "react-hot-toast";
import LoginPopup from "../molecules/popups/login";
import Close from "./button/close";
import { usePopUpRatings } from "@/app/hooks/popups/usePopUpRatings";
import handleTrimAndReplace from "@/app/utils/input/validations";
import clsx from "clsx";
import { RatingForm, Success } from "./success/rating";
import { FormProvider, useForm } from "@/app/context/rating";
import ForgotForm from "../molecules/auth/forgot";

export default function Banner({
  projName,
  projIdEnc,
}: {
  projName: string;
  projIdEnc: string;
}) {
  const [opened, { open, close }] = usePopUpRatings();

  const onAddingRatings = () => {
    open();
    // session
    //   ? open()
    //   : toast.custom((t) => (
    //       <div
    //         className={`${
    //           t.visible ? "animate-enter" : "animate-leave"
    //         } ml-auto w-full pointer-events-auto flex justify-end items-end ring-1 ring-transparent ring-opacity-5`}
    //       >
    //         <p className=" text-[#565D70] p-[8px] pr-[16px] pl-[16px] bg-white shadow-lg flex items-center rounded-lg gap-[10px] text-[20px] whitespace-nowrap font-[600] ">
    //           {infoIcon} Please
    //           <Link rel="shortcut icon" href="/login">
    //             <span className=" cursor-pointer text-[#0073C6] ">
    //               login/ Signup
    //             </span>
    //           </Link>
    //           to add Ratings
    //         </p>
    //       </div>
    //     ));
  };

  return (
    <div className="bg-[#f0f9ff] scroll-mt-[90px]  px-8 py-12 mx-auto mb-[5%] ">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="w-[90%] m-auto flex flex-col md:flex-row justify-between items-center ">
        <div>
          <h2 className="text-[#023993] text-[20px] sm:text-[32px] not-italic font-bold leading-[normal] tracking-[1.28px] mb-4">
            PROJECT RATING FOR{" "}
            <span className="text-[#148B16]  sm:text-[32px] not-italic font-bold leading-[normal] tracking-[1.28px] capitalize">
              {projName}
            </span>
          </h2>
          <p className="text-black text-[16px] sm:text-2xl not-italic font-medium leading-[normal] tracking-[0.96px] mb-8">
            Your headline should show readers how your review can help them
            solve a problem or make a decision, offer something different or
            unexpected, and be clear and specific about what your review is
            about
          </p>
          <button
            onClick={() => onAddingRatings()}
            className="inline-flex items-center justify-center rounded-md text-sm  ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 bg-[#007ace] text-white font-semibold"
          >
            ADD RATINGS
          </button>
        </div>
        <div className="hidden md:block flex-shrink-0 relative h-[200px] w-full md:w-[600px]">
          <Image
            src="/abc/rating.svg"
            alt="Project Rating Illustration"
            className="h-[320px] w-[320px] absolute -top-[87px] right-0"
            width={600}
            height={300}
          />
        </div>
        <AddRating
          opened={opened}
          close={close}
          projName={projName}
          projIdEnc={projIdEnc}
        />
      </div>
    </div>
  );
}
interface Props {
  review: string;
  rating: number;
  proj: string;
}
const AddRating = ({
  opened,
  close,
  projName,
  projIdEnc,
}: {
  opened: any;
  close: any;
  projName: string;
  projIdEnc: string;
}) => {
  const params = useParams<{ slug: string }>();
  const { data: session } = useSession();
  const [value, setValue] = useLocalStorage<Props[]>({
    key: "ur",
    defaultValue: [],
  });
  const isSubmitted = value?.find((val) => val.proj === projIdEnc);
  const [status, setStatus] = useState<
    "pending" | "idle" | "success" | "error"
  >("idle");
  const form = useForm({
    initialValues: {
      review: "",
      rating: 0,
    },
    validate: yupResolver(isSubmitted ? ratingSchema2 : ratingSchema),
  });
  const onClose = () => {
    status !== "success" && form.reset();
    close();
  };

  const formSubmit = async (values: any) => {
    if (!form.values.review) {
      onClose();
      return;
    }
    setStatus("pending");
    if (isSubmitted) {
      await addRating({
        projIdEnc: params?.slug,
        rating: isSubmitted?.rating,
        review: form.values?.review,
      });
      const udpatedData = value?.map((val) => {
        if (val.proj === projIdEnc) {
          return { ...val, review: form.values?.review };
        }
        return val;
      });
      setValue(udpatedData);
    } else {
      await addRating({ ...values, projIdEnc: params?.slug });
      setValue((prev: any) => [...prev, { ...values, proj: projIdEnc }]);
    }
    setStatus("success");
  };
  const isMobile = useMediaQuery(`(max-width: 750px)`);
  return (
    <Modal
      classNames={{
        title: S.title,
        root: S.root,
        close: S.close,
        content: S.content,
        overlay: S.overlay,
        header:
          !session || status === "success" || isSubmitted
            ? S.disabled
            : S.header,
      }}
      opened={opened}
      onClose={onClose}
      centered
      title="Add Ratings"
      size={isMobile ? "100%" : session ? "55%" : "35%"}
    >
      <FormProvider form={form}>
        <div className="relative">
          {(!session || status === "success" || isSubmitted) && (
            <Close close={onClose} className="absolute top-3 right-1" />
          )}
          {session ? (
            status === "success" || isSubmitted ? (
              <Success
                close={onClose}
                projIdEnc={projIdEnc}
                projName={projName}
                formSubmit={formSubmit}
              />
            ) : (
              <RatingForm projName={projName} formSubmit={formSubmit} />
            )
          ) : (
            <LoginPopup type="RATING" />
          )}
        </div>
      </FormProvider>
    </Modal>
  );
};

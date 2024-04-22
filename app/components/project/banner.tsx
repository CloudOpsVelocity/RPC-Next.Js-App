"use client";
import { Button, Modal, Rating, Textarea } from "@mantine/core";
import { useLocalStorage, useMediaQuery } from "@mantine/hooks";
import Image from "next/image";
import React, { useState } from "react";
import S from "@/app/styles/Rating.module.css";
import { useForm, yupResolver } from "@mantine/form";
import { ratingSchema } from "@/app/validations/project";
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
  const [status, setStatus] = useState<
    "pending" | "idle" | "success" | "error"
  >("idle");
  const form = useForm({
    initialValues: {
      review: "",
      rating: 0,
    },
    validate: yupResolver(ratingSchema),
  });
  const onClose = () => {
    status !== "success" && form.reset();
    close();
  };
  const isSubmitted = value?.find((val) => val.proj === projIdEnc);
  const formSubmit = async (values: any) => {
    setStatus("pending");
    await addRating({ ...values, projIdEnc: params?.slug });
    setValue((prev: any) => [...prev, { ...values, proj: projIdEnc }]);
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
      title="Add Rating"
      size={isMobile ? "100%" : session ? "xl" : "35%"}
    >
      <div className="relative">
        {(!session || status === "success" || isSubmitted) && (
          <Close close={onClose} className="absolute top-3 right-1" />
        )}
        {session ? (
          status === "success" || isSubmitted ? (
            <Success
              close={onClose}
              text={form.values.review || isSubmitted?.review}
              rating={form.values.rating || isSubmitted?.rating}
            />
          ) : (
            <form
              onSubmit={form.onSubmit(formSubmit)}
              className="max-w-[100%] mt-[2%] mx-auto my-8   rounded-lg space-y-2 p-5"
            >
              <div className="flex md:justify-center items-center mb-[32px]">
                <Rating
                  classNames={{
                    starSymbol: S.star,
                    symbolBody: S.star,
                  }}
                  emptySymbol={
                    <IconSun className="w-[45px] h-[45px]  md:w-[70px] md:h-[70px]" />
                  }
                  fullSymbol={
                    <RatingStar
                      fill="#FFD600"
                      className="w-[45px] h-[45px]  md:w-[70px] md:h-[70px]"
                    />
                  }
                  {...form.getInputProps("rating")}
                />
              </div>

              <h2 className="text-[#4D6677] text-2xl not-italic font-bold leading-[23.784px]  !mb-[24px]">
                Add your feedback for {projName} Project !
              </h2>

              <div className=" gap-4 ">
                <div className="flex-1">
                  <Textarea
                    size="lg"
                    name="review"
                    w={"100%"}
                    h={"100%"}
                    id="review"
                    className={clsx(
                      " rounded-[10px]   placeholder:!text-[#4D6677]  placeholder:!text-2xl italic font-medium leading-[23.784px] ",
                      !form.errors.review &&
                        "border-solid border-[#737579] border "
                    )}
                    placeholder="Start typing here"
                    radius={"10px"}
                    rows={4}
                    // maxLength={200}
                    {...form.getInputProps("review")}
                    onBlur={(e) => handleTrimAndReplace(e, "review", form)}
                  />
                </div>
                <Button
                  loading={status === "pending"}
                  type="submit"
                  className="inline-flex items-center justify-center rounded-md !text-[20px] font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 !bg-[#0073C6] text-white mt-6"
                >
                  Submit
                </Button>
              </div>
            </form>
          )
        ) : (
          <LoginPopup type="RATING" />
        )}
      </div>
    </Modal>
  );
};

const Success = ({ text, rating }: any) => {
  return (
    <div className="px-5 py-8">
      <h1 className="text-[#001F35] text-4xl not-italic font-semibold leading-[normal] mb-[20px]">
        Congratulations 🎉
      </h1>
      <p className="text-[#202020] text-2xl not-italic font-medium leading-[normal] mb-[30px]">
        Your rating has been submitted successfully!
      </p>
      <div className="inline-flex flex-col justify-center items-start gap-[19px] px-4 py-[15px] rounded bg-[#cae9ff4d] w-full">
        <div className="flex md:justify-center items-center ">
          <Rating
            value={rating}
            readOnly
            classNames={{
              starSymbol: S.star,
              symbolBody: S.star,
            }}
            emptySymbol={
              <IconSun className="w-[45px] h-[45px]  md:w-[70px] md:h-[70px]" />
            }
            fullSymbol={
              <RatingStar
                fill="#FFD600"
                className="w-[45px] h-[45px]  md:w-[70px] md:h-[70px]"
              />
            }
          />
        </div>

        <p className="text-black text-xl not-italic font-medium leading-8 tracking-[0.8px] ml-2">
          {text}
        </p>
      </div>
    </div>
  );
};

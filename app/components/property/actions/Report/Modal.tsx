import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { Modal, Button, Textarea } from "@mantine/core";
import ReportButton from "./button";
import clsx from "clsx";
import S from "@/app/styles/Rating.module.css";
import { useState } from "react";
import Styles from "@/app/styles/Qna.module.css";
import { useParams } from "next/navigation";
import Close from "@/app/components/project/button/close";
import { ReportSuccesssMessage } from "@/app/components/project/success";
import ReportOptions from "./reportOptions";
import { number } from "yup";

export default function ReportModal({ issueData }: any) {
  const { slug } = useParams<{ slug: string }>();
  const [opened, { open, close }] = useDisclosure(false);
  const [status, setStatus] = useState<
    "idle" | "error" | "loading" | "success"
  >("idle");
  const [reportStatus, setreportStatus] = useState<number[]>([]);
  const [text, setText] = useState("");
  const formSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (reportStatus.includes(607)) {
      if (!text) {
        setStatus("error");
        return;
      }
    }

    setStatus("loading");
    try {
      const singleString = reportStatus.join(", ");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user-actions/report?id=${slug}&iden=L`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ comment: text, status: singleString }),
        }
      );
      if (response.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  const reportIssuseFun = (cid: number) => {
    const index = reportStatus.indexOf(cid);
    if (index !== -1) {
      reportStatus.splice(index, 1);
    } else {
      reportStatus.push(cid);
    }
    console.log(reportStatus);
  };
  const isMobile = useMediaQuery("(max-width: 601px)");
  console.log(reportStatus);
  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        size={isMobile ? "90%" : "55%"}
        centered
        {...(status === "success" && {
          classNames: {
            title: Styles.title,
            root: Styles.root,
            close: Styles.close,
            content: Styles.content,
            overlay: Styles.overlay,
            header: Styles.disabled,
            body: Styles.body,
          },
        })}
        className="w-full md:w-[70%] lg:w-[40%] h-auto "
        styles={{
          header: {
            display: "none",
          },
        }}
        w={"full"}
      >
        <div className="relative">
          <Close close={close} className="absolute top-3 -right-2 z-10" />
          {status === "success" ? (
            <ReportSuccesssMessage close={close} />
          ) : (
            <>
              {" "}
              <header className="flex  flex-col items-center gap-[8px] text-center pt-3 mb-2">
                <p className="text-[#242424] text-center font-[Montserrat] text-[18px] sm:text-[22px] not-italic font-medium leading-[normal]">
                  Report Issue for Property
                </p>
                <p className="text-[#148B16] font-[Montserrat] text-xs sm:text-[18px] not-italic font-medium leading-[normal]">
                  Let us know your feedback this will allow us to serve you
                  better!
                </p>
              </header>
              <ReportOptions
                reportIssuseFun={reportIssuseFun}
                issueData={issueData}
                reportStatus={reportStatus}
              />
              <form onSubmit={formSubmit} className=" gap-1 sm:gap-4 ">
                <p className="text-[#001F35] text-sm not-italic font-semibold leading-[normal] mb-1">
                  Share your comment below
                </p>
                <div className="flex-1">
                  <Textarea
                    size="lg"
                    name="review"
                    w={"100%"}
                    h={"100%"}
                    id="review"
                    className={clsx(
                      " rounded-[10px] !text-[12px]  placeholder:!text-[#4D6677]  placeholder:!text-xl xl:placeholder:!text-2xl italic font-medium leading-[23.784px] ",
                      status === "error" && "border-solid border-red-500 border"
                    )}
                    placeholder="Start typing here"
                    radius={"10px"}
                    rows={2}
                    maxLength={401}
                    classNames={{
                      input: S.ratingInput,
                    }}
                    onChange={(e) => setText(e.target.value)}
                    value={text}
                  />
                </div>
                <div className="flex justify-center items-center ">
                  <Button
                    //   loading={status === "pending"}
                    type="submit"
                    className="inline-flex items-center justify-center rounded-md text-[14px]  xl:text-[20px] font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 !bg-[#0073C6] text-white mt-3 sm:mt-6"
                  >
                    Submit
                  </Button>
                </div>
              </form>
            </>
          )}
        </div>
      </Modal>

      <ReportButton open={open} />
    </>
  );
}

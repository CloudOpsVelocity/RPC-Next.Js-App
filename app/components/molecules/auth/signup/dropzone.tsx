"use client";
import "@mantine/dropzone/styles.css";
import { mediaCloudIcon } from "@/app/images/commonSvgs";
import { Button, Group, Image, Modal, Text, rem } from "@mantine/core";
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import toast from "react-hot-toast";
import { useState } from "react";
import Logo from "@/app/components/atoms/Logo";
import ProjectDetailsP from "@/app/components/project/projectDetailsP";
import { useDisclosure } from "@mantine/hooks";
import S from "@/app/styles/Share.module.css";
interface DropZoneProps extends Partial<DropzoneProps> {
  onLogoSelect: (logo: File) => void;
  logo?: File;
}

export function DropZone(props: Partial<DropZoneProps>) {
  const [error, setError] = useState("");
  return (
    <>
      <Text fw={500} mt={"md"}>
        Upload Logo
      </Text>
      {props.logo ? (
        <Preview main={props.onLogoSelect} logo={props.logo} />
      ) : (
        <Dropzone
          title="Upload LOGO"
          onDrop={(files) => {
            const logoFile = files[0];
            props.onLogoSelect && props.onLogoSelect(logoFile);
          }}
          onReject={(files) =>
            setError("File size must not exceed more than 10 MB")
          }
          maxSize={5 * 1024 ** 2}
          accept={IMAGE_MIME_TYPE}
          {...props}
        >
          {/* <Dropzone.Accept>{mediaCloudIcon}</Dropzone.Accept> */}
          <Dropzone.Reject>Eroor</Dropzone.Reject>
          {/* <Dropzone.Idle>{mediaCloudIcon}</Dropzone.Idle> */}

          <div className="flex justify-center items-center h-full space-x-2">
            {mediaCloudIcon}
            <div>
              <p className="text-black text-sm not-italic font-medium leading-[normal]">
                Select a file or drag and drop here
              </p>
              <p className="text-[#545353] text-[10px] not-italic font-normal leading-[normal]">
                JPG, PNG or JPEG, file size no more than 10MB
              </p>{" "}
            </div>
            <Button size="xs" variant="outline">
              Select File
            </Button>
          </div>
          <p className="text-[color:var(--Mandatory,#F00)] text-[10px] italic font-medium leading-[normal]">
            {error}
          </p>
        </Dropzone>
      )}
    </>
  );
}

const Preview = ({ main, logo }: any) => {
  const imageUrl = URL.createObjectURL(logo);
  const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  return (
    <>
      <div className="flex items-center p-4 bg-white border border-gray-300 rounded-lg">
        <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-lg">
          <img
            src={imageUrl} // You may want to use the actual image source from `logo`
            alt="bon ton logo"
            className="w-12 h-12"
            width={64}
            height={64}
            style={{ aspectRatio: "64 / 64", objectFit: "cover" }}
          />
        </div>
        <div className="flex flex-col flex-grow ml-4">
          <span className="font-medium">{logo ? logo.name : "No File"}</span>
          <span className="text-sm text-gray-500">
            {logo ? formatBytes(logo.size) : ""}
          </span>
        </div>
        <div className="flex space-x-2">
          <ImagePreivewModal logo={logo} />
          <svg
            onClick={() => main(null)}
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-blue-500 cursor-pointer"
          >
            <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
            <path d="m15 5 4 4" />
          </svg>
          <svg
            onClick={() => main(null)}
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-red-500 cursor-pointer"
          >
            <path d="M3 6h18" />
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
          </svg>
        </div>
      </div>
    </>
  );
};
const ImagePreivewModal = ({ logo }: any) => {
  const [opened, { open, close }] = useDisclosure(false);
  const imageUrl = URL.createObjectURL(logo);
  const preview = (
    <Image
      src={imageUrl}
      onLoad={() => URL.revokeObjectURL(imageUrl)}
      className="h2"
    />
  );

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        centered
        classNames={{
          close: S.close,
          content: S.body,
        }}
      >
        {preview}
      </Modal>

      <svg
        onClick={open}
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-blue-500 cursor-pointer"
      >
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
        <circle cx={12} cy={12} r={3} />
      </svg>
    </>
  );
};

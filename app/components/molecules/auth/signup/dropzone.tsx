"use client";
import "@mantine/dropzone/styles.css";
import { mediaCloudIcon } from "@/app/images/commonSvgs";
import { Button, Group, Image, Text, rem } from "@mantine/core";
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import toast from "react-hot-toast";
import { useState } from "react";
interface DropZoneProps extends Partial<DropzoneProps> {
  onLogoSelect: (logo: File) => void;
  logo?: File;
}

export function DropZone(props: Partial<DropZoneProps>) {
  const [error, setError] = useState("");
  const imageUrl = props.logo ? URL.createObjectURL(props.logo) : "";
  const preview = (
    <Image
      src={imageUrl}
      onLoad={() => URL.revokeObjectURL(imageUrl)}
      className="h2"
    />
  );
  return (
    <>
      <Text fw={500} mt={"md"}>
        Upload Logo
      </Text>
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
        {preview}
      </Dropzone>
    </>
  );
}

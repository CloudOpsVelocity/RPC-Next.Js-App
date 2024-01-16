"use client";
import "@mantine/dropzone/styles.css";
import { mediaCloudIcon } from "@/app/images/commonSvgs";
import { Group, Image, Text, rem } from "@mantine/core";
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from "@mantine/dropzone";
interface DropZoneProps extends Partial<DropzoneProps> {
  onLogoSelect: (logo: File) => void;
  logo?: File;
}

export function DropZone(props: Partial<DropZoneProps>) {
  const imageUrl = props.logo ? URL.createObjectURL(props.logo) : "";
  const preview = (
    <Image src={imageUrl} onLoad={() => URL.revokeObjectURL(imageUrl)} />
  );
  return (
    <Dropzone
      mt={"md"}
      onDrop={(files) => {
        const logoFile = files[0];
        props.onLogoSelect && props.onLogoSelect(logoFile);
      }}
      onReject={(files) => console.log("rejected files", files)}
      maxSize={5 * 1024 ** 2}
      accept={IMAGE_MIME_TYPE}
      {...props}
    >
      <Group
        justify="center"
        gap="xl"
        mih={100}
        style={{ pointerEvents: "none" }}
      >
        {/* <Dropzone.Accept>{mediaCloudIcon}</Dropzone.Accept>
        <Dropzone.Reject>{mediaCloudIcon}</Dropzone.Reject>
        <Dropzone.Idle>{mediaCloudIcon}</Dropzone.Idle> */}

        <div className="flex">
          <div>
            <p className="text-black text-sm not-italic font-medium leading-[normal]">
              Select a file or drag and drop here
            </p>
            <p className="text-[#545353] text-[10px] not-italic font-normal leading-[normal]">
              JPG, PNG or JPEG, file size no more than 10MB
            </p>{" "}
          </div>
          <button className="flex h-[26px] items-center gap-2.5 px-4 py-3 rounded border border-[color:var(--Secondary-Blue-1,#0073C6)] border-solid text-[#0073C6] ">
            Select File
          </button>
        </div>
        {preview}
      </Group>
    </Dropzone>
  );
}

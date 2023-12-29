"use client";
import "@mantine/dropzone/styles.css";
import { mediaCloudIcon } from "@/app/images/commonSvgs";
import { Group, Text, rem } from "@mantine/core";
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from "@mantine/dropzone";

export function DropZone(props: Partial<DropzoneProps>) {
  return (
    <Dropzone
      mt={"md"}
      onDrop={(files) => console.log("accepted files", files)}
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
        <Dropzone.Accept>{mediaCloudIcon}</Dropzone.Accept>
        <Dropzone.Reject>{mediaCloudIcon}</Dropzone.Reject>
        <Dropzone.Idle>{mediaCloudIcon}</Dropzone.Idle>

        <div>
          <Text size="xl" inline>
            Drag images here or click to select files
          </Text>
          <Text size="sm" c="dimmed" inline mt={7}>
            Attach as many files as you like, each file should not exceed 5mb
          </Text>
        </div>
      </Group>
    </Dropzone>
  );
}

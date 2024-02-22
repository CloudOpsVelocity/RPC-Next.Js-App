import { Image } from "@mantine/core";
import React from "react";

type Props = { searchParams: { path: string } };
export default function Page({ searchParams: { path } }: Props) {
  return (
    <div className="flex justify-center items-center h-[100vh]">
      <Image radius="md" src={`${path}`} h={600} w="auto" fit="contain" />
    </div>
  );
}

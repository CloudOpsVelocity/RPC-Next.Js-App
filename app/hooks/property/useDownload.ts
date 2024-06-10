import { useSession } from "next-auth/react";
import React from "react";
import { usePopShortList } from "../popups/useShortListCompare";

export default function useDownload(name: string) {
  const { data: session } = useSession();
  const [, { open: LoginOpen }] = usePopShortList();
  const handleDownload = async (imgUrl: string) => {
    console.log(imgUrl);
    if (session) {
      try {
        const response = await fetch(imgUrl);
        console.log(response);
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const downloadLink = document.createElement("a");
        downloadLink.href = url;
        downloadLink.download = `${name}.jpg`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        URL.revokeObjectURL(url);
      } catch (error) {
        console.error("Error downloading image:", error);
      }
    } else {
      LoginOpen();
    }
  };
  return { handleDownload };
}

import downloadPDF from "@/app/(dashboard)/search/Page/utils";
import { usePopShortList } from "@/app/hooks/popups/useShortListCompare";
import { DownLoadIcon } from "@/app/images/commongsSvgs2";
import { useSession } from "next-auth/react";
import React, { useState } from "react";

type Props = {
  brochureUrl: string;
};

export default function DownloadBrocher({ brochureUrl: url }: Props) {
  const [isLoading, setIsLoading] = useState(false);

  const { data: session } = useSession();
  const [, { open: LoginOpen }] = usePopShortList();

  const handleDownload = () => {
    if (session) {
      url && window.open(`/pdf/${encodeURIComponent(url.split(".net")[1])}`);
    } else {
      LoginOpen(() => {
        url && window.open(`/pdf/${encodeURIComponent(url.split(".net")[1])}`);
      });
    }
  };

  return (
    <button
      onClick={handleDownload}
      className="bg-btnPrimary text-white rounded text-[12px] inline-flex max-w-fit sm:px-1 sm:py-0.5 font-bold justify-center items-center ml-auto mt-[4px]"
    >
      <DownLoadIcon className="w-[20px] h-[20px]" /> Brochure
    </button>
  );
}

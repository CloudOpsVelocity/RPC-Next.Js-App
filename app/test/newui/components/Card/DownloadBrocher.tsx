import downloadPDF from "@/app/(dashboard)/search/Page/utils";
import { DownLoadIcon } from "@/app/images/commongsSvgs2";
import React, { useState } from "react";

type Props = {
  brochureUrl: string;
};

export default function DownloadBrocher({ brochureUrl }: Props) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = async () => {
    setIsLoading(true);
    try {
      await downloadPDF(brochureUrl);
    } catch (error) {
      console.error("Error downloading brochure:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      className="bg-btnPrimary text-white rounded-lg text-[12px] inline-flex max-w-fit px-2 py-1 font-bold justify-center items-center ml-auto mt-[8px]"
      onClick={handleDownload}
      disabled={isLoading} // Disable the button when loading
    >
      {isLoading ? (
        <span>Loading...</span> // Loading indicator
      ) : (
        <>
          <DownLoadIcon className="w-[20px] h-[20px]" /> Brochure
        </>
      )}
    </button>
  );
}

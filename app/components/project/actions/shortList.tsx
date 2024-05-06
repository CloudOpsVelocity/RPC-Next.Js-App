import {
  Shorlisted,
  ShortListIcon,
  shortlistIconSvg,
} from "@/app/images/commonSvgs";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import React from "react";
import { useShortlistAndCompare } from "@/app/hooks/storage";
import { usePopShortList } from "@/app/hooks/popups/useShortListCompare";
import clsx from "clsx";
import useDynamicProj from "@/app/hooks/project/useDynamic";

export default function ShortList() {
  const { data: session } = useSession();
  const { slug } = useParams<{ slug: string }>();
  const { toggleShortlist, shortlistedItems } = useShortlistAndCompare();
  const [, { open }] = usePopShortList();

  const userProjData = useDynamicProj();

  const onAddingShortList = () => {
    if (session) {
      toggleShortlist({
        id: slug,
        status: userProjData?.data?.shortListed ? "N" : "Y",
      });
    } else {
      open();
    }
  };

  return (
    <button
      onClick={() => onAddingShortList()}
      className={clsx(
        "flex justify-center items-center gap-1 p-2 rounded-lg border-[0.8px] border-solid border-[#0073C6] bg-[#fafafa] text-[#0073C6] text-2xl not-italic font-semibold leading-[normal] tracking-[0.96px]",
        userProjData?.data?.shortListed &&
          "bg-[#E4F4FF] text-[#148B16] text-2xl not-italic font-semibold leading-[normal] tracking-[0.96px]"
      )}
    >
      <ShortListIcon
        color={userProjData?.data?.shortListed ? "#148B16" : "#0073C6"}
      />
      {userProjData?.data?.shortListed ? "Added to" : "Add to"} Shortlist
    </button>
  );
}

"use client";
type Props = {
  url: string;
};
const ViewAllButton: React.FC<Props> = ({ url }) => {
  const handleView = () => {
    window.open(url, "_blank");
  };
  return (
    <button
      className="inline-flex h-[24px] sm:h-auto max-w-fit justify-center text-[12px] items-center gap-2.5 rounded !p-[4px] !sm:p-[6px] bg-[#41d1d44d] text-white xl:text-[14px] not-italic font-bold leading-[normal] tracking-[0.4px]"
      onClick={handleView}
    >
      View Details
    </button>
  );
};
export default ViewAllButton;

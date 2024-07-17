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
      className="inline-flex max-w-fit justify-center text-[12px] items-center gap-2.5 rounded  p-2 sm:p-2.5 bg-[#41d1d44d] text-white sm:text-xl not-italic font-bold leading-[normal] tracking-[0.4px]"
      onClick={handleView}
    >
      View Detail
    </button>
  );
};
export default ViewAllButton;

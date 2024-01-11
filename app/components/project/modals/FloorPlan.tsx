import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Select } from "@mantine/core";
import { PopupOpenSvg } from "@/app/images/commonSvgs";
import S from "@/app/styles/Floorplan.module.css";
function FloorPlanModal() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <div
        className="bg-[#F4FBFF] p-[10px] rounded-[29px] gap-[12px] flex justify-end items-center  "
        onClick={open}
      >
        <p className="text-[12px] lg:text-[14px] font-[600] text-[#0073C6] underline ">
          Click on image to open floor plan details
        </p>
        <PopupOpenSvg className="w-[24px] h-[24px] lg:w-[33px] lg:h-[33px] " />
      </div>
      <Modal
        opened={opened}
        classNames={{
          title: S.title,
        }}
        onClose={close}
        title="Floor Plan"
        size={"90%"}
      >
        <>
          <div className="bg-white p-8">
            <h1 className="text-2xl font-bold">Floor Plan</h1>
            <p className="text-sm mt-2 mb-6">
              See floor plan according to your selections
            </p>
            <div className="flex flex-wrap gap-4 mb-4">
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 w-fit text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                2 BHK
              </div>
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 w-fit text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                Unit type X
              </div>
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 w-fit text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                North
              </div>
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 w-fit text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                Facing X
              </div>
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 w-fit text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                Tower 1
              </div>
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 w-fit text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                Tower X
              </div>
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 w-fit text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                01
              </div>
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 w-fit text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                Unit Number X
              </div>
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 w-fit text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                03
              </div>
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 w-fit text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                Block X
              </div>
              <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                Clear All Filter
              </button>
            </div>
            <div className="grid grid-cols-3 gap-8">
              <div className="col-span-1">
                <div className="grid grid-cols-2 gap-4">
                  <Select
                    w={"full"}
                    mt="md"
                    label="Tower"
                    className="!w-[46%]"
                    placeholder="-- select Tower --"
                    data={["1", "2", "3", "4", "5"]}
                    searchable
                    maxDropdownHeight={200}
                  />
                </div>
                <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full mt-4">
                  Search
                </button>
              </div>
              <div className="col-span-2">
                <div className="relative">
                  <img
                    src="/placeholder.svg"
                    alt="Floor Plan"
                    className="border"
                    width={800}
                    height={400}
                    style={{ aspectRatio: "800 / 400", objectFit: "cover" }}
                  />
                  <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 absolute top-2 right-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-gray-600"
                    >
                      <rect width={18} height={18} x={3} y={3} rx={2} ry={2} />
                      <line x1={3} x2={21} y1={9} y2={9} />
                      <path d="m9 16 3-3 3 3" />
                    </svg>
                  </button>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-gray-600"
                    >
                      <path d="m15 18-6-6 6-6" />
                    </svg>
                  </button>
                  <div className="grid grid-cols-5 gap-2">
                    <img
                      src="/placeholder.svg"
                      alt="Floor Plan Thumbnail"
                      className="border"
                      width={100}
                      height={50}
                      style={{ aspectRatio: "100 / 50", objectFit: "cover" }}
                    />
                    <img
                      src="/placeholder.svg"
                      alt="Floor Plan Thumbnail"
                      className="border"
                      width={100}
                      height={50}
                      style={{ aspectRatio: "100 / 50", objectFit: "cover" }}
                    />
                    <img
                      src="/placeholder.svg"
                      alt="Floor Plan Thumbnail"
                      className="border"
                      width={100}
                      height={50}
                      style={{ aspectRatio: "100 / 50", objectFit: "cover" }}
                    />
                    <img
                      src="/placeholder.svg"
                      alt="Floor Plan Thumbnail"
                      className="border"
                      width={100}
                      height={50}
                      style={{ aspectRatio: "100 / 50", objectFit: "cover" }}
                    />
                    <img
                      src="/placeholder.svg"
                      alt="Floor Plan Thumbnail"
                      className="border"
                      width={100}
                      height={50}
                      style={{ aspectRatio: "100 / 50", objectFit: "cover" }}
                    />
                  </div>
                  <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-gray-600"
                    >
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      </Modal>
    </>
  );
}

export default FloorPlanModal;

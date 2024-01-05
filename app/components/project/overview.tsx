import PriceBag, {
  EndDate,
  Locality,
  Phone,
  ProjectStatus,
  PropertyAvailable,
  StartDate,
  TotalLandArea,
  WhatsAppButton,
} from "@/app/images/commonSvgs";
import ProjBasicDetails from "@/app/project/projBasicDetails";
import Button from "../../elements/button";
import React from "react";

type Props = {};

export default function Overview({}: Props) {
  return (
    <div className="pt-[2%] w-[90%] rounded-[24px] shadow-md mb-[5%] mt-[2%] bg-gradient-to-r from-[#F6F6F6] /0 via-[#FFF] /45 to-[#FEFFFF]/100 ">
      <div className="pl-[2%] pr-[2%] flex justify-between items-center ">
        <div>
          <h2 className="text-[24px] lg:text-[32px] text-[#148B16] font-[700]">
            sarang by sumadhura
          </h2>
          <p className="text-[16px] lg:text-[24px] text-[#505050] font-[500]">
            Folium by Sumadhura, Borewell Rd, Whitefield, Palm Meadows,
            Ramagondanahalli, Bengaluru, Karnataka 560066
          </p>
        </div>
        <div className=" flex justify-center items-end flex-col ">
          <p className="text-[20px] lg:text-[24px] text-[#4D6677] font-[700] whitespace-nowrap">
            4.0 Ratings
          </p>
          <p className="text-[20px] lg:text-[24px] text-[#0073C6] font-[600] decoration-dashed underline whitespace-nowrap ">
            Call now
          </p>
        </div>
      </div>

      <div className="pl-[2%] pr-[2%] flex justify-between items-end w-full mb-[3%] mt-[3%]">
        <div className="flex justify-start items-start flex-wrap w-[80%] ">
          <ProjBasicDetails
            key="propertyAvailable"
            icon={<PropertyAvailable />}
            title="Property Available"
            value={"Apartment, Rowhouse, Villa, Villament, Plot"}
            className="mr-[5%]  pt-[2%]"
          />
          <ProjBasicDetails
            key="projectStatus"
            icon={<ProjectStatus />}
            title="Project Status"
            value={"New Launch"}
            className="mr-[5%]  pt-[2%]"
          />

          <ProjBasicDetails
            key="totalLandArea"
            icon={<TotalLandArea />}
            title="Total Land Area"
            value={"81 Acers"}
            className="mr-[5%]  pt-[2%]"
          />

          <ProjBasicDetails
            key="totalLandArea"
            icon={<TotalLandArea />}
            title="Elevation"
            value={"G +3"}
            className="mr-[5%]  pt-[2%]"
          />

          <ProjBasicDetails
            key="totalLandArea"
            icon={<TotalLandArea />}
            title="Total No: of Units"
            value={"1500 Units"}
            className="mr-[5%]  pt-[2%]"
          />

          <ProjBasicDetails
            key="locality"
            icon={<Locality />}
            title="Locality"
            value={"Whitefield, Bengaluru"}
            className="mr-[5%]  pt-[2%]"
          />

          <ProjBasicDetails
            key="startDate"
            icon={<StartDate />}
            title="Start Date"
            value={"12/ 03/ 2023"}
            className="mr-[5%]  pt-[2%]"
          />
          <ProjBasicDetails
            key="endDate"
            icon={<EndDate />}
            title="End Date"
            value={"12/ 03/ 2023"}
            className="mr-[5%]  pt-[2%]"
          />
        </div>
        <div className=" flex justify-end items-end flex-col ">
          <p className="text-[20px] lg:text-[24px] text-[#0073C6] font-[600] underline decoration-dashed ">
            Add to Compare
          </p>
          <p className="text-[20px] lg:text-[24px] text-[#0073C6] font-[600] underline decoration-dashed ">
            Add to Shortlist
          </p>
        </div>
      </div>
      <div className="flex justify-start items-center w-full flex-row bg-gradient-to-r from-[#EFF5FF] /50 to-[#F2FAFF ]/50 ">
        <PriceBag />

        <div className="flex justify-between items-center w-[100%] flex-row ml-[3%]">
          <div className=" ">
            <p className="text-[#212C33] text-[24px] lg:text-[32px] font-[600]">
              PRICE RANGE{" "}
              <span className="text-[#00487C] text-[32px] lg:text-[40px] whitespace-nowrap font-[700]">
                ₹ 2.52 Cr - ₹ 4.52 Cr
              </span>
            </p>
            <Button
              icon={<Phone />}
              title="Request a Callback"
              onChange={() => ""}
              buttonClass=" text-[#FFF] text-[16px] font-[600] bg-[#0073C6]  rounded-[5px] shadow-md whitespace-nowrap flex items-center p-[6px]  "
            />
          </div>

          <WhatsAppButton className="cursor-pointer" onClick={""} />
        </div>
      </div>
    </div>
  );
}

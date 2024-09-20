"use client";
import React from "react";
import { termsAndConditions } from "./constantData";

type SubContentType = {
  para: string;
};

type ContentType = {
  para: string;
  subContent?: SubContentType[] | undefined;
};

type otherDetailsContentType = {
  lable?: string;
  value?: string;
};

type TermsType = {
  id: number;
  title: string;
  contant?: ContentType[] | undefined;
  listType?: string;
  description?:string;
  otherDetails?:otherDetailsContentType[] | undefined; 
};

export default function Page() {
  return (
    <div className=" pl-0 pr-0 xl:pl-[10%] xl:pr-[10%] bg-[#F2F2F2]  ">
      <div className="p-[15px] md:p-[20px] bg-white ">
        <h1 className="text-[#464646] text-[30px] md:text-[32px] not-italic font-semibold leading-[normal] mb-[20px] md:mb-[25px]">Terms & Conditions</h1>
        <ol>
            {termsAndConditions && termsAndConditions.map((eachObj: TermsType | any) => {
              var contantList = eachObj.contant ? eachObj.contant : [];
              var otherDetailsList = eachObj.otherDetails ? eachObj.otherDetails : [];
              
              return (
                <li className="ml-[20px] " key={`terms&conditionsEachBlock_${eachObj.id}`}>
                  <h3 className="text-[#464646] font-[sans-serif, source sans pro] text-[16px] not-italic font-semibold leading-[normal] mt-[12px] md:mt-[16px] relative left-[-16px] mb-[4px] ">{eachObj.id}. {eachObj.title}</h3>
                  
                  {eachObj?.description && <p>{eachObj?.description}</p> }
                  
                  {contantList.length > 0 && 
                  contantList.map((eachContant: ContentType, contantIndex: number) => {
                      var subContentList = eachContant?.subContent ? eachContant?.subContent : [];
                      return (
                        <div
                          className="text-[#464646] text-[14px] not-italic"
                          key={`contentEachParaPoint_${eachContant.para[contantIndex]}`}
                        >
                          <p className=" font-[sans-serif] leading-6">{eachContant.para ? eachContant.para: "" }</p>

                          <ul className="ml-[20px] ">
                            {subContentList.length > 0 && subContentList.map((eachPoint: any, sunPointindex: number)=>{
                              return(
                                <li className=" font-[sans-serif] leading-6" key={`subContentpoints_${eachPoint?.para[sunPointindex]}`}>
                                  {eachPoint?.para}
                                </li>
                              )
                            })}
                          </ul>
                        </div>
                      );
                  })}

                  {otherDetailsList.length > 0 && 
                  <ul>
                    {otherDetailsList.map((eachDetail: otherDetailsContentType, contantIndex: number) => {
                        var lable = eachDetail?.lable ? `${eachDetail?.lable}: ` : "";
                        var value = eachDetail?.value ? eachDetail?.value: ""
                        return (
                          <li
                            className="text-[#464646] text-[14px] not-italic"
                            key={`otherDetailParaPoint_${lable}`}
                          >
                            <p className=" font-[sans-serif] leading-5 font-semibold ">
                              {lable}
                              <span className=" font-[500] ">{value}</span>
                            </p>
                      
                          </li>
                        );
                    })}
                  </ul>
                  }
                </li>
              );
            })}
        </ol>
      </div>
    </div>
  );
}

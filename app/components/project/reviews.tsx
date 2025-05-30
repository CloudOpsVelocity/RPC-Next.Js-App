"use client";
import React from "react";
import {
  quotesIcon,
} from "@/app/images/commonSvgs";
import useRatings from "@/app/hooks/useRatings";
import { usePopUpRatings } from "@/app/hooks/popups/usePopUpRatings";
import useDynamicProj from "@/app/hooks/project/useDynamic";
import RatingStars from "@/common/components/RatingStars";
import CardsCarousal from "@/common/components/CardsCarousal";
import ReviewJsonScript from "@/app/seo/search/ratings.schema";


export default function Reviews({
  projName,
  projIdEnc,
}: {
  projName: string;
  projIdEnc: string;
}) {
  const [, { open }] = usePopUpRatings();
  const { data } = useRatings(projIdEnc);
  const { data: rData } = useDynamicProj(projIdEnc);

  console.log(data);

  return (
    data?.status &&
    data?.reviewDataList?.filter((item: any) => item.userReview).length !==
      0 && (
      <div id="ratings" className="bg-[#FFF] scroll-mt-[180px] pt-12 w-full ">
        <div className="">
          <div className="w-[90%] mx-auto ">
            <h2 className="text-[#001F35] text-[20px] md:text-[32px] not-italic font-semibold leading-[normal] ">
              Customer Reviews For{" "}
              <span className="text-green-800 not-italic font-bold leading-[normal] capitalize">
                {projName}
              </span>
            </h2>
            <p className="text-[#4D6677] text-[16px] md:text-2xl italic font-medium leading-[normal] tracking-[0.96px] mt-2 mb-5">
              Find helpful customer reviews and review ratings for {projName}
            </p>
            {rData?.userReview && (
              <div className="w-full flex justify-end mb-[20px]">
                <button
                  className="text-[#0073C6] text-xl not-italic font-bold leading-[normal] tracking-[0.8px] underline "
                  onClick={open}
                >
                  Add Review
                </button>
              </div>
            )}
          </div>
          <div className="relative w-[96%] mx-auto px-6">
            {/* <Carousel
              nextControlIcon={<NextCarouselButton />}
              previousControlIcon={<PrevCarouselButton />}
              slideGap={"md"}
              align="start"
              slideSize={{ base: "95%", sm: "50%", md: "33.333333%" }}
              withIndicators
              height={isMobile ? 300 : 250}
              slidesToScroll={1}
              px={isMobile ? 0 : 30}
              classNames={{
                controls: S.controls,
                root: S.Ccontrols,
              }}
              style={{
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
              }}
              withControls={isMobile ? true : data?.reviewDataList.length > 3}
            >
              {data?.reviewDataList
                ?.filter((item: any) => item.userReview).map((eachData: any) => (
                  <Carousel.Slide key={"review__" + eachData.userName} miw={isMobile ? "95%" : 487}>
                    <Review {...eachData} />
                  </Carousel.Slide>
                ))}
            </Carousel> */}
            <CardsCarousal
                key="handPickedProjectsCon"
                allCards={data?.reviewDataList
                ?.filter((item: any) => item.userReview).map((eachData: any, index:number) => (
                    <Review 
                      key={`projDetailsReview_${index.toString()}`} 
                      data={{
                        ...eachData, 
                        index: index.toString(),
                        avgRating: data.reviewOverviewData.averageRating,
                        totalRating: data.reviewOverviewData.averageTotalRating,
                        countTotalReview: data.reviewOverviewData.countTotalReview
                      }}
                    />
                ))}
                dataLength={data?.reviewDataList.length}
                // scrollSize={isTab ? 503 : 631}
                gap={20}
                containerClass={`w-full h-[300px] md:h-[250px] px-0 md:px-[20px] xl:px-[30px]`}
            />
          </div>
        </div>
      </div>
    )
  );
}

const ViewStars = ({rating}:any) => {
  return(
    <p>
      {new Array(rating).fill(null).map((_, index) => (
        <span key={index}>
          {index < rating ? '⭐' : '☆'}
        </span>
      ))}
    </p>
  )
}

const Review = ({ data }: any) => {
  const { userRating, userName, userReview, postedDays, index } = data;

  return (
    <>
      <ReviewJsonScript 
        key={`projDetailsStarSchema_${index}`} 
        data={data} 
      />
      <div className="shadow-[0px_4px_20px_0px_rgba(91,143,182,0.19)] min-w-[335px] md:max-w-lg mt-[20px] bg-[#fff] p-4 relative min-h-[160px] md:min-h-[200px] border rounded-[10px] border-solid border-[#DCE6ED]">
        <span className=" absolute top-[-20px] !z-30  ">{quotesIcon}</span>
        <div className="flex items-center space-x-2 mt-4 md:mt-8">
          <div className="flex-1">
            <div className="flex justify-between items-center gap-[20px] ">
              <div>
                <p className="text-black text-[16px] md:text-[18px] not-italic font-medium leading-[normal]">
                  {userName ?? "GRP USER"}
                </p>
                <p className="text-[#0073C6]  text-[16px] md:text-[18px] not-italic font-medium leading-[normal]">
                  Grp User
                </p>
              </div>
              <div className="text-right flex flex-col align-right ">
                {/* <Rating size={"sm"} value={userRating} readOnly /> */}
                {/* <RatingStars key={`projDetailsStar_${index}`} initialRating={userRating} className="text-[20px]" readOnly={true} /> */}
                <ViewStars rating={userRating} />
                <span className=" text-[12px] md:text-[14px] text-gray-500">
                  {postedDays == "0" ? "Today" : `${postedDays} days ago`} 
                </span>
              </div>
            </div>
            <p className="mt-2 text-[#3E3E3E]  text-[16px] md:text-[18px] not-italic font-normal leading-[normal] tracking-[0.56px]">
              {userReview}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

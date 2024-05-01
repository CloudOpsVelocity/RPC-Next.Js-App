import { IconSun, RatingStar } from "@/app/images/commonSvgs";
import { Button, Rating, Textarea } from "@mantine/core";
import S from "@/app/styles/Rating.module.css";
import { useFormContext } from "@/app/context/rating";
import clsx from "clsx";
import handleTrimAndReplace from "@/app/utils/input/validations";
import { useLocalStorage } from "@mantine/hooks";
interface Props {
  review: string;
  rating: number;
  proj: string;
}
export const Success = ({ projIdEnc, projName, formSubmit }: any) => {
  const form = useFormContext();
  const [value, setValue] = useLocalStorage<Props[]>({
    key: "ur",
    defaultValue: [],
  });
  const isSubmitted = value?.find((val) => val.proj === projIdEnc);
  return (
    <div className="px-5 py-8">
      <h1 className="text-[#001F35] text-4xl not-italic font-semibold leading-[normal] mb-[20px]">
        Congratulations 🎉
      </h1>
      <p className="text-[#202020] text-2xl not-italic font-medium leading-[normal] mb-[30px]">
        Your rating has been submitted successfully!
      </p>
      <div className="inline-flex flex-col justify-center items-start gap-[19px] px-4 py-[15px] rounded bg-[#cae9ff4d] ">
        <div className="flex md:justify-center items-center ">
          <Rating
            value={form.values.rating || isSubmitted?.rating}
            readOnly
            classNames={{
              starSymbol: S.star,
              symbolBody: S.star,
            }}
            emptySymbol={
              <IconSun className="w-[45px] h-[45px]  md:w-[70px] md:h-[70px]" />
            }
            fullSymbol={
              <RatingStar
                fill="#FFD600"
                className="w-[45px] h-[45px]  md:w-[70px] md:h-[70px]"
              />
            }
          />
        </div>
        {isSubmitted?.review && (
          <p className="text-black text-xl not-italic font-medium leading-8 tracking-[0.8px] ml-2">
            {form.values.review || isSubmitted?.review}
          </p>
        )}
      </div>
      {!isSubmitted?.review && (
        <RatingForm
          isSubmitted={isSubmitted}
          projName={projName}
          formSubmit={formSubmit}
        />
      )}
    </div>
  );
};

export const RatingForm = ({ projName, formSubmit, isSubmitted }: any) => {
  const form = useFormContext();
  console.log(isSubmitted);
  return (
    <form
      onSubmit={form.onSubmit(formSubmit)}
      className={clsx(
        "max-w-[100%] mt-[2%] mx-auto my-8   rounded-lg space-y-2 p-5",
        isSubmitted?.rating && "!p-0 !mt-7"
      )}
    >
      {!isSubmitted && (
        <div className="flex md:justify-center items-center mb-[32px] flex-col">
          <Rating
            classNames={{
              starSymbol: S.star,
              symbolBody: S.star,
            }}
            emptySymbol={
              <IconSun className="w-[45px] h-[45px]  md:w-[70px] md:h-[70px]" />
            }
            fullSymbol={
              <RatingStar
                fill="#FFD600"
                className="w-[45px] h-[45px]  md:w-[70px] md:h-[70px]"
              />
            }
            {...form.getInputProps("rating")}
          />

          <p className="text-[#F00] text-xl italic font-normal leading-[23.784px] mt-5">
            {form.errors.rating}
          </p>
        </div>
      )}

      <h2 className="text-[#4D6677] text-2xl not-italic font-bold leading-[23.784px]  !mb-[24px]">
        {isSubmitted
          ? `Forgot to add your feedback for ${projName} Project !`
          : `Add your feedback for ${projName} Project !`}
      </h2>

      <div className=" gap-4 ">
        <div className="flex-1">
          <Textarea
            size="lg"
            name="review"
            w={"100%"}
            h={"100%"}
            id="review"
            className={clsx(
              " rounded-[10px]   placeholder:!text-[#4D6677]  placeholder:!text-2xl italic font-medium leading-[23.784px] ",
              !form.errors.review && "border-solid border-[#737579] border "
            )}
            placeholder="Start typing here"
            radius={"10px"}
            rows={4}
            // maxLength={200}
            {...form.getInputProps("review")}
            onBlur={(e) => handleTrimAndReplace(e, "review", form)}
          />
        </div>
        <Button
          loading={status === "pending"}
          type="submit"
          className="inline-flex items-center justify-center rounded-md !text-[20px] font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 !bg-[#0073C6] text-white mt-6"
        >
          Submit
        </Button>
      </div>
    </form>
  );
};

import Button from "@/app/components/molecules/home-search/button";
import { propertyDetailsTypes } from "@/app/data/projectDetails";
import { SEARCH_FILTER_DATA } from "@/app/data/search";
import useSearchFilters from "@/app/hooks/search";
import { RangeSlider } from "@mantine/core";

const FilterSection = ({ open, close }: any) => {
  const { filters, handleSliderChange, setPropTypes, handleCheckboxClick } =
    useSearchFilters();
  const keys = [35, 33, 31, 34, 32];
  return (
    <section className="p-5 grid gap-5 border-t  ">
      <div>
        <h5 className="text-[#303030] text-base not-italic font-medium mb-2">
          Select Property Type
        </h5>
        <div className="flex gap-5 my-2 flex-wrap">
          {keys.map((keyName) => (
            <Button
              key={keyName}
              value={propertyDetailsTypes?.get(keyName)?.name ?? ""}
              onClick={() =>
                setPropTypes(propertyDetailsTypes?.get(keyName)?.id as number)
              }
              selected={
                filters.propTypes === propertyDetailsTypes?.get(keyName)?.id
              }
            ></Button>
          ))}
        </div>
      </div>

      <div>
        <h5 className="text-[#303030] text-base not-italic font-medium mb-2">
          Select BHK Type
        </h5>
        <div className="flex gap-6 flex-wrap">
          {SEARCH_FILTER_DATA.bhkDetails.map((bhk) => (
            <Button
              key={bhk.value}
              value={bhk.title}
              onClick={() => handleCheckboxClick("unitTypes", bhk.value)}
              selected={filters.unitTypes.includes(bhk.value)}
            ></Button>
          ))}
        </div>
      </div>

      <div className="   gap-[4%]   ">
        <h3 className="  mb-[2%] text-[14px]   text-[#303030] text-base not-italic font-medium">
          Budget
        </h3>
        <p className="text-[#4D6677] text-[16px] font-[600] mb-[2%] ">
          ₹ {filters.bugdetValue[0]} - ₹ {filters.bugdetValue[1]} Cr
        </p>
        <RangeSlider
          key="budgetSlider"
          marks={[
            { value: 0, label: "₹ 0" },
            { value: 0.5, label: "₹ 0.5 Cr" },
            { value: 1, label: "₹ 1 Cr" },
            { value: 1.5, label: "₹ 1.5 Cr" },
            { value: 2, label: "₹ 2 Cr" },
            { value: 2.5, label: "₹ 2.5 Cr" },
            { value: 3, label: "₹ 3 Cr" },
            { value: 3.5, label: "₹ 3.5 Cr" },
            { value: 4, label: "₹ 4 Cr" },
            { value: 4.5, label: "₹ 4.5 Cr" },
            { value: 5, label: "₹ 5 Cr" },
          ]}
          minRange={0.2}
          min={0}
          max={5}
          step={0.05}
          onChange={(value) => handleSliderChange("bugdetValue", value)}
          style={{ width: "100%" }}
          defaultValue={[
            filters?.bugdetValue[0] ?? 0,
            filters?.bugdetValue[1] ?? 5,
          ]}
        />
      </div>
    </section>
  );
};

export default FilterSection;

import { useState } from "react";
import {
  Combobox,
  InputBase,
  useCombobox,
  NumberInput,
  Group,
  Input,
} from "@mantine/core";
import styles from "./Style.module.css";
import { useAtom } from "jotai";
import { homeSearchFiltersAtom } from "@/app/store/home";
import { useMediaQuery } from "@mantine/hooks";
import { searachFilterAtom } from "@/app/store/search";
const MULTIPLIER_LAKH = 100000; // 1 Lakh = 100000
const MULTIPLIER_THOUSAND = 1000;

const MULTIPLIER = 100000;
const THOUSANDMULTIPLIER = 1000;

const groceries = [
  "₹5L",
  "₹10L",
  "₹20L",
  "₹30L",
  "₹40L",
  "₹50L",
  "₹60L",
  "₹70L",
  "₹80L",
  "₹90L",
  "₹1CR",
  "₹10CR",
  "₹20CR",
  "₹30CR",
  "₹40CR",
  "₹50CR",
  "₹60CR",
];

const pricesForRent = [
  "₹0",
  "₹5,000",
  "₹10,000",
  "₹15,000",
  "₹20,000",
  "₹25,000",
  "₹30,000",
  "₹35,000",
  "₹40,000",
  "₹45,000",
  "₹50,000",
  "₹55,000",
  "₹60,000",
  "₹70,000",
  "₹80,000",
  "₹90,000",
  "₹1L",
];

const map = new Map<string, { value: number }>([
  ["₹0", { value: 5 * MULTIPLIER }],
  ["₹10L", { value: 10 * MULTIPLIER }],
  ["₹20L", { value: 20 * MULTIPLIER }],
  ["₹30L", { value: 30 * MULTIPLIER }],
  ["₹40L", { value: 40 * MULTIPLIER }],
  ["₹50L", { value: 50 * MULTIPLIER }],
  ["₹60L", { value: 60 * MULTIPLIER }],
  ["₹70L", { value: 70 * MULTIPLIER }],
  ["₹80L", { value: 80 * MULTIPLIER }],
  ["₹90L", { value: 90 * MULTIPLIER }],
  ["₹1CR", { value: 100 * MULTIPLIER }],
  ["₹10CR", { value: 1000 * MULTIPLIER }],
  ["₹20CR", { value: 2000 * MULTIPLIER }],
  ["₹30CR", { value: 3000 * MULTIPLIER }],
  ["₹40CR", { value: 4000 * MULTIPLIER }],
  ["₹50CR", { value: 5000 * MULTIPLIER }],
  ["₹60CR", { value: 6000 * MULTIPLIER }],

  ["₹0", { value: 0 }],
  ["₹5,000", { value: 5 * THOUSANDMULTIPLIER }],
  ["₹10,000", { value: 10 * THOUSANDMULTIPLIER }],
  ["₹15,000", { value: 15 * THOUSANDMULTIPLIER }],
  ["₹20,000", { value: 20 * THOUSANDMULTIPLIER }],
  ["₹25,000", { value: 25 * THOUSANDMULTIPLIER }],
  ["₹30,000", { value: 30 * THOUSANDMULTIPLIER }],
  ["₹35,000", { value: 35 * THOUSANDMULTIPLIER }],
  ["₹40,000", { value: 40 * THOUSANDMULTIPLIER }],
  ["₹45,000", { value: 45 * THOUSANDMULTIPLIER }],
  ["₹50,000", { value: 50 * THOUSANDMULTIPLIER }],
  ["₹55,000", { value: 55 * THOUSANDMULTIPLIER }],
  ["₹60,000", { value: 60 * THOUSANDMULTIPLIER }],
  ["₹70,000", { value: 70 * THOUSANDMULTIPLIER }],
  ["₹80,000", { value: 80 * THOUSANDMULTIPLIER }],
  ["₹90,000", { value: 90 * THOUSANDMULTIPLIER }],
  ["₹1L", { value: 100 * THOUSANDMULTIPLIER }],
]);

export const toFormattedString = (value: number): string => {
  const formatValue = (num: number) => {
    return num % 1 === 0 ? num.toFixed(0) : num.toFixed(2);
  };

  if (value >= 100 * MULTIPLIER_LAKH) {
    return `${formatValue(value / (100 * MULTIPLIER_LAKH))}CR`;
  } else if (value >= MULTIPLIER_LAKH) {
    return `${formatValue(value / MULTIPLIER_LAKH)}L`;
  } else if (value >= MULTIPLIER_THOUSAND) {
    return `${formatValue(value / MULTIPLIER_THOUSAND)}K`;
  } else {
    return value.toString();
  }
};

export function BasicBudgetSelect() {
  const [f, setValue] = useAtom(searachFilterAtom);
  const activeTab = f.cg ?? "S";
  const handleMinvalue = (value: number) => {
    setValue((f) => ({ ...f, bugdetValue: [value, f.bugdetValue[1]] }));
  };
  const handleMaxValue = (value: number) => {
    setValue((f) => ({ ...f, bugdetValue: [f.bugdetValue[0], value] }));
  };
  // const [minValue, setMinValue] = useState<number>(f.bugdetValue[0]);
  // const [maxValue, setMaxValue] = useState<number>(f.bugdetValue[1]);
  const [minValue, maxValue] = f.bugdetValue;
  const isTab = useMediaQuery("(max-width: 1600px)");

  const [focusedInput, setFocusedInput] = useState<"min" | "max" | null>("min");
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  let defaultArray = activeTab == "S" ? groceries : pricesForRent;

  const filteredOptions = defaultArray.filter((item) => {
    const value = map.get(item)?.value ?? 0;

    if (focusedInput === "max" || !maxValue) {
      // Show all options if maxValue is null, undefined, or empty string while focusing on min
      return value > minValue; // Show options greater than minValue
    } else if (focusedInput === "min") {
      // Show options less than or equal to maxValue while focusing on min
      return value < maxValue;
    } else {
      // Show options between minValue and maxValue if no input is focused
      return value >= minValue && value <= maxValue;
    }
  });

  const options = filteredOptions.map((item) => {
    const value = map.get(item)?.value ?? 0;
    const handleOptionSelect = () => {
      if (focusedInput === "max") {
        // setMaxValue(value);
        handleMaxValue(value);
        // dispatch({
        //   type: "SET_BUGDET_VALUE",
        //   payload: [minValue, value],
        // });
      } else {
        // setMinValue(value);
        handleMinvalue(value);
      }
    };
    return (
      <div
        key={item}
        className={`${styles.option} ${
          focusedInput == "max" ? styles.MaxOption : ""
        }`}
        onClick={handleOptionSelect}
      >
        {item}
      </div>
    );
  });

  const handleMinChange = (val: number) => {
    setValue((f) => ({ ...f, bugdetValue: [val, f.bugdetValue[1]] }));
  };

  const handleMaxChange = (val: number) => {
    setValue((f) => ({ ...f, bugdetValue: [f.bugdetValue[0], val] }));
  };

  const handleMaxBlur = () => {
    if (maxValue < minValue) {
      setValue((f) => ({ ...f, bugdetValue: [f.bugdetValue[0], "" as any] }));
    }
  };
  const handleMinBlur = () => {
    if (maxValue > minValue) {
      setValue((f) => ({ ...f, bugdetValue: ["" as any, f.bugdetValue[1]] }));
    }
  };
  const shouldShowBudget = !(
    f.bugdetValue[0] === 0 && f.bugdetValue[1] === 60 * MULTIPLIER
  );

  return (
    <Combobox
      store={combobox}
      withinPortal={false}
      onOptionSubmit={(val) => {
        const value = map.get(val)?.value ?? 0;
        if (focusedInput === "max") {
          handleMaxChange(value);
        } else {
          handleMinChange(value);
        }
        combobox.closeDropdown();
      }}
      classNames={{
        dropdown: styles.dropdown,
        option: styles.option,
      }}
    >
      <Combobox.Target>
        <InputBase
          component="button"
          type="button"
          rightSection={<DropIcon />}
          onClick={() => combobox.toggleDropdown()}
          rightSectionPointerEvents="none"
          classNames={{
            input: styles.input,
          }}
          size={isTab ? "xs" : "sm"}
        >
          {shouldShowBudget ? (
            `₹${toFormattedString(minValue)}  ${
              "- ₹" + toFormattedString(maxValue)
            }`
          ) : (
            <Input.Placeholder className="!text-black font-[600]">
              Budget
            </Input.Placeholder>
          )}
        </InputBase>
      </Combobox.Target>

      <Combobox.Dropdown>
        <Group>
          <NumberInput
            placeholder="Min Price"
            hideControls
            value={minValue}
            onChange={(val) => handleMinChange(val as number)}
            onFocus={() => setFocusedInput("min")}
            max={f.bugdetValue[1] - 1 || 60 * MULTIPLIER} // Set max based on current filter values
            clampBehavior="strict"
            allowDecimal={false}
            allowNegative={false}
            thousandSeparator
            thousandsGroupStyle="lakh"
            classNames={{ input: styles.minMaxInput }}
            labelProps={{ "data-floating": true }}
            label="Min Price"
          />
          <NumberInput
            placeholder="Max Price"
            hideControls
            value={maxValue}
            onChange={(val) => handleMaxChange(val as number)}
            onFocus={() => setFocusedInput("max")}
            onBlur={handleMaxBlur}
            clampBehavior="strict"
            allowDecimal={false}
            allowNegative={false}
            thousandsGroupStyle="lakh"
            thousandSeparator
            max={6000 * MULTIPLIER}
            classNames={{ input: styles.minMaxInput }}
            label="Max Price"
          />
        </Group>
        {options}
      </Combobox.Dropdown>
    </Combobox>
  );
}

const DropIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="26"
    height="26"
    viewBox="0 0 18 18"
    fill="none"
  >
    <path
      d="M12.4134 6C13.3274 6 13.7624 7.1251 13.0861 7.73994L10.1727 10.3885C9.79125 10.7352 9.20875 10.7352 8.82733 10.3885L5.91394 7.73994C5.23761 7.1251 5.67257 6 6.58661 6H12.4134Z"
      fill="#8EA8CF"
    />
  </svg>
);

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

const MULTIPLIER = 100000;
const groceries = [
  "5L",
  "10L",
  "20L",
  "30L",
  "40L",
  "50L",
  "60L",
  "70L",
  "80L",
  "90L",
  "1CR",
  "10CR",
  "20CR",
  "30CR",
  "40CR",
  "50CR",
  "60CR",
];

const map = new Map<string, { value: number }>([
  ["5L", { value: 5 * MULTIPLIER }],
  ["10L", { value: 10 * MULTIPLIER }],
  ["20L", { value: 20 * MULTIPLIER }],
  ["30L", { value: 30 * MULTIPLIER }],
  ["40L", { value: 40 * MULTIPLIER }],
  ["50L", { value: 50 * MULTIPLIER }],
  ["60L", { value: 60 * MULTIPLIER }],
  ["70L", { value: 70 * MULTIPLIER }],
  ["80L", { value: 80 * MULTIPLIER }],
  ["90L", { value: 90 * MULTIPLIER }],
  ["1CR", { value: 100 * MULTIPLIER }],
  ["10CR", { value: 1000 * MULTIPLIER }],
  ["20CR", { value: 2000 * MULTIPLIER }],
  ["30CR", { value: 3000 * MULTIPLIER }],
  ["40CR", { value: 4000 * MULTIPLIER }],
  ["50CR", { value: 5000 * MULTIPLIER }],
  ["60CR", { value: 6000 * MULTIPLIER }],
]);

const toFormattedString = (value: number) => {
  if (value >= 100 * MULTIPLIER) {
    return `${value / (100 * MULTIPLIER)}CR`;
  } else {
    return `${value / MULTIPLIER}L`;
  }
};

export function BasicBudgetSelect() {
  const [f, dispatch] = useAtom(homeSearchFiltersAtom);
  const [minValue, setMinValue] = useState<number>(f.bugdetValue[0]);
  const [maxValue, setMaxValue] = useState<number>(f.bugdetValue[1]);

  const [focusedInput, setFocusedInput] = useState<"min" | "max" | null>(null);
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const filteredOptions = groceries.filter((item) => {
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
        setMaxValue(value);
        dispatch({
          type: "SET_BUGDET_VALUE",
          payload: [minValue, value],
        });
      } else {
        setMinValue(value);
        dispatch({
          type: "SET_BUGDET_VALUE",
          payload: [value, maxValue],
        });
      }
    };
    return (
      <div key={item} className={styles.option} onClick={handleOptionSelect}>
        {item}
      </div>
    );
  });

  const handleMinChange = (val: number) => {
    setMinValue(val);
    dispatch({ type: "SET_BUGDET_VALUE", payload: [val, maxValue] });
  };

  const handleMaxChange = (val: number) => {
    setMaxValue(val);
    dispatch({ type: "SET_BUGDET_VALUE", payload: [minValue, val] });
  };

  const handleMaxBlur = () => {
    if (maxValue < minValue) {
      setMaxValue("" as any);
      dispatch({ type: "SET_BUGDET_VALUE", payload: [minValue, "" as any] });
    }
  };
  const handleMinBlur = () => {
    if (maxValue > minValue) {
      setMinValue("" as any);
      dispatch({ type: "SET_BUGDET_VALUE", payload: ["" as any, maxValue] });
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
        >
          {shouldShowBudget ? (
            `${toFormattedString(minValue)} - ${toFormattedString(maxValue)}`
          ) : (
            <Input.Placeholder className="!text-black">
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
            thousandSeparator=","
            allowDecimal={false}
            allowNegative={false}
          />
          <NumberInput
            placeholder="Max Price"
            hideControls
            value={maxValue}
            onChange={(val) => handleMaxChange(val as number)}
            onFocus={() => setFocusedInput("max")}
            onBlur={handleMaxBlur}
            clampBehavior="strict"
            thousandSeparator=","
            allowDecimal={false}
            allowNegative={false}
            max={6000 * MULTIPLIER}
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

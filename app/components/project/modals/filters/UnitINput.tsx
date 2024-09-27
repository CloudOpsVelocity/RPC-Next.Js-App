import { useState, useRef } from "react";
import { Combobox, InputBase, useCombobox } from "@mantine/core";
import { useVirtualizer } from "@tanstack/react-virtual";
import S from "@/app/styles/Floorplan.module.css";
import { DropDownIcon } from "@/app/images/commonSvgs";

interface SelectCreatableProps {
  data: string[]; // Array of options to display (strings or objects)
  //   value?: string | null; // Controlled value
  onChange: (value: string | null) => void; // Change handler
  placeholder?: string; // Placeholder text
  label?: string; // Optional label for the input
  // Add any other props you might need
}

export function SelectCreatable({
  data,
  onChange,
  placeholder = "Search value",
  label,
  ...props
}: SelectCreatableProps) {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [search, setSearch] = useState("");

  const exactOptionMatch = data.some((item) => item === search);
  //   const data = exactOptionMatch
  //     ? data
  //     : data.filter((item) =>
  //         item.toLowerCase().includes(search.toLowerCase().trim())
  //       );

  // Virtualization setup
  const parentRef = useRef<HTMLDivElement>(null);
  const rowVirtualizer = useVirtualizer({
    count: data.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 35, // Adjust based on your item height
    overscan: 5, // Number of items to render outside the viewport
  });

  return (
    <Combobox
      store={combobox}
      withinPortal={false}
      onOptionSubmit={(val) => {
        onChange(val); // Update the value using the passed handler
        setSearch(val);
        combobox.closeDropdown();
      }}
      {...props} // Spread any additional props to the Combobox
    >
      <Combobox.Target>
        <InputBase
          size="sm"
          label={label}
          rightSection={<Combobox.Chevron />}
          onChange={(event) => {
            combobox.openDropdown();
            combobox.updateSelectedOptionIndex();
            setSearch(event.currentTarget.value);
          }}
          onClick={() => combobox.openDropdown()}
          onFocus={() => combobox.openDropdown()}
          onBlur={() => {
            combobox.closeDropdown();
            // setSearch(value || "");
          }}
          maw={180}
          placeholder={placeholder}
          rightSectionPointerEvents="none"
          value={search}
          classNames={{ input: S.input, label: S.label }}
          rightSectionProps={<DropDownIcon />}
        />
      </Combobox.Target>
      <Combobox.Dropdown
        ref={parentRef}
        style={{ height: "200px", overflow: "auto" }}
      >
        <Combobox.Options>
          <div
            style={{
              height: rowVirtualizer.getTotalSize(),
              position: "relative",
            }}
          >
            {rowVirtualizer.getVirtualItems().map((virtualRow) => (
              <div
                key={virtualRow.index}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 35, // Match this with estimateSize
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                {" "}
                <Combobox.Option
                  value={data[virtualRow.index]}
                  key={data[virtualRow.index]}
                >
                  {data[virtualRow.index]}
                </Combobox.Option>
              </div>
            ))}
          </div>
          {!exactOptionMatch && search.trim().length > 0 && (
            <Combobox.Option value="$create">+ Create {search}</Combobox.Option>
          )}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}

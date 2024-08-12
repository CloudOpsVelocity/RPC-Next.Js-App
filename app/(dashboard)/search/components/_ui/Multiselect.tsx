import { useState, useEffect } from "react";
import {
  CheckIcon,
  Combobox,
  Group,
  Pill,
  PillsInput,
  useCombobox,
} from "@mantine/core";
import useQsearch from "@/app/hooks/search/useQsearch";

export function MainSearchMultiSelect() {
  const {
    data: searchData,
    isLoading,
    handleResetQuery,
    onSearchChange,
    debounced,
    name,
  } = useQsearch();

  const {
    localities,
    builders,
    projects,
    listing: listings,
    projectListing,
  } = searchData;

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => combobox.updateSelectedOptionIndex("active"),
  });

  const [search, setSearch] = useState("");
  const [value, setValue] = useState<string[]>([]);

  const handleValueSelect = (val: string) =>
    setValue((current) =>
      current.includes(val)
        ? current.filter((v) => v !== val)
        : [...current, val]
    );

  const handleValueRemove = (val: string) =>
    setValue((current) => current.filter((v) => v !== val));

  const values = value.map((item) => (
    <Pill key={item} withRemoveButton onRemove={() => handleValueRemove(item)}>
      {item}
    </Pill>
  ));

  // Create a flat list of groups and items
  const data = [
    {
      group: "Locality",
      items: localities || [],
    },
    {
      group: "Projects",
      items: projects || [],
    },
    {
      group: "Listings",
      items: listings || [],
    },
    {
      group: "Project Listings",
      items: projectListing || [],
    },
    {
      group: "Builders",
      items: builders || [],
    },
  ];

  const filteredOptions = data.flatMap((group) => {
    const filteredItems = group.items.filter((item: any) =>
      item.name.toLowerCase().includes(search.trim().toLowerCase())
    );

    if (filteredItems.length === 0) {
      return [];
    }

    return [
      <Combobox.Group key={group.group} label={group.group}>
        {filteredItems.map((item: any) => (
          <Combobox.Option
            value={`${item.id}+${item.type}`}
            key={item.id}
            active={value.includes(`${item.id}+${item.type}`)}
          >
            <Group gap="sm">
              {value.includes(`${item.id}+${item.type}`) ? (
                <CheckIcon size={12} />
              ) : null}
              <span>
                {item.name} <small>({group.group})</small>
              </span>
            </Group>
          </Combobox.Option>
        ))}
      </Combobox.Group>,
    ];
  });

  useEffect(() => {
    onSearchChange(search);
  }, [search, onSearchChange]);

  return (
    <Combobox
      store={combobox}
      onOptionSubmit={handleValueSelect}
      withinPortal={false}
    >
      <Combobox.DropdownTarget>
        <PillsInput onClick={() => combobox.openDropdown()} mb="3%" maw="60%">
          <Pill.Group>
            {values}

            <Combobox.EventsTarget>
              <PillsInput.Field
                onFocus={() => combobox.openDropdown()}
                onBlur={() => combobox.closeDropdown()}
                value={search}
                placeholder="Search values"
                onChange={(event) => {
                  combobox.updateSelectedOptionIndex();
                  setSearch(event.currentTarget.value);
                }}
                onKeyDown={(event) => {
                  if (event.key === "Backspace" && search.length === 0) {
                    event.preventDefault();
                    handleValueRemove(value[value.length - 1]);
                  }
                }}
              />
            </Combobox.EventsTarget>
          </Pill.Group>
        </PillsInput>
      </Combobox.DropdownTarget>

      <Combobox.Dropdown
        styles={{ dropdown: { maxHeight: 200, overflowY: "auto" } }}
      >
        <Combobox.Options>
          {isLoading ? (
            <Combobox.Empty>Loading...</Combobox.Empty>
          ) : filteredOptions.length > 0 ? (
            filteredOptions
          ) : (
            <Combobox.Empty>Nothing found...</Combobox.Empty>
          )}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}

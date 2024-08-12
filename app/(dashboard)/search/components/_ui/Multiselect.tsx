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
import useSearchFilters from "@/app/hooks/search";
import toast from "react-hot-toast";

export function MainSearchMultiSelect() {
  const {
    data: searchData,
    isLoading,
    handleResetQuery,
    onSearchChange,
    debounced,
    name,
  } = useQsearch();

  const { filters, setFilters, remnoveSearchOptions } = useSearchFilters();
  const value = [...filters.locality, ...filters.builderIds];
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
  const handleAddSearch = (newItem: string) => {
    if (!filters.locality.includes(newItem)) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        locality: [...prevFilters.locality, newItem],
      }));
      handleResetQuery();
    } else {
      toast.error("The locality already exists.");
    }
  };

  const handlePush = async (type: string, data: any) => {
    switch (type) {
      case "Locality":
        handleAddSearch(`${data.name}+${data.id}`);
        break;
      case "Projects":
        window.open(`/abc/delhi/palika/${data.id}`);
        break;
      case "Listings":
        {
          const [ut, pt, cg, lt] = data.id.split("_");
          const url = `propTypes=${pt}&unitTypes=${ut}&cgs=${cg}&localities=${data.name}%2B${lt}`;
          window.open("/search/listing?" + url);
        }
        break;
      case "Project Listings":
        {
          const url = `projIdEnc=${data.id}&listedBy=${data.type.split("")[0]}`;
          window.open("/search/listing?" + url);
        }
        break;
      case "Builders":
        setFilters((prevFilters) => ({
          ...prevFilters,
          builderIds: [...prevFilters.builderIds, `${data.name}+${data.id}`],
        }));
        handleResetQuery();
        break;
      default:
        break;
    }
  };
  const values = [...filters.locality, ...filters.builderIds].map((item) => {
    const isBuilder = filters.builderIds.includes(item);

    return (
      <Pill
        key={item}
        withRemoveButton
        onRemove={() =>
          remnoveSearchOptions(item, isBuilder ? "builderIds" : "locality")
        }
      >
        {item.split("+")[0]}
      </Pill>
    );
  });

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
            value={`${item.name}+${item.id}`}
            key={item.id}
            active={value.includes(`${item.name}+${item.id}`)}
            onClick={() => handlePush(group.group, item)}
          >
            <Group gap="sm">
              {value.includes(`${item.name}+${item.id}`) ? (
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
    <Combobox store={combobox} withinPortal={false}>
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
                    // handleValueRemove(value[value.length - 1]);
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
            <Combobox.Empty>
              {search.length > 0 ? "Nothing found..." : "Search something..."}{" "}
            </Combobox.Empty>
          )}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}

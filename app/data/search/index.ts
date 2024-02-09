import BhkFilter from "@/app/search/components/bhk";
import FilterPopup from "@/app/search/filterPopup";

export const FilterData = [
  {
    label: "Filters",
    Component: FilterPopup,
  },
  {
    label: "BHK",
    Component: BhkFilter,
  },
];

export const SEARCH_FILTER_DATA = {
  projectstatus: [
    {
      cid: 106,
      constDesc: "On Going",
      Label: "Under Construction",
    },
    {
      cid: 107,
      constDesc: "Completed",
      Label: "Ready to Move",
    },
    {
      cid: 108,
      constDesc: "New Launch",
      Label: "New Launch",
    },
  ],
  bhkDetails: [
    {
      title: "1 RK",
      value: 40,
    },
    {
      title: "1 BHK",
      value: 41,
    },
    {
      title: "2 BHK",
      value: 42,
    },
    {
      title: "3 BHK",
      value: 43,
    },
    {
      title: "4 BHK",
      value: 44,
    },
    {
      title: "+4BHK",
      value: 45,
    },
  ],
  rerastatus: [
    {
      cid: 102,
      constDesc: "Applied",
      constGroup: "rerastatus",
      constType: "CON",
      constParentGroup: "rerastatus",
      parentGroupId: 100,
      seq: 2,
    },
    {
      cid: 103,
      constDesc: "Not Applied",
      constGroup: "rerastatus",
      constType: "CON",
      constParentGroup: "rerastatus",
      parentGroupId: 100,
      seq: 3,
    },
  ],
};

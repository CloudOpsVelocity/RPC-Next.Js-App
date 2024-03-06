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
  listedBy: [
    {
      cid: 1,
      constDesc: "Individual",
      constGroup: "listedBy",
      constType: "IN",
      constParentGroup: "listedBy",
      parentGroupId: 100,
      seq: 1,
      value: "I",
    },
    {
      cid: 2,
      constDesc: "Builder",
      constGroup: "listedBy",
      constType: "CON",
      constParentGroup: "listedBy",
      parentGroupId: 100,
      seq: 2,
      value: "B",
    },
    {
      cid: 3,
      constDesc: "Agent",
      constGroup: "listedBy",
      constType: "CON",
      constParentGroup: "listedBy",
      parentGroupId: 100,
      seq: 3,
      value: "A",
    },
  ],
  amenities: [
    {
      label: "Lift",
    },
  ],
  categoryData: [
    {
      label: "Projects",
      value: "proj",
    },
    {
      label: "Owner Listing",
      value: "owner-props",
    },
    {
      label: "Agent Listing",
      value: "agent-props",
    },
  ],
};

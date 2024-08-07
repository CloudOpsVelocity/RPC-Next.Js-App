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
  listingStatus: [
    {
      cid: "U",
      constDesc: "On Going",
      Label: "Under Construction",
    },
    {
      cid: "R",
      constDesc: "Completed",
      Label: "Ready to Move",
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
      { "cid": 324, "constDesc": "Borewell", "constGroup": "Overlooking", "constType": "CON", "constParentGroup": "projamenity", "parentGroupId": 200, "seq": 54 },
      { "cid": 327, "constDesc": "Park", "constGroup": "Overlooking", "constType": "CON", "constParentGroup": "projamenity", "parentGroupId": 200, "seq": 57 },
      { "cid": 307, "constDesc": "Wifi", "constGroup": "Property Features", "constType": "CON", "constParentGroup": "projamenity", "parentGroupId": 200, "seq": 37 },
      { "cid": 310, "constDesc": "Piped Gas", "constGroup": "Property Features", "constType": "CON", "constParentGroup": "projamenity", "parentGroupId": 200, "seq": 40 },
      { "cid": 292, "constDesc": "Visitors Parking Area", "constGroup": "Parking", "constType": "CON", "constParentGroup": "projamenity", "parentGroupId": 200, "seq": 22 },
      { "cid": 238, "constDesc": "Swimming Pool", "constGroup": "Infrastructure & Recreational Facilities", "constType": "CON", "constParentGroup": "projamenity", "parentGroupId": 200, "seq": 6 },
      { "cid": 227, "constDesc": "Kids Play Area", "constGroup": "Infrastructure & Recreational Facilities", "constType": "CON", "constParentGroup": "projamenity", "parentGroupId": 200, "seq": 6 },
      { "cid": 340, "constDesc": "Close To School", "constGroup": "Location Advantages", "constType": "CON", "constParentGroup": "projamenity", "parentGroupId": 200, "seq": 70 },
      { "cid": 289, "constDesc": "CCTV Cameras", "constGroup": "Security", "constType": "CON", "constParentGroup": "projamenity", "parentGroupId": 200, "seq": 19 },
      { "cid": 290, "constDesc": "power backup", "constGroup": "Security", "constType": "CON", "constParentGroup": "projamenity", "parentGroupId": 200, "seq": 20 },
      { "cid": 322, "constDesc": "Security Guard", "constGroup": "Apartment Apartment", "constType": "CON", "constParentGroup": "projamenity", "parentGroupId": 200, "seq": 52 },
      { "cid": 319, "constDesc": "Gym", "constGroup": "Apartment Features", "constType": "CON", "constParentGroup": "projamenity", "parentGroupId": 200, "seq": 49 },
      { "cid": 321, "constDesc": "Club House", "constGroup": "Apartment Features", "constType": "CON", "constParentGroup": "projamenity", "parentGroupId": 200, "seq": 51 },
      { "cid": 295, "constDesc": "Elevators/Lifts", "constGroup": "Amenities", "constType": "CON", "constParentGroup": "projamenity", "parentGroupId": 200, "seq": 25 },
      { "cid": 302, "constDesc": "Intercom Facility", "constGroup": "Amenities", "constType": "CON", "constParentGroup": "projamenity", "parentGroupId": 200, "seq": 32 }
  

  
  
  ],
  categoryDataProject: [
    {
      label: "Projects",
      value: "proj",
    },
    {
      label: "Owner Listings",
      value: "I",
    },
    {
      label: "Agent Listings",
      value: "A",
    },
  ],
  categoryDataListing: [
    {
      label: "Builder Listings",
      value: "B",
    },
    {
      label: "Owner Listing",
      value: "I",
    },
    {
      label: "Agent Listing",
      value: "A",
    },
  ],
  facing: [
    {
      cid: 61,
      constDesc: "East",
      constGroup: "facing",
      constType: "CON",
      constParentGroup: "facing",
      parentGroupId: 60,
      seq: 1,
    },
    {
      cid: 62,
      constDesc: "West",
      constGroup: "facing",
      constType: "CON",
      constParentGroup: "facing",
      parentGroupId: 60,
      seq: 2,
    },
    {
      cid: 63,
      constDesc: "North",
      constGroup: "facing",
      constType: "CON",
      constParentGroup: "facing",
      parentGroupId: 60,
      seq: 3,
    },
    {
      cid: 64,
      constDesc: "South",
      constGroup: "facing",
      constType: "CON",
      constParentGroup: "facing",
      parentGroupId: 60,
      seq: 4,
    },
    {
      cid: 65,
      constDesc: "North East",
      constGroup: "facing",
      constType: "CON",
      constParentGroup: "facing",
      parentGroupId: 60,
      seq: 5,
    },
    {
      cid: 66,
      constDesc: "South East",
      constGroup: "facing",
      constType: "CON",
      constParentGroup: "facing",
      parentGroupId: 60,
      seq: 6,
    },
    {
      cid: 67,
      constDesc: "Norh West",
      constGroup: "facing",
      constType: "CON",
      constParentGroup: "facing",
      parentGroupId: 60,
      seq: 7,
    },
    {
      cid: 68,
      constDesc: "South West",
      constGroup: "facing",
      constType: "CON",
      constParentGroup: "facing",
      parentGroupId: 60,
      seq: 8,
    },
  ],
  furnish: [
    {
      cid: 51,
      constDesc: "Fully Furnished",
      constGroup: "furnish",
      constType: "CON",
      parentGroupId: 40,
      seq: 1,
    },
    {
      cid: 52,
      constDesc: "Semi Furnished",
      constGroup: "furnish",
      constType: "CON",
      parentGroupId: 40,
      seq: 2,
    },
    {
      cid: 53,
      constDesc: "Un Furnished",
      constGroup: "furnish",
      constType: "CON",
      parentGroupId: 40,
      seq: 3,
    },
  ],
  photoAvail: [
    {
      id: 3,
      label: "Both",
    },
    {
      id: 1,
      label: "Photo Available",
    },
    {
      id: 2,
      label: "Video Available",
    },
  ],
};

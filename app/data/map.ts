import L from "leaflet";
export const areas = [
  {
    name: "commute",
    Icon: "/areas/commute.svg",
  },
  {
    name: "Train",
    Icon: "/areas/train.svg",
  },
  {
    name: "Bus",
    Icon: "/areas/bus.svg",
  },

  {
    name: "Hospital",
    Icon: "/areas/hospital.svg",
  },

  {
    name: "School",
    Icon: "/areas/school.svg",
  },

  {
    name: "Market",
    Icon: "/areas/market.svg",
  },

  {
    name: "Restaurant",
    Icon: "/areas/restaurant.svg",
  },

  {
    name: "Bank",
    Icon: "/areas/bank.svg",
  },

  {
    name: "Clinic",
    Icon: "/areas/clinic.svg",
  },

  {
    name: "ATM",
    Icon: "/areas/atm.svg",
  },

  {
    name: "Post Office",
    Icon: "/areas/post.svg",
  },

  {
    name: "Mall",
    Icon: "/areas/mall.svg",
  },
];

export const markers = areas.map((area) => {
  return {
    name: area.name,
    icon: L.icon({
      iconUrl: area.Icon,
      iconSize: [80, 80],
      iconAnchor: [19, 38],
      popupAnchor: [0, -38],
    }),
  };
});

export const MapIcon = L.icon({
  iconUrl: "/mapIcon.svg",
  iconSize: [100, 100],
  iconAnchor: [19, 38],
  popupAnchor: [0, -38],
});

export const MobileMapIcon = L.icon({
  iconUrl: "/mapIcon.svg",
  iconSize: [70, 70],
  iconAnchor: [19, 38],
  popupAnchor: [0, -38],
});

export const BlueIcon = L.icon({
  iconUrl: "/mapblueicon.png",
  iconSize: [100, 100],
  iconAnchor: [19, 38],
  popupAnchor: [0, -38],
});

export const BlueMobileMapIcon = L.icon({
  iconUrl: "/mapblueicon.png",
  iconSize: [23, 31],
  iconAnchor: [19, 38],
  popupAnchor: [0, -38],
});
export const NearLocation = L.icon({
  iconUrl: "/proj/nearlocaltion.svg",
  iconSize: [25, 41],
  iconAnchor: [19, 38],
  popupAnchor: [0, -38],
});
export const fakeDataMaps = [
  { lat: 12.9850828, lng: 77.603585 },
  { lat: 12.982889, lng: 77.606296 },
  { lat: 12.981727, lng: 77.608217 },
  { lat: 12.9856503, lng: 77.60569269999999 },
  { lat: 12.9835794, lng: 77.60322409999999 },
  { lat: 12.9830441, lng: 77.6032036 },
  { lat: 12.982537, lng: 77.603019 },
  { lat: 12.9897758, lng: 77.5993964 },
  { lat: 12.989772, lng: 77.59939899999999 },
  { lat: 12.979955, lng: 77.60977799999999 },
  { lat: 12.983512, lng: 77.596375 },
  { lat: 12.979655, lng: 77.61385899999999 },
  { lat: 12.983671, lng: 77.59613600000002 },
  { lat: 12.97783, lng: 77.601944 },
  { lat: 12.976498, lng: 77.600047 },
  { lat: 12.9766927, lng: 77.6014259 },
  { lat: 12.992852, lng: 77.594939 },
  { lat: 12.994829, lng: 77.59705799999999 },
  { lat: 12.977623, lng: 77.60803 },
  { lat: 12.9938896, lng: 77.6020252 },
];

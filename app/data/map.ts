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
export  const icons = {
  // Transit Station
  transit_station: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="#007BFF">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 5v14M9 12h6" stroke="#fff" stroke-width="2" />
    </svg>`,

  // Train Station
  train_station: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="#00C853">
      <rect x="4" y="4" width="16" height="16" rx="3" />
      <path d="M8 15h8M8 9h8M8 12h8" stroke="#fff" stroke-width="2" />
    </svg>`,

  // Bus Station
  bus_station: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="#FFC107">
      <rect x="3" y="7" width="18" height="10" rx="2" />
      <path d="M7 17h10M8 17v3M16 17v3" stroke="#000" stroke-width="2" />
    </svg>`,

  // Hospital
  hospital: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="#FF5722">
      <rect x="6" y="6" width="12" height="12" rx="2" />
      <path d="M12 8v8M8 12h8" stroke="#fff" stroke-width="2" />
    </svg>`,

  // School
  school: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="#4CAF50">
      <path d="M12 2L2 8l10 6 10-6-10-6zM4.5 10.5v5.5l7.5 4.5 7.5-4.5v-5.5L12 14l-7.5-3.5z" />
    </svg>`,

  // Supermarket
  supermarket: `
     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="none">
        <rect x="2" y="7" width="20" height="12" rx="2" fill="#8BC34A" />
        <rect x="6" y="12" width="4" height="5" fill="#FFEB3B" />
        <rect x="14" y="12" width="4" height="5" fill="#FF5722" />
        <path d="M8 6h8v2H8z" fill="#FF9800" />
        <circle cx="5" cy="7" r="2" fill="#3F51B5" />
        <circle cx="19" cy="7" r="2" fill="#3F51B5" />
        <path d="M4 10h16v1H4z" fill="#9E9E9E" />
      </svg>
`,

  // Restaurant (Food)
  food: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="#FF9800">
      <path d="M8 2a2 2 0 10-4 0v12h4V2zm2 0v12h4V2h-4zm6 0v8c0 1.1.9 2 2 2h1v2h-3v4h-2v-4h-1v-2h1V2h2z" />
    </svg>`,

  // Bank
  bank: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="#673AB7">
      <path d="M2 10h20v2h-20v-2zm1 4h2v6h2v-6h2v6h2v-6h2v6h2v-6h2v6h2v-6h2v6h2v-8h-20v8zm9-12l10 6v1h-20v-1l10-6z" />
    </svg>`,

  // Clinic
  clinic: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="#FF4081">
      <path d="M18 12v2h-3v3h-2v-3h-3v-2h3v-3h2v3h3zM12 2a10 10 0 100 20 10 10 0 000-20z" />
    </svg>`,

  // ATM
  atm: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="#9C27B0">
      <path d="M2 6h20v14h-20v-14zm18 12v-10h-16v10h16zm-11-6v2h2v-2h-2zm6 0v2h-2v-2h2z" />
    </svg>`,

  // Post Office
  post_office: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="#E91E63">
      <path d="M4 4h16v2l-8 5-8-5v-2zm0 4v12h16v-12l-8 5-8-5z" />
    </svg>`,

  // Shopping Mall
  shopping_mall: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="#3F51B5">
      <path d="M7 6v-2a5 5 0 0110 0v2h4v16h-18v-16h4zm2 0h6v-2a3 3 0 00-6 0v2zm-4 12v2h10v-2h-10zm2-6h6v-2h-6v2z" />
    </svg>`
};

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

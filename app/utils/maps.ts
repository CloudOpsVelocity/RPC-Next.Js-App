export interface Coordinates {
  location: {
    lat: number;
    lng: number;
  };
}

function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers

  return distance;
}

function deg2rad(deg: number): number {
  return deg * (Math.PI / 180);
}

interface TravelTime {
  hours: number;
  minutes: number;
}

function calculateTime(
  distance: number,
  type: "public" | "drive" | "walk"
): TravelTime {
  const averageSpeeds = {
    public: 30, // km/h
    drive: 60, // km/h
    walk: 5, // km/h
  };

  const speed = averageSpeeds[type];
  const timeInHours = distance / speed;
  const hours = Math.floor(timeInHours);
  const minutes = Math.round((timeInHours - hours) * 60);

  return { hours, minutes };
}

export { calculateDistance, calculateTime, deg2rad };

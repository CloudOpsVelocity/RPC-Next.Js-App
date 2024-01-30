// "use client";
// import { useEffect, useRef, useState } from "react";

// const center = { lat: 48.8584, lng: 2.2945 };
// import {
//   GoogleMap,
//   Marker,
//   useJsApiLoader,
//   useGoogleMap,
//   DirectionsRenderer,
//   InfoWindow,
//   DirectionsService,
// } from "@react-google-maps/api";
// function App() {
//   const { isLoaded } = useJsApiLoader({
//     googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
//     libraries: ["places"],
//   });

//   const [map, setMap] = useState(/** @type google.maps.Map */ null);
//   const [directionsResponse, setDirectionsResponse] = useState(null);
//   const [distance, setDistance] = useState("");
//   const [duration, setDuration] = useState("");

//   /** @type React.MutableRefObject<HTMLInputElement> */
//   const originRef = useRef();
//   /** @type React.MutableRefObject<HTMLInputElement> */
//   const destiantionRef = useRef();

//   if (!isLoaded) {
//     return <div>Loading...</div>;
//   }

//   async function calculateRoute() {
//     if (originRef.current.value === "" || destiantionRef.current.value === "") {
//       return;
//     }
//     // eslint-disable-next-line no-undef
//     const directionsService = new google.maps.DirectionsService();
//     const results = await directionsService.route({
//       origin: originRef.current.value,
//       destination: destiantionRef.current.value,
//       // eslint-disable-next-line no-undef
//       travelMode: google.maps.TravelMode.TRANSIT,
//     });
//     setDirectionsResponse(results);
//     setDistance(results.routes[0].legs[0].distance.text);
//     setDuration(results.routes[0].legs[0].duration.text);
//   }

//   function clearRoute() {
//     setDirectionsResponse(null);
//     setDistance("");
//     setDuration("");
//     originRef.current.value = "";
//     destiantionRef.current.value = "";
//   }
//   return (
//     <div style={{ position: "relative", height: "100vh", width: "100vw" }}>
//       {/* Google Map Box */}
//       <GoogleMap
//         center={center}
//         zoom={15}
//         mapContainerStyle={{ width: "100%", height: "100%" }}
//         options={{
//           zoomControl: false,
//           streetViewControl: false,
//           mapTypeControl: false,
//           fullscreenControl: false,
//         }}
//         onLoad={(map) => setMap(map)}
//       >
//         <Marker position={center} />
//         {directionsResponse && (
//           <DirectionsRenderer directions={directionsResponse} />
//         )}
//       </GoogleMap>
//       <div
//         style={{
//           position: "absolute",
//           left: 0,
//           top: 0,
//           padding: "1rem",
//         }}
//       >
//         <div style={{ display: "flex", justifyContent: "space-between" }}>
//           <input type="text" placeholder="Origin" ref={originRef} />
//           <input type="text" placeholder="Destination" ref={destiantionRef} />
//           <button onClick={calculateRoute}>Calculate Route</button>
//           <button onClick={clearRoute}>Clear Route</button>
//         </div>
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             marginTop: "1rem",
//           }}
//         >
//           <p>Distance: {distance}</p>
//           <p>Duration: {duration}</p>
//           <button
//             onClick={() => {
//               map.panTo(center);
//               map.setZoom(15);
//             }}
//           >
//             Center Map
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;
import React from "react";

export default function Page() {
  return <div>Page</div>;
}

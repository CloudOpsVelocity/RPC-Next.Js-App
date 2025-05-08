// import { getAmenties } from '@/app/test/newui/useProjectCardData';
// import React from 'react'
// import { useQuery } from 'react-query';

// type Props = {
//     id: string;
//     type: string;
//     propId: string;
// }

// function AmenitiesPopupBox({id, type, propId}: Props) {
//     const {
//         data: amenitiesFromDB,
//         // refetch: fetchApi1,
//         // isFetching: loading1,
//         isLoading
//       } = useQuery({
//         queryKey: id,
//         queryFn: () => getAmenties(id, type, propId),
//         enabled: false, // Disabled by default
//       });

//       console.log(amenitiesFromDB);

//     const renderAmenities = () => {
//         if (isLoading) return <div>Loading...</div>;
//         if (!amenitiesFromDB) return <div>No amenities available</div>;
    
//         return amenitiesFromDB
//           .toString()
//           .split(",")
//           .map(
//             (item: string) =>
//               item !== " " && (
//                 <span
//                   key={`amenity_${item}`}
//                   className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs sm:text-sm font-medium"
//                 >
//                   {item}
//                 </span>
//             )
//         );
//     };

//     return (
//         <div className="flex flex-wrap gap-2">{renderAmenities()}</div>
//     )
// }

// export default AmenitiesPopupBox;


import { getAmenties } from '@/app/test/newui/useProjectCardData';
import React, { useEffect } from 'react';
import { useQuery } from 'react-query';

type Props = {
  id: string;
  type: string;
  propId: string;
};

function AmenitiesPopupBox({ id, type, propId }: Props) {
  const {
    data: amenitiesFromDB,
    refetch,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ['amenities', id, type, propId],
    queryFn: () => getAmenties(id, type, propId),
    enabled: false, // Manual fetch
  });

  useEffect(() => {
    refetch(); // Trigger the query manually on mount or conditionally
  }, [refetch]);

  const renderAmenities = () => {
    if (isFetching) return <div>Loading...</div>;
    if (isError || !amenitiesFromDB) return <div>No amenities available</div>;

    return amenitiesFromDB
      .toString()
      .split(',')
      .map((item: string) =>
        item.trim() !== '' ? (
          <span
            key={`amenity_${item}`}
            className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs sm:text-sm font-medium"
          >
            {item}
          </span>
        ) : null
      );
  };

  return <div className="flex flex-wrap gap-2">{renderAmenities()}</div>;
}

export default AmenitiesPopupBox;

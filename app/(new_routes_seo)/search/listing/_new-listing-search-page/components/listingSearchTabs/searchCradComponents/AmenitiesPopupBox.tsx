import { projSearchStore } from '@/app/(new_routes_seo)/search/store/newListingStore';
import { getAmenties } from '@/app/test/newui/useProjectCardData';
import { useAtomValue } from 'jotai';
import React, { useEffect } from 'react';
import { useQuery } from 'react-query';

type Props = {
  id: string;
  type: string;
  projId: string;
  propId: string;
};

function AmenitiesPopupBox({ id, type, projId, propId }: Props) {
  
  const state = useAtomValue(projSearchStore);
  const pType = state.listedBy ?? "";

  const {
    data: amenitiesFromDB,
    refetch,
    isFetching,
    isError,
  } = useQuery({
    queryKey: id,
    queryFn: () => getAmenties(projId ? projId : propId, pType, type === "proj" ? projId : propId),
    // enabled: true, // Manual fetch
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

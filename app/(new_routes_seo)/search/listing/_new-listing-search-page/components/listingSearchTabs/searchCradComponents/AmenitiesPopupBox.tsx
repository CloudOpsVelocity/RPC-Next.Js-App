type Props = {
  amenitiesList: string;
};

function AmenitiesPopupBox({ amenitiesList }: Props) {
  const amenList = amenitiesList ? amenitiesList.split(", ") : [];

  // const renderAmenities = () => {
  //   return amenList.map((item: string, index: number) =>
  //       item.trim() !== '' ? (
  //         <span
  //           key={`amenity_${item}_${index.toString()}`}
  //           className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs sm:text-sm font-medium"
  //         >
  //           {item}
  //         </span>
  //       ) : null
  //     );
  // };

  return <div className="flex flex-wrap gap-2">
    {amenList.map((item: string, index: number) =>
        item.trim() !== '' && (
          <span
            key={`amenity_${item}_${index.toString()}`}
            className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs sm:text-sm font-medium"
          >
            {item}
          </span>
        )
      )
    }
  </div>;
}

export default AmenitiesPopupBox;

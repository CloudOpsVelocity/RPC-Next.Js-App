const BrokerContactTag = ({
  isBrokerAllowed,
  className,
}: {
  isBrokerAllowed: boolean;
  className?: string;
}) => {
  return (
    <div className={`flex justify-center items-center mt-4 ${className}`}>
      {isBrokerAllowed && (
        <div
          className={`bg-green-100 text-nowrap text-green-800 font-semibold p-1 sm:px-4 sm:py-2 rounded-sm shadow-lg text-xs md:text-sm ${className}`}
        >
          Broker-Friendly Listing
        </div>
      )}
    </div>
  );
};

export default BrokerContactTag;

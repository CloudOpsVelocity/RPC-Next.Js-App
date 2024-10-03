const BrokerContactTag = ({ isBrokerAllowed, className }: { isBrokerAllowed: boolean; className?: string }) => {
    return (
      <div className={`flex justify-center items-center mt-4 ${className}`}>
        {isBrokerAllowed && (
          <div className={`bg-green-100 text-nowrap text-green-800 text-sm font-semibold px-4 py-2 rounded-sm shadow-lg ${className}`}>
            Broker-Friendly Listing
          </div>
        )}
      </div>
    );
  };

export default BrokerContactTag
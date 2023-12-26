import React from 'react';
import { useInfiniteQuery } from 'react-query';

function Projects() {
  const fetchPropertyData = async (key, pageNumber = 1) => {
    const response = await fetch(`https://test.getrightproperty.com/property/v1/new-launch-property?page=${pageNumber}`);
    const data = await response.json();
    return data;
  };

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery('projects', fetchPropertyData, {
    getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
    onSettled: (data, error, variables) => {
      // Check if the query was successful but the data is undefined
      if (status === 'success' && !data?.pages[data.pages.length - 1]?.property.length) {
        // Handle custom response when there is no more data
        console.log('No more data available.');
      }
    },
  });

  const handleLoadMore = () => {
    fetchNextPage();
  };

  return status === 'loading' ? (
    <p>Loading...</p>
  ) : status === 'error' ? (
    <p>Error: {error.message}</p>
  ) : (
    <>
      {data.pages.map((page, i) => (
        <React.Fragment key={i}>
          {page.property.map(property => (
            <p key={property.propName}>{property.propName}</p>
          ))}
        </React.Fragment>
      ))}
      <div>
        <button
          onClick={handleLoadMore}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? 'Loading more...'
            : hasNextPage
            ? 'Load More'
            : 'Nothing more to load'}
        </button>
      </div>
      <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
    </>
  );
}

export default Projects;

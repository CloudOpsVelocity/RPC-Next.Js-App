const apiUrl: string = process.env.NEXT_PUBLIC_BACKEND_URL!; // Replace this with your API base URL

interface RequestOptions extends RequestInit {
  // You can extend this interface with any additional properties you need
}

async function globalFetch<T>(
  url: string,
  options: RequestOptions = {}
): Promise<T> {
  const headers = {
    "Content-Type": "application/json",
    // Add any other headers if needed
  };

  const mergedOptions: RequestOptions = {
    ...options,
    headers: {
      ...options.headers,
      ...headers,
    },
  };

  try {
    const response = await fetch(`${apiUrl}/${url}`, mergedOptions);

    // if (!response.ok) {
    //   throw new Error(`HTTP error! Status: ${response.status}`);
    // }

    return await response.json();
  } catch (error: any) {
    // Handle network errors or other exceptions
    console.error("Error:", error.message);
    throw error; // Propagate the error for further handling if needed
  }
}

export default globalFetch;

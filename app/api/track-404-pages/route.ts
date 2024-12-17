import { getPagesSlugs } from "@/app/seo/api";
import { NextResponse } from "next/server";
interface ErrorResponse {
  notFoundRoutes: string[];
  errorRoutes: string[];
  forbiddenRoutes: string[];
}

const BATCH_SIZE = 25; // Increased batch size for better throughput
const BASE_URL = `https://www.getrightproperty.com` || "";

// Function to process a batch of URLs with optimized error handling
async function checkUrlBatch(urls: { url: string; path: string }[]) {
  const results = await Promise.allSettled(
    urls.map(({ url, path }) =>
      fetch(url, { cache: "no-cache" })
        .then((res) => {
          if (res.status === 404) return { path, type: "notFound" };
          if (res.status === 403) return { path, type: "forbidden" };
          if (res.status >= 500) return { path, type: "error" };
          return null;
        })
        .catch(() => ({ path, type: "error" }))
    )
  );

  return results.map((result) =>
    result.status === "fulfilled" ? result.value : null
  );
}

// Optimized function to remove unique ID from listing path
function getBaseListingPath(path: string): { key: string; value: string } {
  return { key: path.split("/").pop() || "", value: path };
}

// Generator function to process paths in chunks
async function* processPathsInChunks(paths: string[], batchSize: number) {
  for (let i = 0; i < paths.length; i += batchSize) {
    const batch = paths.slice(i, i + batchSize).map((path) => ({
      url: `${BASE_URL}${path}`,
      path,
    }));
    yield await checkUrlBatch(batch);
  }
}

// Optimized function to process listing paths
async function processListingPaths(paths: string[]) {
  const response: ErrorResponse = {
    notFoundRoutes: [],
    errorRoutes: [],
    forbiddenRoutes: [],
  };

  const checkedPaths = new Set<string>(); // To keep track of already checked paths
  const scannedRoutes: string[] = []; // Array to store scanned routes

  // Function to generate the parent paths
  const generateParentPaths = (path: string) => {
    const segments = path.split("/").filter(Boolean); // Split by '/' and filter out empty segments
    const pathsToCheck = [];

    // Generate all possible parent paths
    for (let i = segments.length; i > 0; i--) {
      pathsToCheck.push(`/${segments.slice(0, i).join("/")}`);
    }

    return pathsToCheck;
  };

  // Function to check the paths, avoiding duplicates
  const checkPath = async (path: string) => {
    if (checkedPaths.has(path)) {
      return; // Skip if the path has already been checked
    }

    checkedPaths.add(path); // Mark the path as checked
    scannedRoutes.push(path); // Add to the scanned routes list

    // Check the current path
    const batch = [{ url: `${BASE_URL}${path}`, path }];
    const results = await checkUrlBatch(batch);

    // Categorize results
    for (const result of results) {
      if (!result) continue;
      if (result.type === "notFound") {
        response.notFoundRoutes.push(result.path);
      } else if (result.type === "forbidden") {
        response.forbiddenRoutes.push(result.path);
      } else {
        response.errorRoutes.push(result.path);
      }
    }
  };

  // Process each path
  for (const path of paths) {
    const pathsToCheck = generateParentPaths(path);

    // Check each parent path in the generated list
    for (const parentPath of pathsToCheck) {
      await checkPath(parentPath); // Only check the path if it's not already checked
    }
  }

  return {
    originalCount: paths.length,
    notFoundCount: response.notFoundRoutes.length,
    errorCount: response.errorRoutes.length,
    forbiddenCount: response.forbiddenRoutes.length,
    scannedRoutes, // Return the list of scanned routes
    ...response,
  };
}

// Optimized function to process project paths
async function processProjectPaths(paths: string[]) {
  const response: ErrorResponse = {
    notFoundRoutes: [],
    errorRoutes: [],
    forbiddenRoutes: [],
  };
  const uniquePathsSet = new Set(
    paths.map((path) => path.split("/").slice(0, 6).join("/"))
  );
  const uniquePaths = Array.from(uniquePathsSet);

  for await (const results of processPathsInChunks(uniquePaths, BATCH_SIZE)) {
    for (const result of results) {
      if (!result) continue;
      if (result.type === "notFound") {
        response.notFoundRoutes.push(result.path);
      } else if (result.type === "forbidden") {
        response.forbiddenRoutes.push(result.path);
      } else {
        response.errorRoutes.push(result.path);
      }
    }
  }

  return {
    originalCount: paths.length,
    uniqueCount: uniquePaths.length,
    notFoundCount: response.notFoundRoutes.length,
    errorCount: response.errorRoutes.length,
    forbiddenCount: response.forbiddenRoutes.length,
    ...response,
  };
}

// Optimized function to process generic paths
async function processPaths(paths: string[]) {
  const response: ErrorResponse = {
    notFoundRoutes: [],
    errorRoutes: [],
    forbiddenRoutes: [],
  };

  for await (const results of processPathsInChunks(paths, BATCH_SIZE)) {
    for (const result of results) {
      if (!result) continue;
      if (result.type === "notFound") {
        response.notFoundRoutes.push(result.path);
      } else if (result.type === "forbidden") {
        response.forbiddenRoutes.push(result.path);
      } else {
        response.errorRoutes.push(result.path);
      }
    }
  }

  return {
    originalCount: paths.length,
    uniqueCount: paths.length,
    notFoundCount: response.notFoundRoutes.length,
    errorCount: response.errorRoutes.length,
    forbiddenCount: response.forbiddenRoutes.length,
    ...response,
  };
}

// API Handler with optimized error handling
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");

    switch (type) {
      case "B": {
        const builderSlugs = await getPagesSlugs("builder-list");
        const builderPaths = Object.keys(builderSlugs);
        return NextResponse.json(await processPaths(builderPaths));
      }

      case "L": {
        const listingSlugs = await getPagesSlugs("listing-search-seo");
        const listingPaths = Object.keys(listingSlugs);
        return NextResponse.json(await processListingPaths(listingPaths));
      }

      case "P": {
        const projectSlugs = await getPagesSlugs("project-list");
        const projectPaths = Object.keys(projectSlugs);
        return NextResponse.json(await processProjectPaths(projectPaths));
      }
      case "S": {
        const staticRoutes = [
          `${process.env.NEXT_PUBLIC_URL}/login`,
          `${process.env.NEXT_PUBLIC_URL}/register`,
          `${process.env.NEXT_PUBLIC_URL}/register/builder`,
          `${process.env.NEXT_PUBLIC_URL}/register/agent`,
          `${process.env.NEXT_PUBLIC_URL}/`,
          `${process.env.NEXT_PUBLIC_URL}/register/individual`,
          `${process.env.NEXT_PUBLIC_URL}/search`,
          `${process.env.NEXT_PUBLIC_URL}/search/listing`,
        ];
        return NextResponse.json(await processPaths(staticRoutes));
      }
      default:
        return NextResponse.json({ error: "Invalid type" }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

import { usePathname, useSearchParams } from "next/navigation";
import { pathConfig, PathType } from "./config";

type PathConfigKey = keyof typeof pathConfig;
interface SearchParams {
  projId?: string;
  propId?: string;
  builderId?: string;
  [key: string]: string | undefined;
}

// Renamed internal functions to follow React Hook naming conventions
function useGetPathTypeFromQueryParams(): string {
  const searchParams = useSearchParams();
  for (const key in pathConfig) {
    if (searchParams.get(pathConfig[key as PathConfigKey].paramName)) {
      return pathConfig[key as PathConfigKey].pageTitle;
    }
  }
  return pathConfig.default.pageTitle;
}

function useGetCallPath(): string {
  const searchParams = useSearchParams();
  for (const key in pathConfig) {
    const id = searchParams.get(pathConfig[key as PathConfigKey].paramName);
    if (id) {
      return `${pathConfig[key as PathConfigKey].redirectingPath}${id}`;
    }
  }
  return pathConfig.default.redirectingPath;
}

function useGetQueryParamClient(): { query: string; redirectPath: string } {
  const searchParams = useSearchParams();
  for (const key in pathConfig) {
    const id = searchParams.get(pathConfig[key as PathConfigKey].paramName);
    if (id) {
      return {
        query: `?${pathConfig[key as PathConfigKey].paramName}=${id}`,
        redirectPath: `${
          pathConfig[key as PathConfigKey].redirectingPath
        }${id}`,
      };
    }
  }
  return { query: "", redirectPath: pathConfig.default.redirectingPath };
}

// Server-side functions remain unchanged
export function getQueryParamForPath(path: string): string | null {
  for (const key in pathConfig) {
    const { pathPrefix, paramName } = pathConfig[key as PathConfigKey];
    if (path === pathPrefix && path.startsWith(pathPrefix)) {
      const segments = path.split("/");
      const id = segments[segments.length - 1];
      if (id && id !== pathPrefix) {
        return `?${paramName}=${id}`;
      }
      return null;
    }
  }
  return null;
}

export function getPathTypeFromQueryParamsWitParam(
  searchParams: URLSearchParams
): PathType {
  for (const key in pathConfig) {
    if (searchParams.get(pathConfig[key as PathConfigKey].paramName)) {
      return pathConfig[key as PathConfigKey].pageType;
    }
  }
  return PathType.Default;
}

export function getQueryParam(searchParams: SearchParams): string {
  for (const key in pathConfig) {
    if (
      searchParams[
        pathConfig[key as PathConfigKey].paramName as keyof SearchParams
      ]
    ) {
      return `?${pathConfig[key as PathConfigKey].paramName}=${
        searchParams[
          pathConfig[key as PathConfigKey].paramName as keyof SearchParams
        ]
      }`;
    }
  }
  return "";
}

export function getCallPathServer(param: SearchParams): string {
  for (const key in pathConfig) {
    const id =
      param[pathConfig[key as PathConfigKey].paramName as keyof SearchParams];
    if (id) {
      return `${pathConfig[key as PathConfigKey].redirectingPath}${id}`;
    }
  }
  return pathConfig.default.redirectingPath;
}

// Rename the export to maintain the original function names
export {
  useGetPathTypeFromQueryParams as getPathTypeFromQueryParams,
  useGetCallPath as getCallPath,
  useGetQueryParamClient as getQueryParamClient,
};

export default function usePathToOrigin() {
  const path = usePathname();
  const redirectQueryParam = getQueryParamForPath(path);

  return {
    redirectPath: path,
    redirectQueryParam,
  };
}

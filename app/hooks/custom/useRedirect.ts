import { usePathname, useSearchParams } from "next/navigation";
enum PathType {
  Project = "project",
  Property = "property",
  Default = "default",
}
export default function usePathToOrigin() {
  const path = usePathname();
  return { redirectPath: path, redirectQueryParam: getQueryParamForPath(path) };
}
// client
export function getPathTypeFromQueryParams(): string {
  const searchParams = useSearchParams();
  const projectId = searchParams.get("projId");
  const propertyId = searchParams.get("propId");

  if (projectId) {
    return "Project Details Page";
  } else if (propertyId) {
    return "Property Details Page";
  } else {
    return "Homepage";
  }
}
export function getCallPath(): string {
  const searchParams = useSearchParams();
  const projectId = searchParams.get("projId");
  const propertyId = searchParams.get("propId");

  if (projectId) {
    return "/abc/delhi/some/" + projectId;
  } else if (propertyId) {
    return "/listing/delhi/" + propertyId;
  } else {
    return "/";
  }
}

export function getQueryParamClient(): { query: string; rediectPath: string } {
  const searchParams = useSearchParams();
  const projId = searchParams.get("projId");
  const propId = searchParams.get("propId");
  if (projId) {
    return {
      query: `?projId=${projId}`,
      rediectPath: `/abc/delhi/some/${projId}`,
    };
  } else if (propId) {
    return {
      query: `?propId=${propId}`,
      rediectPath: `/listing/delhi/${propId}`,
    };
  } else {
    return { query: "", rediectPath: "/" };
  }
}

// server
export function getQueryParamForPath(path: string): string | null {
  if (path.startsWith("/abc")) {
    const segments = path.split("/");
    const projid = segments[segments.length - 1];
    return `?projId=${projid}`;
  } else if (path.startsWith("/listing")) {
    const segments = path.split("/");
    const propertyId = segments[segments.length - 1];
    return `?propId=${propertyId}`;
  } else {
    return null;
  }
}

export function getPathTypeFromQueryParamsWitParam(
  searchParams: URLSearchParams
): PathType {
  const projectId = searchParams.get("projId");
  const propertyId = searchParams.get("propId");

  if (projectId) {
    return PathType.Project;
  } else if (propertyId) {
    return PathType.Property;
  } else {
    return PathType.Default;
  }
}

interface SearchParams {
  projId?: string;
  propId?: string;
  [key: string]: string | undefined;
}

export function getQueryParam(searchParams: SearchParams): string {
  if (searchParams.projId) {
    return `?projId=${searchParams.projId}`;
  } else if (searchParams.propId) {
    return `?propId=${searchParams.propId}`;
  } else {
    return "";
  }
}

export function getCallPathServer(param: SearchParams): string {
  const searchParams = useSearchParams();
  const projectId = searchParams.get("projId");
  const propertyId = searchParams.get("propId");

  if (param.projId) {
    return "/abc/delhi/some/" + projectId;
  } else if (param.propId) {
    return "/listing/delhi/" + propertyId;
  } else {
    return "/";
  }
}

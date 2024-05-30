import { usePathname, useSearchParams } from "next/navigation";
enum PathType {
  Project = "project",
  Property = "property",
  Builder = "builder",
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
  const builderId = searchParams.get("builderId");

  if (projectId) {
    return "Project Details Page";
  } else if (propertyId) {
    return "Property Details Page";
  } else if (builderId) {
    return "Builder Details Page";
  } else {
    return "Homepage";
  }
}
export function getCallPath(): string {
  const searchParams = useSearchParams();
  const projectId = searchParams.get("projId");
  const propertyId = searchParams.get("propId");
  const builderId = searchParams.get("builderId");

  if (projectId) {
    return "/abc/delhi/some/" + projectId;
  } else if (propertyId) {
    return "/listing/delhi/" + propertyId;
  } else if (builderId) {
    return "/builder/" + builderId;
  } else {
    return "/";
  }
}

export function getQueryParamClient(): { query: string; rediectPath: string } {
  const searchParams = useSearchParams();
  const projId = searchParams.get("projId");
  const propId = searchParams.get("propId");
  const builderId = searchParams.get("builderId");
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
  } else if (builderId) {
    return {
      query: `?builderId=${builderId}`,
      rediectPath: `/builder/${builderId}`,
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
  } else if (path.startsWith("/builder")) {
    const segments = path.split("/");
    const builderId = segments[segments.length - 1];
    return `?builderId=${builderId}`;
  } else {
    return null;
  }
}

export function getPathTypeFromQueryParamsWitParam(
  searchParams: URLSearchParams
): PathType {
  const projectId = searchParams.get("projId");
  const propertyId = searchParams.get("propId");
  const builderId = searchParams.get("builderId");

  if (projectId) {
    return PathType.Project;
  } else if (propertyId) {
    return PathType.Property;
  } else if (builderId) {
    return PathType.Builder;
  } else {
    return PathType.Default;
  }
}

interface SearchParams {
  projId?: string;
  propId?: string;
  builderId?: string;
  [key: string]: string | undefined;
}

export function getQueryParam(searchParams: SearchParams): string {
  if (searchParams.projId) {
    return `?projId=${searchParams.projId}`;
  } else if (searchParams.propId) {
    return `?propId=${searchParams.propId}`;
  } else if (searchParams.builderId) {
    return `?builderId=${searchParams.builderId}`;
  } else {
    return "";
  }
}

export function getCallPathServer(param: SearchParams): string {
  const searchParams = useSearchParams();
  const projectId = searchParams.get("projId");
  const propertyId = searchParams.get("propId");
  const builderId = searchParams.get("builderId");

  if (param.projId) {
    return "/abc/delhi/some/" + projectId;
  } else if (param.propId) {
    return "/listing/delhi/" + propertyId;
  } else if (param.builderId) {
    return "/builder/" + builderId;
  } else {
    return "/";
  }
}

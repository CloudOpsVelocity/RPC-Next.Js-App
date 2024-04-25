function isPathValid(path: string): boolean {
  // Add your logic to validate the path here
  // For example, you can check if the path starts with "/delhi" or "/listing/delhi"
  return path.startsWith("/abc") || path.startsWith("/listing");
}
function extractAndValidateId(path: string): string | null {
  if (!isPathValid(path)) {
    return null; // Return null if the path is not valid
  }

  const segments = path.split("/");
  const id = segments[segments.length - 1];

  // Add your logic to validate the ID here
  // For example, you can check if the ID is of the expected format

  // For now, let's assume any non-empty string is considered a valid ID
  if (id.trim() === "") {
    return null; // Return null if the ID is not valid
  }

  return id;
}

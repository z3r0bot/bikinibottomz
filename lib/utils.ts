/**
 * Utility function to get the correct image path
 * @param path The image path relative to the public directory
 * @returns The correct image path
 */
export function getImagePath(path: string): string {
  // Remove leading slash if present to avoid double slashes
  const cleanPath = path.startsWith('/') ? path.substring(1) : path;
  return `/${cleanPath}`;
} 
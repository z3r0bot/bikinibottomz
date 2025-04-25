/**
 * Utility function to get the correct image path based on the environment
 * @param path The image path relative to the public directory
 * @returns The correct image path with basePath/assetPrefix if in production
 */
export function getImagePath(path: string): string {
  // Check if we're in production (GitHub Pages)
  const isProduction = process.env.NODE_ENV === 'production';
  const basePath = isProduction ? '/bikinibottomz' : '';
  
  // Remove leading slash if present to avoid double slashes
  const cleanPath = path.startsWith('/') ? path.substring(1) : path;
  
  return `${basePath}/${cleanPath}`;
} 
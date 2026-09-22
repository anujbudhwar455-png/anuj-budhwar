/** Prefix public asset URLs with Next basePath for static GitHub Pages. */
export const BASE_PATH = '/anuj-budhwar';

export function withBase(path: string): string {
  if (!path) return BASE_PATH + '/';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('mailto:')) {
    return path;
  }
  const p = path.startsWith('/') ? path : `/${path}`;
  if (p.startsWith(BASE_PATH + '/') || p === BASE_PATH) return p;
  return `${BASE_PATH}${p}`;
}

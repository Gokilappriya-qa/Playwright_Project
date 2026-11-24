export const appConfig = {
  baseUrl: process.env.BASE_URL ?? 'https://www.scriptedqa.com',
} as const;

export function appUrl(path: string): string {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return new URL(normalizedPath, appConfig.baseUrl).toString();
}

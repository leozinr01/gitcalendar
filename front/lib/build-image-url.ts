export type Background = "github" | "dark" | "light";
export type ColorName =
  | "green"
  | "blue"
  | "purple"
  | "red"
  | "yellow"
  | "orange"
  | "pink"
  | "white"
  | "black";
export type Shape = "rounded" | "square" | "circle";
export type Language = "pt" | "en";

/**
 * The image API's `/graph` route (the `api/` project). Set
 * `NEXT_PUBLIC_IMAGE_ENDPOINT` to your own deployment; until then it falls
 * back to the upstream one.
 */
export const IMAGE_ENDPOINT =
  process.env.NEXT_PUBLIC_IMAGE_ENDPOINT ??
  "https://gitcalendar-image.vercel.app/graph";

export type BuildImageUrlParams = {
  username: string;
  width: number;
  height: number;
  background: Background;
  color: ColorName;
  shape: Shape;
  /** Omitted, the API renders in its own default language. */
  language?: Language;
};

export function buildImageUrl({
  username,
  width,
  height,
  background,
  color,
  shape,
  language,
}: BuildImageUrlParams): string {
  const params = new URLSearchParams({
    username,
    background,
    color,
    shape,
    height: String(height),
    width: String(width),
  });
  if (language) params.set("language", language);

  return `${IMAGE_ENDPOINT}?${params.toString()}`;
}

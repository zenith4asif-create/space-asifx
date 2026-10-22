/**
 * Centralized Video Sources Configuration
 * All videos are hosted externally on Cloudinary.
 * Do not bundle or download MP4 files locally.
 */
export const VIDEO_SOURCES = {
  overview: "https://res.cloudinary.com/yuasb9xa/video/upload/v1792636630/1228.mp4",
  solarSystemMovement: "https://res.cloudinary.com/yuasb9xa/video/upload/v1792636610/1229.mp4",
  mercury: "https://res.cloudinary.com/yuasb9xa/video/upload/v1792636542/1223.mp4",
  venus: "https://res.cloudinary.com/yuasb9xa/video/upload/v1792636374/1222.mp4",
  earth: "https://res.cloudinary.com/yuasb9xa/video/upload/v1792636415/1221.mp4",
  mars: "https://res.cloudinary.com/yuasb9xa/video/upload/v1792636374/1222.mp4",
  marsSurface: "https://res.cloudinary.com/yuasb9xa/video/upload/v1792636334/1218.mp4",
  jupiter: "https://res.cloudinary.com/yuasb9xa/video/upload/v1792636522/1224.mp4",
  saturn: "https://res.cloudinary.com/yuasb9xa/video/upload/v1792636502/1225.mp4",
  uranus: "https://res.cloudinary.com/yuasb9xa/video/upload/v1792636477/1226.mp4",
  neptune: "https://res.cloudinary.com/yuasb9xa/video/upload/v1792636461/1227.mp4",
  spaceBackground: "https://res.cloudinary.com/yuasb9xa/video/upload/v1792636307/1220.mp4"
} as const;

export type VideoSourceKey = keyof typeof VIDEO_SOURCES;

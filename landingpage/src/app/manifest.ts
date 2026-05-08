import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Hathyo",
    short_name: "Hathyo",
    description: "Hathyo",
    start_url: "/",
    display: "standalone",
    background_color: "#fff",
    theme_color: "#0A6D3D",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}

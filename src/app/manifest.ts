import type { MetadataRoute } from "next";
import { site } from "@/content/profile";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.shortName,
    description: site.description,
    start_url: ".",
    display: "standalone",
    background_color: "#05070a",
    theme_color: "#05070a",
    icons: [{ src: "icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}

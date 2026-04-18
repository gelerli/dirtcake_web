// api/toys.ts
import { TOYS } from "../src/constants";

export default function handler(req: any, res: any) {
  // Add the base URL to image paths
  const absoluteToys = TOYS.map((toy) => ({
    ...toy,
    coverImage: `https://www.dirtcakestudio.com${toy.coverImage}`,
    galleryImages: toy.galleryImages.map(
      (img) => `https://www.dirtcakestudio.com${img}`,
    ),
  }));

  // Set headers and return the raw array
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "application/json");

  return res.status(200).json(absoluteToys);
}

// api/toys.ts
import { TOYS } from "./constants";

export default function handler(req: any, res: any) {
  try {
    // We map the toys array to ensure the bot gets full URLs for all images
    const absoluteToys = TOYS.map((toy: any) => ({
      ...toy,
      // Map the main cover image
      coverImage: `https://www.dirtcakestudio.com${toy.coverImage}`,
      // Map every image in the gallery array
      galleryImages: toy.galleryImages.map(
        (img: string) => `https://www.dirtcakestudio.com${img}`,
      ),
    }));

    // Standard headers for a JSON API
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/json");

    // Send the full array as the response
    return res.status(200).json(absoluteToys);
  } catch (error) {
    // If something goes wrong (like the symlink failing), return a 500
    console.error("API Error:", error);
    return res
      .status(500)
      .json({ error: "Failed to load toy data from constants" });
  }
}

// api/toys.ts
import { TOYS } from "./constants.ts"; // Added .ts extension

export default function handler(req: any, res: any) {
  try {
    const absoluteToys = TOYS.map((toy) => ({
      ...toy,
      coverImage: `https://www.dirtcakestudio.com${toy.coverImage}`,
      galleryImages: toy.galleryImages.map(
        (img) => `https://www.dirtcakestudio.com${img}`,
      ),
    }));

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/json");
    return res.status(200).json(absoluteToys);
  } catch (error) {
    return res.status(500).json({ error: "Failed to load toys" });
  }
}

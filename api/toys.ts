// api/toys.ts
import { register } from "ts-node";
// This allows the function to read the .ts file directly from your src folder
register({ transpileOnly: true });

import { TOYS } from "../src/constants";

export default function handler(req: any, res: any) {
  try {
    const absoluteToys = TOYS.map((toy: any) => ({
      ...toy,
      coverImage: `https://www.dirtcakestudio.com${toy.coverImage}`,
      galleryImages: toy.galleryImages.map(
        (img: string) => `https://www.dirtcakestudio.com${img}`,
      ),
    }));

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/json");
    return res.status(200).json(absoluteToys);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to load toys from src" });
  }
}

import { NEON_COLORS, type Toy } from "./constants.ts";

/** Logo colours that stay legible (>= 3:1 on white) at the logo's large size. */
export const LOGO_COLORS = NEON_COLORS.filter((c) =>
  ["text-neon-pink", "text-neon-royal", "text-neon-coral"].includes(c.color),
);

/** False for sold-out pieces and commissions that were never for sale. */
export const isAvailable = (toy: Toy) =>
  !/sold out|not for sale/i.test(toy.edition);

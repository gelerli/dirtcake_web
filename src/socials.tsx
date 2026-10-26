import {
  SiInstagram,
  SiX,
  SiYoutube,
  SiBluesky,
  SiBehance,
} from "@icons-pack/react-simple-icons";
import { SOCIAL_URLS } from "./site";

export const SOCIALS = [
  { key: "instagram", label: "Instagram", url: SOCIAL_URLS.instagram, Icon: SiInstagram },
  { key: "x", label: "X (Twitter)", url: SOCIAL_URLS.x, Icon: SiX },
  { key: "youtube", label: "YouTube", url: SOCIAL_URLS.youtube, Icon: SiYoutube },
  { key: "bluesky", label: "Bluesky", url: SOCIAL_URLS.bluesky, Icon: SiBluesky },
  { key: "behance", label: "Behance", url: SOCIAL_URLS.behance, Icon: SiBehance },
] as const;

import type { SyntheticEvent } from "react";
import { resolveImage } from "../portfolio/images";

interface Props {
  src: string;
  alt: string;
  /** true only for images visible on first paint */
  eager?: boolean;
  onLoad?: (event: SyntheticEvent<HTMLImageElement>) => void;
}

export function PortfolioImage({ src, alt, eager = false, onLoad }: Props) {
  const image = resolveImage(src);
  return (
    <img
      src={image?.src ?? src}
      srcSet={image?.srcSet}
      sizes={image?.sizes}
      width={image?.width}
      height={image?.height}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      draggable={false}
      onLoad={onLoad}
    />
  );
}

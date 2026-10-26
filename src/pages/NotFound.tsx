import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import { PAGE_META } from "../seo";

export default function NotFound({ heading = "PAGE NOT FOUND" }: { heading?: string }) {
  return (
    <div className="flex-grow flex items-center justify-center bg-white px-8 pt-32">
      <Seo {...PAGE_META.notFound} />
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-display font-black mb-6 tracking-tighter">
          {heading}
        </h1>
        <Link
          to="/gallery"
          className="text-xs font-bold tracking-[0.3em] uppercase underline hover:text-neon-pink transition-colors"
        >
          Back to gallery
        </Link>
      </div>
    </div>
  );
}

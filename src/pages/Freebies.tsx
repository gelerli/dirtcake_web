import { Download } from "lucide-react";
import Seo from "../components/Seo";
import { PAGE_META } from "../seo";
import { SOCIALS } from "../socials";

const FREEBIE_DATA = [
  {
    id: 1,
    title: "Game Assets Pack 01",
    thumbnail: "/freebies/thumbnail-dirtcake-free-game-assets-01.webp",
    fileUrl: "/freebies/dirtcake-free-game-assets-01.ai",
    fileName: "dirtcake-free-game-assets-01.ai",
    alt: "completely free editable vector game assets for a match 3 game by Dirtcake Studio",
  },
  {
    id: 2,
    title: "Game Assets Pack 02",
    thumbnail: "/freebies/thumbnail-dirtcake-free-game-assets-02.webp",
    fileUrl: "/freebies/dirtcake-free-game-assets-02.ai",
    fileName: "dirtcake-free-game-assets-02.ai",
    alt: "completely free editable vector low-poly game UI icons for games and website UI design by Dirtcake Studio",
  },
];

export default function Freebies() {
  return (
    <div className="flex-1 bg-white flex flex-col items-center pt-24 md:pt-32 pb-12 md:pb-20 px-6">
      <Seo {...PAGE_META.freebies} />

      <div className="text-center mb-16 max-w-2xl">
        <h1 className="font-display text-4xl md:text-6xl font-black uppercase tracking-tighter text-black">
          Free <span className="text-neon-pink">Resources</span>
        </h1>

        <div className="mt-8 text-black/70 font-medium uppercase text-[10px] tracking-[0.2em] leading-loose">
          <p>
            A collection of assets from our studio for you to
            <br />
            download, use, and create something awesome.
          </p>

          <h2 className="font-display text-2xl font-black uppercase tracking-tight text-black mt-10 mb-2">
            NO STRINGS ATTACHED.
          </h2>
          <p className="text-black font-bold">
            Free for personal and commercial use.
          </p>

          <p className="text-neon-pink font-bold mt-4">
            Click on the thumbnails to download.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-5xl mb-20">
        {FREEBIE_DATA.map((item) => (
          <div key={item.id} className="flex flex-col items-center">
            <div className="relative group overflow-hidden border border-black/5 rounded-sm bg-gray-50 max-w-[400px] w-full shadow-sm">
              <img
                src={item.thumbnail}
                alt={item.alt}
                loading="lazy"
                decoding="async"
                className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-105"
              />
              <a
                href={item.fileUrl}
                download={item.fileName}
                aria-label={`Download ${item.title} (.ai)`}
                className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3 cursor-pointer"
              >
                <div className="bg-white text-black p-4 rounded-full shadow-xl">
                  <Download size={24} aria-hidden="true" />
                </div>
                <span className="font-bold text-[10px] text-white tracking-[0.3em] uppercase">
                  Download .AI
                </span>
              </a>
            </div>
            <h3 className="mt-6 font-bold text-[10px] tracking-[0.4em] uppercase text-black/60">
              {item.title}
            </h3>
            {/* Always-visible link: touch devices have no hover overlay */}
            <a
              href={item.fileUrl}
              download={item.fileName}
              className="mt-2 inline-flex items-center gap-2 text-[10px] font-black tracking-[0.3em] uppercase text-black underline underline-offset-4 hover:text-neon-pink transition-colors"
            >
              <Download size={12} aria-hidden="true" />
              Download .AI
            </a>
          </div>
        ))}
      </div>

      <div className="w-full max-w-2xl border-t border-black/5 pt-12 text-center">
        <h2 className="font-display text-xl font-bold uppercase tracking-tight text-black mb-4">
          You can give us a follow or a few ❤️s below:
        </h2>
        <p className="text-black/60 text-[11px] font-medium uppercase tracking-widest mb-8">
          but only if you feel like...
        </p>

        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
          {SOCIALS.map(({ key, label, url, Icon }) => (
            <a
              key={key}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-black hover:text-neon-pink transition-colors"
            >
              <Icon size={18} aria-hidden="true" />
              <span className="text-[10px] font-black uppercase tracking-widest">
                {key === "x" ? "Twitter" : label}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

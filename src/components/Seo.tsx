import { Helmet } from "react-helmet-async";
import { metaToTags, type RouteMeta } from "../seo";

/** Renders every <head> tag for a page from the shared metadata in seo.ts. */
export default function Seo(meta: RouteMeta) {
  return (
    <Helmet>
      <title>{meta.title}</title>
      {metaToTags(meta).map((t, i) =>
        t.tag === "script" ? (
          <script key={i} {...t.attrs}>
            {t.text}
          </script>
        ) : t.tag === "link" ? (
          <link key={i} {...t.attrs} />
        ) : (
          <meta key={i} {...t.attrs} />
        ),
      )}
    </Helmet>
  );
}

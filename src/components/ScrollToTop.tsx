import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** Resets scroll to the top on every route change (the page itself scrolls now). */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname]);

  return null;
}

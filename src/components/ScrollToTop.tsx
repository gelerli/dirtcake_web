import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToTop Component
 * Forces all possible scroll containers to the top immediately upon route change.
 * This prevents the "scrolled-down landing page" issue on mobile.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // 1. Reset the main window/root immediately.
    // 'instant' is critical here to override smooth-scroll lags.
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });

    // 2. Clear document-level scroll (fixes specific iOS/Chrome mobile bugs)
    document.documentElement.scrollTo({ top: 0, behavior: "instant" });
    document.body.scrollTo({ top: 0, behavior: "instant" });

    // 3. Reset the internal <main> container.
    // Since App.tsx uses md:overflow-y-auto, this container holds the scroll on desktop.
    const mainContainer = document.querySelector("main");
    if (mainContainer) {
      mainContainer.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant",
      });
    }
  }, [pathname]);

  return null;
}

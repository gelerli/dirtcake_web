import React, { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { MotionConfig } from "motion/react";
import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";
import ScrollToTop from "./components/ScrollToTop.tsx";
import Home from "./pages/Home.tsx";

// Everything except the landing page is split into its own chunk.
const Gallery = lazy(() => import("./pages/Gallery.tsx"));
const About = lazy(() => import("./pages/About.tsx"));
const Contact = lazy(() => import("./pages/Contact.tsx"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail.tsx"));
const Freebies = lazy(() => import("./pages/Freebies.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));

/**
 * Only the landing page is locked to the viewport (its diagonal slideshow
 * needs it). Every other page scrolls normally with the browser window, so
 * scroll restoration, find-in-page, print and scroll analytics all work.
 */
function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const isHome = useLocation().pathname === "/";

  return (
    <div
      className={`flex flex-col bg-white ${isHome ? "h-[100dvh] overflow-hidden" : "min-h-[100dvh]"}`}
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[200] focus:bg-black focus:text-white focus:px-4 focus:py-2 focus:text-xs focus:font-bold focus:tracking-[0.2em] focus:uppercase"
      >
        Skip to content
      </a>
      <Header />

      <main
        id="main-content"
        className={`flex-grow flex flex-col ${isHome ? "overflow-hidden" : ""}`}
      >
        <div className="flex-grow flex flex-col">{children}</div>
        <Footer />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      {/* Honour the visitor's "reduce motion" setting for all animations. */}
      <MotionConfig reducedMotion="user">
        <Router>
          <ScrollToTop />
          <LayoutWrapper>
            <Suspense fallback={null}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/project/:slug" element={<ProjectDetail />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/freebies" element={<Freebies />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </LayoutWrapper>
        </Router>
      </MotionConfig>
    </HelmetProvider>
  );
}

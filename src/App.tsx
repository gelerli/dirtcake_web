import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";
import ScrollToTop from "./components/ScrollToTop.tsx";
import Home from "./pages/Home.tsx";
import Gallery from "./pages/Gallery.tsx";
import About from "./pages/About.tsx";
import Contact from "./pages/Contact.tsx";
import ProjectDetail from "./pages/ProjectDetail.tsx";
import Freebies from "./pages/Freebies.tsx";

/**
 * LayoutWrapper handles the conditional styling based on the current route.
 * This is the key to fixing the mobile scroll only on the landing page.
 */
function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div
      className={`
        flex flex-col bg-white isolation-isolate
        /* Desktop: Always locked to screen height */
        md:h-screen md:overflow-hidden 
        /* Mobile: Lock height and hide scroll ONLY on Home page */
        ${isHome ? "h-[100dvh] overflow-hidden" : "min-h-screen"}
      `}
    >
      <Header />

      <main
        className={`
          flex-grow flex flex-col 
          /* Desktop: Scroll internally */
          md:overflow-y-auto 
          /* Mobile: Natural scroll on all pages EXCEPT Home */
          ${isHome ? "overflow-hidden" : "overflow-y-auto"}
        `}
        id="main-content"
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
      <Router>
        <ScrollToTop />
        <LayoutWrapper>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/project/:slug" element={<ProjectDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/freebies" element={<Freebies />} />
          </Routes>
        </LayoutWrapper>
      </Router>
    </HelmetProvider>
  );
}

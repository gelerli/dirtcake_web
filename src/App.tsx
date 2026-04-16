import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";
import ScrollToTop from "./components/ScrollToTop.tsx";
import Home from "./pages/Home.tsx";
import Gallery from "./pages/Gallery.tsx";
import About from "./pages/About.tsx";
import Contact from "./pages/Contact.tsx";
import ProjectDetail from "./pages/ProjectDetail.tsx";

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        {/* 'isolation-isolate' ensures z-index and scroll contexts don't leak */}
        <div className="min-h-screen flex flex-col bg-white md:h-screen md:overflow-hidden isolation-isolate">
          <Header />

          {/* We select this 'main' tag in ScrollToTop.tsx. 
            On mobile, overflow is visible (natural scroll). 
            On desktop, it handles the scrolling internally.
          */}
          <main
            className="flex-grow flex flex-col md:overflow-y-auto"
            id="main-content"
          >
            <div className="flex-grow flex flex-col">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/project/:slug" element={<ProjectDetail />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </div>
            <Footer />
          </main>
        </div>
      </Router>
    </HelmetProvider>
  );
}

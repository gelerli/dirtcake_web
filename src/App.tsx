/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async"; // Added import
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
      {" "}
      {/* Added Provider */}
      <Router>
        <ScrollToTop />
        <div className="h-screen flex flex-col bg-white overflow-hidden">
          <Header />

          <main className="flex-grow overflow-y-auto flex flex-col">
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

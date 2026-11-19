import React, { useState, lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import SmoothScroll from "./components/SmoothScroll";
import ScrollToHash from "./components/ScrollToHash";
import Loader from "./components/Loader";
import ScrollToTop from "./components/ScrollToTop";

const HomePage = lazy(() => import("./pages/HomePage"));
const EventsPage = lazy(() => import("./pages/EventsPage"));
const TeamPage = lazy(() => import("./pages/TeamPage"));
const AchivementPage = lazy(() => import("./pages/AchivementPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <Loader onFinish={() => setLoading(false)} />}

      {!loading && (
        <SmoothScroll>
          <ScrollToTop />
          <ScrollToHash />

          <div className="App">
            <Suspense fallback={<div className="min-h-screen bg-[#0a0a0a]" />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/events" element={<EventsPage />} />
                <Route path="/team" element={<TeamPage />} />
                <Route path="/achievements" element={<AchivementPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </div>
        </SmoothScroll>
      )}
    </>
  );
}

export default App;

import { useEffect, useState } from "react";
import logo from "/logo.png";
import "../styles/Loader.css";

const quotes = [
  "Building Together",
  "Connect. Learn. Grow.",
  "Connecting Developers"
];

export default function Loader({ onFinish }) {
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    // Fast forward quote cycle (every 700ms)
    const quoteInterval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 700);

    // Snappy splash duration (~2.2s total instead of 6s)
    const timer = setTimeout(() => {
      onFinish();
    }, 2200); 

    return () => {
      clearInterval(quoteInterval);
      clearTimeout(timer);
    };
  }, [onFinish]);

  return (
    <div className="loader-container">
      <img src={logo} alt="GDG Logo" className="loader-logo" />

      <p className="loader-quote" key={quoteIndex}>
        {quotes[quoteIndex]}
      </p>
    </div>
  );
}

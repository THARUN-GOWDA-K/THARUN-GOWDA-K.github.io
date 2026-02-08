import { useEffect } from "react";
import "./CursorGlow.css";

export default function CursorGlow() {
  useEffect(() => {
    const glow = document.querySelector(".cursor-glow");
    const move = e => {
      glow.style.transform = `translate(${e.clientX - 150}px, ${e.clientY - 150}px)`;
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return <div className="cursor-glow" />;
}

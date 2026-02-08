import { useEffect, useState } from "react";
import "./Navbar.css";

const sections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "tech", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "resume", label: "Resume" },
  { id: "contact", label: "Contact" }
];

export default function Navbar() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );

    sections.forEach(sec => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = id => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth"
    });
  };

  return (
    <nav className="navbar">
      <div className="nav-logo">TGK</div>

      <ul className="nav-links">
        {sections.map(sec => (
          <li
            key={sec.id}
            className={active === sec.id ? "active" : ""}
            onClick={() => scrollTo(sec.id)}
          >
            {sec.label}
          </li>
        ))}
      </ul>
    </nav>
  );
}

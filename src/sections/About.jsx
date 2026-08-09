import { useEffect, useRef, useState } from "react";
import { FaGraduationCap, FaCalendarAlt } from "react-icons/fa";
import "./About.css";

/* ── Interests data ── */
const INTERESTS = [
  { emoji: "💻", label: "Coding & Problem-Solving", color: "#00ffff" },
  { emoji: "🤖", label: "AI & Machine Learning", color: "#f59e0b" },
  { emoji: "�", label: "Kabaddi", color: "#ef4444" },
  { emoji: "📚", label: "Reading Books", color: "#3b82f6" },
  { emoji: "🍳", label: "Cooking", color: "#f472b6" },
  { emoji: "🎬", label: "Anime", color: "#a855f7" },
  { emoji: "🎵", label: "Music", color: "#ec4899" },
];

/* ── Education data ── */
const EDUCATION = [
  {
    degree: "B.E — Computer Science & Engineering",
    school: "Sri Venkateshwara College of Engineering",
    year: "2022 — 2026",
    score: "8.23 CGPA",
    percent: 81,
  },
  {
    degree: "Pre-University — PCMB",
    school: "Amara Jyothi PU College",
    year: "2020 — 2022",
    score: "90.83%",
    percent: 90.83,
  },
  {
    degree: "Secondary School — SSLC",
    school: "Magnolia High School",
    year: "2020",
    score: "94%",
    percent: 94,
  },
];

/* ── Circular progress ring with animated counter ── */
function ScoreRing({ percent, label }) {
  const ringRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [displayVal, setDisplayVal] = useState("0");

  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !visible) {
          setVisible(true);

          /* Animate the text counter */
          const isDecimal = label.includes(".");
          const numericVal = parseFloat(label);
          const duration = 1400;
          const start = performance.now();

          const tick = (now) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = eased * numericVal;

            if (isDecimal) {
              const decimals = label.split(".")[1].replace(/[^0-9]/g, "").length;
              setDisplayVal(current.toFixed(decimals));
            } else {
              setDisplayVal(String(Math.round(current)));
            }

            if (progress < 1) requestAnimationFrame(tick);
            else setDisplayVal(label); // final exact label
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );
    if (ringRef.current) observer.observe(ringRef.current);
    return () => observer.disconnect();
  }, [visible, label, percent]);

  return (
    <div className={`score-ring ${visible ? "ring-visible" : ""}`} ref={ringRef}>
      <svg viewBox="0 0 90 90" className="ring-svg">
        <defs>
          <linearGradient id={`ringGrad-${percent}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#00ffff" />
          </linearGradient>
        </defs>
        <circle cx="45" cy="45" r={radius} className="ring-bg" />
        <circle
          cx="45" cy="45" r={radius}
          className="ring-fill"
          stroke={`url(#ringGrad-${percent})`}
          strokeDasharray={circumference}
          strokeDashoffset={visible ? offset : circumference}
        />
      </svg>
      <span className="ring-text">{displayVal}</span>
    </div>
  );
}

/* ── Single timeline card with staggered entrance ── */
function TimelineCard({ edu, index }) {
  const cardRef = useRef(null);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setEntered(true); },
      { threshold: 0.3 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`timeline-card ${entered ? "tl-entered" : ""}`}
      ref={cardRef}
      style={{ transitionDelay: `${index * 200}ms` }}
    >
      <div className="tl-node" />
      <ScoreRing percent={edu.percent} label={edu.score} />
      <h4 className="tl-degree">{edu.degree}</h4>
      <p className="tl-school">{edu.school}</p>
      <span className="tl-year">
        <FaCalendarAlt /> {edu.year}
      </span>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="about-section">
      <div className="section-header">
        <span className="section-tag">ABOUT</span>
        <h2 className="section-title">About Me</h2>
        <div className="section-bar" />
        <p className="section-subtitle">A quick glimpse into who I am and what drives me</p>
      </div>

      <div className="bento-grid">
        {/* ── Bio card (full-width top) ── */}
        <div className="bento-card bio-card">
          <h3 className="bio-title">
            From <span className="hl-purple">broken code</span> to{" "}
            <span className="hl-cyan">working products</span> — that's my thing
          </h3>

          <p>
            I'm <strong>Tharun Gowda K</strong>, a CSE undergrad at{" "}
            <strong>Sri Venkateshwara College of Engineering</strong>,
            Bengaluru. I don't just study tech — I ship it. Five
            projects deep, <strong>8.1 CGPA</strong>, and still hungry
            for the next challenge.
          </p>

          <p>
            My playground spans{" "}
            <span className="hl-cyan">data science</span>,{" "}
            <span className="hl-cyan">machine learning</span>, and{" "}
            <span className="hl-cyan">full-stack development</span>. I
            believe the best way to learn something is to build it, break
            it, then rebuild it better.
          </p>

          <p>
            I believe — <em>"The early bird may get the worm, but the
            second mouse gets the cheese." </em> Work smart, stay patient,
            and strike at the right moment.
          </p>
        </div>

        {/* ── Philosophy / code snippet card (full width) ── */}
        <div className="bento-card code-card">
          <div className="code-header">
            <span className="code-dot red" />
            <span className="code-dot yellow" />
            <span className="code-dot green" />
            <span className="code-filename">philosophy.js</span>
          </div>
          <pre className="code-body">
            <code>
              <span className="ck">const</span>{" "}
              <span className="cv">mindset</span> = {"{"}
              {"\n"}
              {"  "}
              <span className="cp">learn</span>:{" "}
              <span className="cs">"every single day"</span>,{"\n"}
              {"  "}
              <span className="cp">build</span>:{" "}
              <span className="cs">"things that matter"</span>,{"\n"}
              {"  "}
              <span className="cp">fail</span>:{" "}
              <span className="cs">"fast, learn faster"</span>,{"\n"}
              {"  "}
              <span className="cp">Patience</span>:{" "}
              <span className="cb">true</span>
              {"\n"}
              {"}"};
            </code>
          </pre>
        </div>
      </div>

      {/* ── Education Timeline ── */}
      <div className="edu-timeline">
        <h3 className="edu-section-title">
          <FaGraduationCap /> Education
        </h3>
        <div className="timeline-line" />
        <div className="timeline-cards">
          {EDUCATION.map((edu, i) => (
            <TimelineCard edu={edu} index={i} key={i} />
          ))}
        </div>
      </div>

      {/* ── Interests Marquee ── */}
      <div className="interests-section">
        <h3 className="interests-title">✨ Interests</h3>
        <div className="interests-marquee">
          <div className="interests-track">
            {[...INTERESTS, ...INTERESTS, ...INTERESTS].map((item, i) => (
              <div
                className="interest-chip"
                key={i}
                style={{ "--chip-color": item.color }}
              >
                <span className="chip-emoji">{item.emoji}</span>
                <span className="chip-label">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Languages ── */}
      <div className="languages-section">
        <h3 className="languages-title">🌐 Languages</h3>
        <div className="languages-grid">
          {[
            { name: "Kannada", level: "Native", color: "#00ffff" },
            { name: "English", level: "Fluent", color: "#a855f7" },
            { name: "Telugu", level: "Fluent", color: "#22c55e" },
            { name: "Hindi", level: "Fluent", color: "#f472b6" },
          ].map((lang) => (
            <div className="lang-card" key={lang.name}>
              <span className="lang-name" style={{ color: lang.color }}>
                {lang.name}
              </span>
              <span className="lang-level">{lang.level}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

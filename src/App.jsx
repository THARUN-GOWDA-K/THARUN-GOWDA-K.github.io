import Background from "./components/Background";
import CursorGlow from "./components/CursorGlow";
import TechStack from "./sections/TechStack";
import Projects from "./sections/Projects";
import "./index.css";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
     <Navbar />
      {/* GLOBAL EFFECTS */}
      <Background />
      <CursorGlow />

      {/* HERO */}
      <header id="home" className="hero">
  <h1>
    THARUN <span>GOWDA K</span>
  </h1>

  <h2 className="hero-tagline">
    Curious by nature. Analytical by mindset.
  </h2>

  <p className="hero-desc">
    I explore <span>data</span>, <span>algorithms</span>, and{" "}
    <span>intelligent systems</span> to understand how things work,
    break complex problems into logic, and build solutions that matter.
  </p>

  <p className="hero-focus">
    Data Science · Machine Learning · Full-Stack Thinking
  </p>
</header>


      {/* ABOUT */}
      <section id="about" className="section">
        <h2>About Me</h2>
        <p>
          Seeking a position that allows me to apply my strong analytical and
          problem-solving skills, along with my passion for continuous learning,
          to make a positive impact and contribute to the overall goals of the
          organization.
        </p>
        {/* EDUCATION */}
        <div className="education">
          <h3 className="education-title">Education</h3>

          <div className="education-card">
            <h4>Sri Venkateshwara College of Engineering, Bengaluru</h4>

            <p className="education-degree">
              B.E – Computer Science and Engineering
              <span>(2022 – 2026)</span>
            </p>

            <p className="education-cgpa">
              <strong>CGPA:</strong> 8.1
            </p>
        </div>
        </div>
      </section>

      {/* TECH STACK (REPLACES OLD SKILLS) */}
      <section id="tech">
        <TechStack />
      </section>

      {/* PROJECTS (GSAP BounceCards) */}
      <section id="projects">
        <Projects />
        </section>

      <section id="resume" className="section resume">
  <h2>Resume</h2>

  <p className="resume-text">
    Download my resume to learn more about my skills, projects, and experience.
  </p>

  <a
    href="/TharunResume.pdf"
    download
    className="resume-btn"
  >
    Download Resume
  </a>
</section>




      {/* CONTACT */}
      <section id="contact" className="section contact">
  <h2>Contact</h2>

  <div className="contact-grid">

    <a
      href="https://github.com/THARUN-GOWDA-K"
      target="_blank"
      rel="noreferrer"
      className="contact-card"
    >
      <div className="contact-content">
      <div className="icon-wrapper">
        <FaGithub />
      </div>
      <p className="contact-title">GitHub</p>
      </div>
    </a>

    <a
      href="https://www.linkedin.com/in/tharun-gowda-k-3059b4259"
      target="_blank"
      rel="noreferrer"
      className="contact-card"
    >
      <div className="contact-content">
      <div className="icon-wrapper">
        <FaLinkedin />
      </div>
      <p className="contact-title">LinkedIn</p>
      </div>
    </a>

    <a
      href="mailto:tharungowda0369@gmail.com"
      className="contact-card"
    > 
      <div className="contact-content">
      <div className="icon-wrapper">
        <FaEnvelope />
      </div>
      <p className="contact-title">Email</p>
      <p className="contact-sub">tharungowda0369@gmail.com</p>
      </div>
    </a>

  </div>
</section>

    </>
  );
}

export default App;

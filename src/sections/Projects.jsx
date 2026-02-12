import { useState } from "react";
import BounceCards from "../components/BounceCards";
import "./Projects.css";

const projects = [
  {
    title: "HealthForesight",
    description:
      "AI-driven health risk prediction using real-time data and machine learning models.",
    image: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144",
    link: "https://github.com/THARUN-GOWDA-K/HealthForesight"
  },
  {
    title: "Annual Report Portal",
    description:
      "Web platform to generate, manage, and visualize annual reports efficiently.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
    link: "https://github.com/THARUN-GOWDA-K/Annual-report-portal"
  },
  {
    title: "Self-Healing Blockchain",
    description:
      "Blockchain system that detects faults and restores integrity automatically.",
    image: "https://images.unsplash.com/photo-1639322537228-f710d846310a",
    link: "https://github.com/THARUN-GOWDA-K/Self-Healing-Blockchain"
  },
  {
    title: "Employee Management Chatbot",
    description:
      "Conversational chatbot to handle employee queries and HR workflows.",
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a",
    link: "https://github.com/THARUN-GOWDA-K/employee-chatbot"
  },
  {
    title: "Smart Farming Assistant",
    description:
      "IoT and AI-based assistant to optimize crop health and farming decisions.",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449",
    link: "https://github.com/THARUN-GOWDA-K/smart-farming-assistant"
  }
];

const transforms = [
  "rotate(6deg) translate(-160px)",
  "rotate(2deg) translate(-80px)",
  "rotate(0deg)",
  "rotate(-2deg) translate(80px)",
  "rotate(-6deg) translate(160px)"
];

export default function Projects() {
  const [activeIdx, setActiveIdx] = useState(null);

  return (
    <section id="projects" className="projects-section">
      <h2>Projects</h2>

      <div className="projects-cards-wrapper">
  <BounceCards
  images={projects.map(p => p.image)}
  transformStyles={transforms}
  containerWidth={700}
  containerHeight={360}
  enableHover
  onHover={setActiveIdx}
  onLeave={() => setActiveIdx(null)}
  onClickCard={(idx) => {
    const project = projects[idx];
    if (project?.link) {
      window.open(project.link, "_blank");
    }
  }}
  renderOverlay={(idx) => (
    <div className="project-title-overlay">
      {projects[idx].title}
    </div>
  )}
/>

</div>


      {/* DESCRIPTION AREA */}
      {activeIdx !== null && (
        <div className="project-description">
          <h3>{projects[activeIdx].title}</h3>
          <p>{projects[activeIdx].description}</p>
        </div>
      )}
    </section>
  );
}

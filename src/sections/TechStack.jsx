import "./TechStack.css";

const techs = [
  { name: "Python", icon: "devicon-python-plain" },
  { name: "C", icon: "devicon-c-plain" },
  { name: "Java", icon: "devicon-java-plain" },
  { name: "HTML", icon: "devicon-html5-plain" },
  { name: "CSS", icon: "devicon-css3-plain" },
  { name: "JavaScript", icon: "devicon-javascript-plain" },
  { name: "React", icon: "devicon-react-original" },
  { name: "Flask", icon: "devicon-flask-original" },
  { name: "FastAPI", icon: "devicon-fastapi-plain" },
  { name: "NumPy", icon: "devicon-numpy-original" },
  { name: "Pandas", icon: "devicon-pandas-original" },
  { name: "MongoDB", icon: "devicon-mongodb-plain" },
  { name: "MySQL", icon: "devicon-mysql-plain" }
];

export default function TechStack() {
  return (
    <section className="tech-section">
      <h2>Tech Stack</h2>

      <div className="tech-grid">
        {techs.map((t, i) => (
          <div key={i} className="tech-card">
            <i className={t.icon}></i>
            <span>{t.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

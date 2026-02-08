import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./BounceCards.css";

export default function BounceCards({
  images = [],
  transformStyles = [],
  enableHover = true,
  renderOverlay,
  onHover,
  onLeave
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".card",
        { scale: 0 },
        {
          scale: 1,
          stagger: 0.08,
          ease: "elastic.out(1, 0.6)",
          delay: 0.4
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const pushSiblings = hoveredIdx => {
    if (!enableHover) return;
    const q = gsap.utils.selector(containerRef);

    images.forEach((_, i) => {
      const card = q(`.card-${i}`);
      const base = transformStyles[i] || "none";

      if (i === hoveredIdx) {
        gsap.to(card, {
          transform: base.replace(/rotate\([^)]*\)/, "rotate(0deg)"),
          duration: 0.4,
          ease: "back.out(1.4)"
        });
      } else {
        gsap.to(card, {
          transform: `${base} translate(${i < hoveredIdx ? -160 : 160}px)`,
          duration: 0.4,
          ease: "back.out(1.4)"
        });
      }
    });
  };

  const reset = () => {
    const q = gsap.utils.selector(containerRef);
    images.forEach((_, i) => {
      gsap.to(q(`.card-${i}`), {
        transform: transformStyles[i] || "none",
        duration: 0.4,
        ease: "back.out(1.4)"
      });
    });
  };

  return (
    <div ref={containerRef} className="bounceCardsContainer">
      {images.map((src, i) => (
                <div
            key={i}
            className={`card card-${i}`}
            style={{ transform: transformStyles[i] || "none" }}
            onMouseEnter={() => {
                pushSiblings(i);
                onHover && onHover(i);
            }}
            onMouseLeave={() => {
                reset();
                onLeave && onLeave();
            }}
            >
          <img src={src} alt={`project-${i}`} />

          {typeof renderOverlay === "function" && (
            <div className="overlay">{renderOverlay(i)}</div>
          )}
        </div>
      ))}
    </div>
  );
}

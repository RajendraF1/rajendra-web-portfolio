"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type SkillCard = {
  key: string;
  title: string;
  subtitle: string;
  stacks: string[];
  focus: string[];
};

export default function SkillsSection() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const orbRef = useRef<HTMLDivElement | null>(null);
  const [pulse, setPulse] = useState(0); // used to softly cycle highlights

  const cards = useMemo<SkillCard[]>(
    () => [
      {
        key: "data",
        title: "Data Pipelines",
        subtitle: "Collect → transform → store → serve. Built for reliability.",
        stacks: [
          "Python",
          "Pandas",
          "SQL (PostgreSQL)",
          "Airflow",
          "dbt",
          "Spark",
          "Kafka",
          "Docker",
        ],
        focus: [
          "Web scraping & ingestion",
          "ETL / ELT workflows",
          "Data cleaning & validation",
          "Warehouse-ready outputs",
        ],
      },
      {
        key: "software",
        title: "Software Engineering",
        subtitle: "Practical apps with clean structure and maintainable logic.",
        stacks: [
          "Next.js",
          "React",
          "TypeScript",
          "Node.js",
          "FastAPI",
          "REST API",
          "PostgreSQL",
          "Git",
        ],
        focus: [
          "API design & integration",
          "Auth + backend logic",
          "Database modeling",
          "Clean, scalable codebase",
        ],
      },
      {
        key: "ai",
        title: "Applied AI",
        subtitle: "From data to models. Experimentation that connects to systems.",
        stacks: [
          "scikit-learn",
          "PyTorch",
          "TensorFlow",
          "Jupyter",
          "NumPy",
          "Hugging Face",
          "Matplotlib",
          "Experiment tracking",
        ],
        focus: [
          "Dataset preparation",
          "Model training & evaluation",
          "Feature experimentation",
          "Prototype → integrate",
        ],
      },
    ],
    []
  );

  useEffect(() => {
    const wrap = wrapRef.current;
    const orb = orbRef.current;
    if (!wrap || !orb) return;

    // 1) continuous subtle orb motion (background feels alive)
    let raf = 0;
    const start = performance.now();
    const loop = (now: number) => {
      const t = (now - start) / 1000;
      const x = 50 + Math.sin(t * 0.35) * 16;
      const y = 34 + Math.cos(t * 0.28) * 12;
      orb.style.transform = `translate3d(${x}%, ${y}%, 0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // 2) pointer parallax for the whole section
    const onMove = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect();
      const mx = (e.clientX - r.left) / Math.max(1, r.width);
      const my = (e.clientY - r.top) / Math.max(1, r.height);

      wrap.style.setProperty("--px", `${((mx - 0.5) * 10).toFixed(2)}px`);
      wrap.style.setProperty("--py", `${((my - 0.5) * 8).toFixed(2)}px`);
      wrap.style.setProperty("--gx", `${(mx * 100).toFixed(1)}%`);
      wrap.style.setProperty("--gy", `${(my * 100).toFixed(1)}%`);
    };

    wrap.addEventListener("pointermove", onMove);

    // 3) small JS "pulse" to cycle chip highlights (keeps it lively)
    const id = window.setInterval(() => setPulse((p) => p + 1), 1100);

    return () => {
      cancelAnimationFrame(raf);
      wrap.removeEventListener("pointermove", onMove);
      window.clearInterval(id);
    };
  }, []);

  return (
    <div ref={wrapRef} className="frame-scroll skills">
      {/* subtle animated orb */}
      <div className="orb-wrap" aria-hidden="true">
        <div ref={orbRef} className="orb" />
      </div>

      <h1 className="title">Skills</h1>
      <p className="subtitle">
        My main focus areas and the stacks commonly used in real-world projects.
      </p>

      <div className="grid">
        {cards.map((c, idx) => {
          const highlightIndex = (pulse + idx * 2) % c.stacks.length; // stagger per card

          return (
            <div key={c.key} className="card">
              <div className="card-head">
                <h3 className="card-title">{c.title}</h3>
                <p className="card-sub">{c.subtitle}</p>
              </div>

              <div className="row">
                <p className="label">Common stack</p>
                <div className="chips" aria-label={`${c.title} stack`}>
                  {c.stacks.map((s, i) => (
                    <span
                      key={s}
                      className={`chip ${i === highlightIndex ? "on" : ""}`}
                      title={s}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="row">
                <p className="label">What I do</p>
                <ul className="list">
                  {c.focus.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </div>

              <span className="glow" aria-hidden="true" />
            </div>
          );
        })}
      </div>

      <style jsx>{`
        .skills {
          position: relative;
          transform: translate3d(var(--px, 0px), var(--py, 0px), 0);
        }

        .orb-wrap {
          position: absolute;
          inset: -50px -50px auto -50px;
          height: 280px;
          pointer-events: none;
          filter: blur(22px);
          opacity: 0.55;
        }

        .orb {
          width: 300px;
          height: 300px;
          border-radius: 999px;
          background: radial-gradient(
            circle at 30% 30%,
            rgba(0, 209, 255, 0.22),
            rgba(0, 0, 0, 0)
          );
        }

        .grid {
          margin-top: 16px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
          position: relative;
          z-index: 1;
        }

        .card {
          position: relative;
          border: 1px solid var(--border);
          background: rgba(255, 255, 255, 0.04);
          border-radius: 18px;
          padding: 16px;
          backdrop-filter: blur(10px);
          overflow: hidden;

          /* subtle lift + glow follows pointer (CSS vars set by pointermove on wrapper) */
          transition: transform 160ms ease, background 160ms ease, border-color 160ms ease;
        }

        .card:hover {
          transform: translateY(-2px);
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(255, 255, 255, 0.18);
        }

        .glow {
          position: absolute;
          inset: -80px;
          pointer-events: none;
          opacity: 0;
          transition: opacity 160ms ease;
          background: radial-gradient(
            340px 240px at var(--gx, 50%) var(--gy, 50%),
            rgba(255, 255, 255, 0.12),
            rgba(255, 255, 255, 0)
          );
        }

        .card:hover .glow {
          opacity: 1;
        }

        .card-title {
          margin: 0;
          font-size: 16px;
          font-weight: 950;
          letter-spacing: 0.01em;
        }

        .card-sub {
          margin: 6px 0 0;
          color: var(--muted);
          line-height: 1.55;
        }

        .row {
          margin-top: 12px;
        }

        .label {
          margin: 0 0 8px;
          font-size: 12px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--muted);
        }

        .chips {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .chip {
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: rgba(255, 255, 255, 0.04);
          color: var(--muted);
          border-radius: 999px;
          padding: 6px 10px;
          font-size: 13px;
          transition: transform 180ms ease, background 180ms ease, color 180ms ease;
        }

        /* JS pulse highlight */
        .chip.on {
          background: rgba(255, 255, 255, 0.09);
          color: var(--text);
          transform: translateY(-1px);
        }

        .list {
          margin: 0;
          padding-left: 18px;
          color: var(--muted);
          line-height: 1.65;
        }

        @media (max-width: 900px) {
          .grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

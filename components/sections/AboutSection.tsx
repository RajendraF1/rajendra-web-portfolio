"use client";

import { useEffect, useMemo, useRef, useState } from "react";

export default function AboutSection() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const streamRef = useRef<HTMLDivElement | null>(null);
  const haloRef = useRef<HTMLDivElement | null>(null);

  const [stats, setStats] = useState({ python: 0, scraping: 0, de: 0, ai: 0 });

  const chips = useMemo(
    () => [
      "Full-Stack",
      "Python",
      "Web Scraping",
      "APIs",
      "Data Engineering",
      "ETL Pipelines",
      "Machine Learning",
      "Deep Learning",
      "PHP",
      "TypeScript",
      "Next.JS",
      "Laravel",
      "Flask",
      "HTML",
      "CSS",
      "Cloud Computing",
      "Artificial Intelligence",
      "Automation Task",
    ],
    []
  );

  useEffect(() => {
    const root = rootRef.current;
    const stream = streamRef.current;
    const halo = haloRef.current;
    if (!root || !stream || !halo) return;

    const section = root.closest(".h-section");
    if (!section) return;

    // 1) Continuous subtle motion (halo + stream drift)
    let raf = 0;
    const start = performance.now();

    const loop = (now: number) => {
      const t = (now - start) / 1000;

      const hx = 50 + Math.sin(t * 0.35) * 10;
      const hy = 26 + Math.cos(t * 0.28) * 8;
      halo.style.transform = `translate3d(${hx}%, ${hy}%, 0)`;

      const sx = (t * 26) % 100;
      stream.style.backgroundPosition = `${sx}% 0%`;

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // 2) Re-run percent animation every time this section becomes active
    const to = { python: 90, scraping: 82, de: 72, ai: 66 };
    let animRaf = 0;
    let prevActive = false;
    let isCounting = false;

    const resetStats = () => setStats({ python: 0, scraping: 0, de: 0, ai: 0 });

    const animateStats = () => {
      // stop any previous animation
      if (animRaf) cancelAnimationFrame(animRaf);

      isCounting = true;
      resetStats();

      const from = { python: 0, scraping: 0, de: 0, ai: 0 };
      const duration = 900;
      const t0 = performance.now();

      const step = (tNow: number) => {
        const p = Math.min(1, (tNow - t0) / duration);
        const ease = 1 - Math.pow(1 - p, 3);

        setStats({
          python: Math.round(from.python + (to.python - from.python) * ease),
          scraping: Math.round(from.scraping + (to.scraping - from.scraping) * ease),
          de: Math.round(from.de + (to.de - from.de) * ease),
          ai: Math.round(from.ai + (to.ai - from.ai) * ease),
        });

        if (p < 1) animRaf = requestAnimationFrame(step);
        else isCounting = false;
      };

      animRaf = requestAnimationFrame(step);
    };

    const tickActive = () => {
      const active = section.classList.contains("is-active");

      // when entering active: run animation
      if (active && !prevActive && !isCounting) {
        animateStats();
      }

      // when leaving active: reset so next time it animates again
      if (!active && prevActive) {
        if (animRaf) cancelAnimationFrame(animRaf);
        isCounting = false;
        resetStats();
      }

      prevActive = active;
    };

    const activeTimer = window.setInterval(tickActive, 180);

    // 3) Micro parallax (very light)
    const onMove = (e: PointerEvent) => {
      const r = root.getBoundingClientRect();
      const mx = (e.clientX - r.left) / Math.max(1, r.width);
      const my = (e.clientY - r.top) / Math.max(1, r.height);

      root.style.setProperty("--px", `${((mx - 0.5) * 10).toFixed(2)}px`);
      root.style.setProperty("--py", `${((my - 0.5) * 8).toFixed(2)}px`);
    };
    root.addEventListener("pointermove", onMove);

    // run one tick initially
    tickActive();

    return () => {
      cancelAnimationFrame(raf);
      if (animRaf) cancelAnimationFrame(animRaf);
      window.clearInterval(activeTimer);
      root.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div ref={rootRef} className="frame-scroll about">
      <div className="halo-wrap" aria-hidden="true">
        <div ref={haloRef} className="halo" />
      </div>

      <div ref={streamRef} className="stream" aria-hidden="true" />

      <header className="top">
        <div className="identity">
          <div className="avatar">
            {/* put your photo in public/me.jpg */}
            <img src="/me.jpeg" alt="Andra" />
            <div className="avatar-ph">
              <span>YOUR PHOTO</span>
              <small>public/me.jpg</small>
            </div>
          </div>

          <div className="intro">
            <h1 className="title">About</h1>
            <p className="subtitle">
              I’m a student at <strong>Universitas Teknologi Yogyakarta (UTY)</strong>. My focus is{" "}
              <strong>Full-Stack development</strong> and building reliable systems. I’m not a UI
              designer, I prioritize functionality and clean architecture.
            </p>
          </div>
        </div>

        <div className="campus">
          <div className="campus-frame">
            <img src="/uty.jpeg" alt="Universitas Teknologi Yogyakarta" />
          </div>
          <p className="campus-cap">
            Universitas Teknologi Yogyakarta.
          </p>
        </div>
      </header>

      <section className="flow" aria-label="Focus areas">
        <div className="step">
          <div className="node" />
          <div className="step-body">
            <h3>Full-Stack</h3>
            <p>
              I connect frontend and backend into coherent systems: auth, APIs, databases, and
              deployment-ready structure.
            </p>
          </div>
        </div>

        <div className="step">
          <div className="node" />
          <div className="step-body">
            <h3>Data Engineering</h3>
            <p>
              I learn how data moves: collecting, cleaning, transforming, and serving it through ETL
              pipelines.
            </p>
          </div>
        </div>

        <div className="step">
          <div className="node" />
          <div className="step-body">
            <h3>AI / ML / DL</h3>
            <p>
              I explore ML/DL concepts and how they plug into software: datasets, training
              experiments, and automation.
            </p>
          </div>
        </div>
      </section>

      <section className="skill-zone" aria-label="Capabilities">
        <div className="meters">
          {/* ✅ title back */}
          <div className="meters-head">
            <h3 className="meters-title">Core Strengths</h3>
          </div>

          <div className="meter">
            <div className="k">Python</div>
            <div className="v">{stats.python}%</div>
            <div className="bar">
              <span style={{ width: `${stats.python}%` }} />
            </div>
          </div>

          <div className="meter">
            <div className="k">Web Scraping</div>
            <div className="v">{stats.scraping}%</div>
            <div className="bar">
              <span style={{ width: `${stats.scraping}%` }} />
            </div>
          </div>

          <div className="meter">
            <div className="k">Data Engineering</div>
            <div className="v">{stats.de}%</div>
            <div className="bar">
              <span style={{ width: `${stats.de}%` }} />
            </div>
          </div>

          <div className="meter">
            <div className="k">AI / ML / DL</div>
            <div className="v">{stats.ai}%</div>
            <div className="bar">
              <span style={{ width: `${stats.ai}%` }} />
            </div>
          </div>
        </div>

        <div className="cloud" aria-label="Topics">
          {chips.map((c, i) => (
            <span key={c} className="chip" style={{ animationDelay: `${i * 70}ms` }}>
              {c}
            </span>
          ))}
        </div>
      </section>

      <style jsx>{`
        .about {
          position: relative;
          transform: translate3d(var(--px, 0px), var(--py, 0px), 0);
          padding-top: 6px;
        }

        .halo-wrap {
          position: absolute;
          inset: -60px -60px auto -60px;
          height: 260px;
          pointer-events: none;
          filter: blur(22px);
          opacity: 0.55;
          z-index: 0;
        }

        .halo {
          width: 280px;
          height: 280px;
          border-radius: 999px;
          background: radial-gradient(
            circle at 30% 30%,
            rgba(0, 209, 255, 0.22),
            rgba(0, 0, 0, 0)
          );
        }

        .stream {
          position: absolute;
          left: 0;
          right: 0;
          top: 96px;
          height: 1px;
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0),
            rgba(255, 255, 255, 0.16),
            rgba(255, 255, 255, 0)
          );
          background-size: 200% 100%;
          opacity: 0.7;
          z-index: 0;
        }

        .top {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 14px;
          align-items: start;
        }

        .identity {
          display: grid;
          grid-template-columns: 104px 1fr;
          gap: 14px;
          align-items: start;
        }

        .avatar {
          width: 104px;
          height: 104px;
          border-radius: 999px;
          border: 1px solid var(--border);
          background: rgba(0, 0, 0, 0.22);
          overflow: hidden;
          position: relative;
          backdrop-filter: blur(10px);
          display: grid;
          place-items: center;
        }

        /* If you use your image, prefer cover to remove square corners */
        .avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: 50% 30%;
          display: block;
        }

        .avatar-ph {
          width: 100%;
          height: 100%;
          display: grid;
          place-items: center;
          text-align: center;
          color: var(--muted);
          font-size: 11px;
          gap: 4px;
          padding: 10px;
        }
        .avatar-ph span {
          color: var(--text);
          font-weight: 800;
          letter-spacing: 0.04em;
        }

        .campus-frame {
          height: 200px;
          border-radius: 18px;
          overflow: hidden;
          border: 1px solid var(--border);
          background: rgba(0, 0, 0, 0.22);
        }

        .campus-frame img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
          object-position: 50% 65%;
        }

        .campus-cap {
          margin: 8px 0 0;
          color: var(--muted);
          line-height: 1.5;
          font-size: 13px;
        }

        .flow {
          margin-top: 16px;
          border: 1px solid var(--border);
          background: rgba(255, 255, 255, 0.03);
          border-radius: 18px;
          padding: 14px;
          position: relative;
          z-index: 1;
        }

        .step {
          display: grid;
          grid-template-columns: 18px 1fr;
          gap: 12px;
          padding: 10px 4px;
          position: relative;
        }

        .step:not(:last-child)::after {
          content: "";
          position: absolute;
          left: 8px;
          top: 30px;
          bottom: -6px;
          width: 2px;
          background: rgba(255, 255, 255, 0.12);
        }

        .node {
          width: 14px;
          height: 14px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.14);
          border: 1px solid rgba(255, 255, 255, 0.18);
          box-shadow: 0 0 0 6px rgba(255, 255, 255, 0.04);
          margin-top: 6px;
          animation: pulse 2.8s ease-in-out infinite;
        }

        @keyframes pulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.9;
          }
          50% {
            transform: scale(1.06);
            opacity: 1;
          }
        }

        .step-body h3 {
          margin: 0 0 4px;
          font-size: 16px;
        }

        .step-body p {
          margin: 0;
          color: var(--muted);
          line-height: 1.65;
        }

        .skill-zone {
          margin-top: 14px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          position: relative;
          z-index: 1;
        }

        .meters {
          border: 1px solid var(--border);
          background: rgba(255, 255, 255, 0.04);
          border-radius: 18px;
          padding: 14px;
          backdrop-filter: blur(10px);
          display: grid;
          gap: 10px;
        }

        .meters-head {
          display: grid;
          gap: 2px;
          margin-bottom: 4px;
        }

        .meters-title {
          margin: 0;
          font-size: 16px;
          font-weight: 900;
          letter-spacing: 0.01em;
        }

        .meters-sub {
          margin: 0;
          color: var(--muted);
          font-size: 13px;
          line-height: 1.4;
        }

        .meter .k {
          color: var(--muted);
          font-size: 12px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .meter .v {
          font-weight: 900;
          font-size: 20px;
          margin-top: 4px;
        }

        .bar {
          height: 8px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.06);
          overflow: hidden;
          margin-top: 8px;
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .bar span {
          display: block;
          height: 100%;
          background: rgba(255, 255, 255, 0.22);
          width: 0%;
          transition: width 520ms ease;
        }

        .cloud {
          border: 1px solid var(--border);
          background: rgba(255, 255, 255, 0.03);
          border-radius: 18px;
          padding: 12px;
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          align-content: start;
        }

        .chip {
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: rgba(255, 255, 255, 0.04);
          color: var(--muted);
          border-radius: 999px;
          padding: 6px 10px;
          font-size: 13px;
          animation: chipFloat 2.6s ease-in-out infinite;
        }

        @keyframes chipFloat {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-2px);
          }
        }

        @media (max-width: 900px) {
          .top {
            grid-template-columns: 1fr;
          }
          .skill-zone {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 480px) {
          .identity {
            grid-template-columns: 86px 1fr;
          }
          .avatar {
            width: 86px;
            height: 86px;
          }
          .campus-frame {
            height: 180px;
          }
          .meter .v {
            font-size: 18px;
          }
        }
      `}</style>
    </div>
  );
}

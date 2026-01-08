"use client";

import { useEffect, useMemo, useRef, useState } from "react";

export default function HomeSection() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);

  const roles = useMemo(
    () => ["Informatics Student", "Gamer", "Swimmer", "Problem Solver", "Traveller"],
    []
  );

  const [roleIdx, setRoleIdx] = useState(0);

  // Subtle loop: rotate role text
  useEffect(() => {
    const id = window.setInterval(() => {
      setRoleIdx((p) => (p + 1) % roles.length);
    }, 2600);
    return () => window.clearInterval(id);
  }, [roles.length]);

  // Subtle continuous motion + tiny parallax
  useEffect(() => {
    const root = rootRef.current;
    const glow = glowRef.current;
    if (!root || !glow) return;

    let raf = 0;
    let start = performance.now();
    let mx = 0.5;
    let my = 0.5;

    const onMove = (e: PointerEvent) => {
      const r = root.getBoundingClientRect();
      mx = (e.clientX - r.left) / Math.max(1, r.width);
      my = (e.clientY - r.top) / Math.max(1, r.height);
    };

    root.addEventListener("pointermove", onMove);

    const loop = (now: number) => {
      const t = (now - start) / 1000;

      const gx = 48 + Math.sin(t * 0.35) * 16 + (mx - 0.5) * 10;
      const gy = 42 + Math.cos(t * 0.28) * 14 + (my - 0.5) * 8;
      glow.style.transform = `translate3d(${gx}%, ${gy}%, 0)`;

      const px = (mx - 0.5) * 8;
      const py = (my - 0.5) * 6;
      root.style.setProperty("--px", `${px.toFixed(2)}px`);
      root.style.setProperty("--py", `${py.toFixed(2)}px`);

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);

    return () => {
      root.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    // frame-scroll = area yang boleh scroll vertical di dalam 1 section
    <div ref={rootRef} className="frame-scroll home-hero">
      <div className="home-glow-wrap" aria-hidden="true">
        <div ref={glowRef} className="home-glow" />
      </div>

      <div className="home-top">
        <div className="home-kicker">
          <span className="dot" />
          <span>Available for collaboration</span>
        </div>

        <h1 className="title">
          I build{" "}
          <span className="home-accent">
            systems with clean logic and solid data
          </span>{" "}
          
        </h1>

        <p className="subtitle">
          Hello, I’m Rajendra focused on data, logic, and applied AI, building systems that work correctly before they look polished.
        </p>

        <div className="home-rolebar" role="status" aria-label="Current role">
          <span className="role-label">Currently:</span>
          <span className="role-value">{roles[roleIdx]}</span>
        </div>

        <div className="home-grid">
          <div className="home-card">
            <p className="hc-title">What I care about</p>
            <ul className="hc-list">
              <li>Clean, maintainable, and scalable systems</li>
              <li>Reproducible models with meaningful evaluation</li>
              <li>High-quality data and leakage-aware pipelines</li>
            </ul>
          </div>

          <div className="home-card">
            <p className="hc-title">What you’ll find here</p>
            <ul className="hc-list">
              <li>Selected projects with real constraints</li>
              <li>My tools and workflow</li>
              <li>Ways to contact and collaborate</li>
            </ul>
          </div>

          <div className="home-mini">
            <div className="mini-box">
              <p className="mini-k">Focus</p>
              <p className="mini-v">Software Engineer • Artificial Intelligence • Data Engineer</p>
            </div>
            <div className="mini-box">
              <p className="mini-k">Stack</p>
              <p className="mini-v">Python • Next.js • TS</p>
            </div>
            <div className="mini-box">
              <p className="mini-k">Style</p>
              <p className="mini-v">Minimalist • Clean</p>
            </div>
          </div>
        </div>
      </div>

      {/* subtle ticker to reduce “empty” feeling */}
      <div className="home-ticker" aria-hidden="true">
        <div className="home-ticker-track">
          <span>Next.js</span>
          <span>TypeScript</span>
          <span>React</span>
          <span>Python</span>
          <span>PHP</span>
          <span>Data Scraping</span>
          <span>Data Mining</span>
          <span>Data Engineering</span>
          <span>Machine Learning</span>
          <span>Artificial Intelligence</span>
          <span>Deep Learning</span>
          <span>Problem Solving</span>
        </div>
      </div>

      <style jsx>{`
        .home-hero {
          position: relative;
          transform: translate3d(var(--px, 0px), var(--py, 0px), 0);
        }

        .home-top {
          position: relative;
          z-index: 1;
        }

        .home-kicker {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 8px 12px;
          border: 1px solid var(--border);
          background: rgba(255, 255, 255, 0.04);
          border-radius: 999px;
          color: var(--muted);
          font-size: 13px;
          margin-bottom: 14px;
          backdrop-filter: blur(10px);
        }

        .dot {
          width: 8px;
          height: 8px;
          border-radius: 999px;
          background: rgba(120, 255, 200, 0.9);
          box-shadow: 0 0 0 6px rgba(120, 255, 200, 0.14);
        }

        .home-accent {
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0.95),
            rgba(170, 200, 255, 0.9)
          );
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .home-rolebar {
          display: inline-flex;
          gap: 10px;
          align-items: baseline;
          margin-top: 10px;
          padding: 10px 12px;
          border: 1px solid var(--border);
          background: rgba(255, 255, 255, 0.04);
          border-radius: 14px;
          backdrop-filter: blur(10px);
        }

        .role-label {
          color: var(--muted);
          font-size: 13px;
        }

        .role-value {
          font-weight: 700;
          letter-spacing: 0.01em;
        }

        .home-grid {
          margin-top: 18px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .home-card {
          border: 1px solid var(--border);
          background: rgba(255, 255, 255, 0.04);
          border-radius: 16px;
          padding: 14px 14px;
          backdrop-filter: blur(10px);
        }

        .hc-title {
          margin: 0 0 8px;
          font-weight: 700;
        }

        .hc-list {
          margin: 0;
          padding-left: 18px;
          color: var(--muted);
          line-height: 1.6;
        }

        .home-mini {
          grid-column: 1 / -1;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
        }

        .mini-box {
          border: 1px solid var(--border);
          background: rgba(255, 255, 255, 0.03);
          border-radius: 16px;
          padding: 12px;
        }

        .mini-k {
          margin: 0;
          font-size: 12px;
          color: var(--muted);
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .mini-v {
          margin: 6px 0 0;
          font-weight: 700;
        }

        .home-glow-wrap {
          position: absolute;
          inset: -40px -40px auto -40px;
          height: 320px;
          pointer-events: none;
          overflow: hidden;
          filter: blur(22px);
          opacity: 0.65;
          z-index: 0;
        }

        .home-glow {
          width: 260px;
          height: 260px;
          border-radius: 999px;
          background: radial-gradient(
            circle at 30% 30%,
            rgba(140, 170, 255, 0.55),
            rgba(0, 0, 0, 0)
          );
        }

        .home-ticker {
          margin-top: 18px;
          border: 1px solid var(--border);
          background: rgba(255, 255, 255, 0.03);
          border-radius: 999px;
          overflow: hidden;
        }

        .home-ticker-track {
          display: inline-flex;
          gap: 18px;
          padding: 10px 16px;
          white-space: nowrap;
          animation: ticker 18s linear infinite;
        }

        .home-ticker-track span {
          color: var(--muted);
          font-size: 13px;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        @keyframes ticker {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        @media (max-width: 900px) {
          .home-grid {
            grid-template-columns: 1fr;
          }
          .home-mini {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

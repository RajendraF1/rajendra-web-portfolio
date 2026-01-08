"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type LinkItem = {
  key: "instagram" | "whatsapp" | "tiktok" | "discord" | "github";
  name: string;
  handle: string;
  href: string;
};

const SAFE_TOP = 92; // ⬅️ jarak aman dari navbar/hitbox atas

function Icon({ name }: { name: LinkItem["key"] }) {
  if (name === "instagram") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9Zm4.5 4a4.5 4.5 0 1 1 0 9a4.5 4.5 0 0 1 0-9Zm0 2a2.5 2.5 0 1 0 0 5a2.5 2.5 0 0 0 0-5Zm5.2-.9a1 1 0 1 1-2 0a1 1 0 0 1 2 0Z"
        />
      </svg>
    );
  }
  if (name === "whatsapp") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2Zm0 2a8 8 0 0 1 0 16c-1.3 0-2.6-.3-3.8-1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 0 1 12 4Zm4.6 11.3c-.2-.1-1.2-.6-1.4-.6s-.3-.1-.5.1s-.6.6-.7.7s-.2.1-.4 0a6.5 6.5 0 0 1-1.9-1.2a7.2 7.2 0 0 1-1.3-1.6c-.1-.2 0-.3.1-.4l.4-.4c.1-.1.2-.2.3-.4c.1-.1 0-.3 0-.4l-.6-1.4c-.2-.4-.3-.4-.5-.4h-.4c-.1 0-.4.1-.6.3c-.2.2-.8.8-.8 1.9s.8 2.2.9 2.3c.1.2 1.6 2.5 3.9 3.5c.5.2.9.4 1.2.5c.5.2.9.2 1.2.1c.4-.1 1.2-.5 1.4-1c.2-.5.2-.9.1-1c0-.1-.2-.2-.4-.3Z"
        />
      </svg>
    );
  }
  if (name === "tiktok") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M16.7 2h-2.8v12.2a3.4 3.4 0 1 1-2.7-3.3V8.2a6.2 6.2 0 1 0 6.2 6.2V8.1c1.2 1 2.7 1.6 4.3 1.7V7c-1.3-.1-2.4-.7-3.1-1.6c-.6-.7-1-1.6-1.1-2.6Z"
        />
      </svg>
    );
  }
  if (name === "discord") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M19.5 5.2A14.3 14.3 0 0 0 16 4l-.4.8c-1.2-.2-2.4-.2-3.6 0l-.4-.8c-1.2.2-2.4.6-3.5 1.2C6.6 7.3 6 9.4 6 11.6c0 2.2.6 4.3 2.1 6.4c1.3 1 2.8 1.7 4.4 2l.6-1c1 .1 2 .1 3 0l.6 1c1.6-.3 3.1-1 4.4-2c1.5-2.1 2.1-4.2 2.1-6.4c0-2.2-.6-4.3-2.1-6.4ZM9.7 14.2c-.7 0-1.3-.6-1.3-1.4s.6-1.4 1.3-1.4s1.3.6 1.3 1.4s-.6 1.4-1.3 1.4Zm4.6 0c-.7 0-1.3-.6-1.3-1.4s.6-1.4 1.3-1.4s1.3.6 1.3 1.4s-.6 1.4-1.3 1.4Z"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.8c-3 .7-3.6-1.3-3.6-1.3c-.5-1.2-1.2-1.5-1.2-1.5c-1-.7.1-.7.1-.7c1.1.1 1.7 1.2 1.7 1.2c1 1.7 2.6 1.2 3.3.9c.1-.7.4-1.2.7-1.5c-2.4-.3-4.9-1.2-4.9-5.2c0-1.1.4-2 1.1-2.7c-.1-.3-.5-1.4.1-2.8c0 0 .9-.3 2.9 1.1c.8-.2 1.7-.3 2.6-.3s1.8.1 2.6.3c2-1.4 2.9-1.1 2.9-1.1c.6 1.4.2 2.5.1 2.8c.7.7 1.1 1.6 1.1 2.7c0 4-2.5 4.9-4.9 5.2c.4.3.7 1 .7 2v3c0 .3.2.6.7.5A10 10 0 0 0 12 2Z"
      />
    </svg>
  );
}

export default function ContactSection() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const orbRef = useRef<HTMLDivElement | null>(null);
  const [pulse, setPulse] = useState(0);

  const links = useMemo<LinkItem[]>(
    () => [
      {
        key: "instagram",
        name: "Instagram",
        handle: "@rajendra_firjat",
        href: "https://www.instagram.com/rajendra_firjat/",
      },
      {
        key: "whatsapp",
        name: "WhatsApp",
        handle: "+62 856-5111-9430",
        href: "https://wa.me/6285651119430",
      },
      {
        key: "tiktok",
        name: "TikTok",
        handle: "Jendraaa",
        href: "https://www.tiktok.com/@kerupuk_udang06",
      },
      {
        key: "discord",
        name: "Discord",
        handle: "rajendrafirjatullah",
        href: "https://discord.com/",
      },
      {
        key: "github",
        name: "GitHub",
        handle: "github.com/RajendraF1",
        href: "https://github.com/RajendraF1",
      },
    ],
    []
  );

  useEffect(() => {
    const wrap = wrapRef.current;
    const orb = orbRef.current;
    if (!wrap || !orb) return;

    const onMove = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect();
      const mx = (e.clientX - r.left) / Math.max(1, r.width);
      const my = (e.clientY - r.top) / Math.max(1, r.height);
      wrap.style.setProperty("--gx", `${(mx * 100).toFixed(1)}%`);
      wrap.style.setProperty("--gy", `${(my * 100).toFixed(1)}%`);
    };
    wrap.addEventListener("pointermove", onMove);

    let raf = 0;
    const start = performance.now();
    const loop = (now: number) => {
      const t = (now - start) / 1000;
      const x = 60 + Math.sin(t * 0.38) * 18;
      const y = 25 + Math.cos(t * 0.31) * 14;
      orb.style.transform = `translate3d(${x}%, ${y}%, 0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const cards = Array.from(wrap.querySelectorAll<HTMLElement>(".c-card"));
    const onCardMove = (e: PointerEvent) => {
      const el = e.currentTarget as HTMLElement;
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / Math.max(1, r.width);
      const y = (e.clientY - r.top) / Math.max(1, r.height);
      const tx = (x - 0.5) * 10;
      const ty = (y - 0.5) * 8;
      el.style.transform = `translate3d(${tx.toFixed(2)}px, ${ty.toFixed(2)}px, 0)`;
      el.style.setProperty("--cx", `${(x * 100).toFixed(1)}%`);
      el.style.setProperty("--cy", `${(y * 100).toFixed(1)}%`);
      el.classList.add("hover");
    };
    const onCardLeave = (e: PointerEvent) => {
      const el = e.currentTarget as HTMLElement;
      el.style.transform = `translate3d(0,0,0)`;
      el.classList.remove("hover");
    };
    cards.forEach((c) => {
      c.addEventListener("pointermove", onCardMove);
      c.addEventListener("pointerleave", onCardLeave);
    });

    const id = window.setInterval(() => setPulse((p) => p + 1), 950);

    return () => {
      wrap.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
      cards.forEach((c) => {
        c.removeEventListener("pointermove", onCardMove);
        c.removeEventListener("pointerleave", onCardLeave);
      });
      window.clearInterval(id);
    };
  }, []);

  return (
    <div ref={wrapRef} className="contact">
      <div className="spot" aria-hidden="true" />
      <div className="orb-wrap" aria-hidden="true">
        <div ref={orbRef} className="orb" />
      </div>

      <div className="content">
        <div className="head">
          <h1 className="title">Contact</h1>
          <p className="subtitle">
            Choose a platform. I’m open to collaboration, internships, and project discussions.
          </p>

          {/* Decorative strip to fill space */}
          <div className="strip" aria-hidden="true">
            {["Open to collab", "Fast reply", "Projects", "Code", "Ideas"].map((t) => (
              <span key={t} className="pill">
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="grid">
          {links.map((l, i) => {
            const hot = (pulse + i) % links.length === 0;
            return (
              <a
                key={l.key}
                className={`c-card ${hot ? "hot" : ""}`}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                onPointerDownCapture={(e) => e.stopPropagation()}
                onClickCapture={(e) => e.stopPropagation()}
              >
                <div className="row">
                  <div className="icon">
                    <Icon name={l.key} />
                  </div>
                  <div className="text">
                    <div className="name">{l.name}</div>
                    <div className="handle">{l.handle}</div>
                  </div>
                </div>

                <span className="glow" aria-hidden="true" />
              </a>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .contact {
          height: 100%;
          position: relative;
          padding-top: ${SAFE_TOP}px; /* ✅ jauh dari navbar */
          display: grid;
          place-items: center;
        }

        .spot,
        .orb-wrap,
        .orb,
        .glow {
          pointer-events: none;
        }

        .spot {
          position: absolute;
          inset: -140px;
          opacity: 0.6;
          filter: blur(28px);
          background: radial-gradient(
            520px 380px at var(--gx, 50%) var(--gy, 50%),
            rgba(255, 255, 255, 0.14),
            rgba(255, 255, 255, 0)
          );
          z-index: 0;
        }

        .orb-wrap {
          position: absolute;
          inset: -120px -120px auto -120px;
          height: 360px;
          filter: blur(22px);
          opacity: 0.5;
          z-index: 0;
        }

        .orb {
          width: 360px;
          height: 360px;
          border-radius: 999px;
          background: radial-gradient(
            circle at 30% 30%,
            rgba(0, 209, 255, 0.22),
            rgba(0, 0, 0, 0)
          );
        }

        .content {
          width: min(980px, 100%);
          padding: 0 18px 20px;
          position: relative;
          z-index: 2;
          isolation: isolate;
        }

        .head {
          border: 1px solid var(--border);
          background: rgba(255, 255, 255, 0.04);
          border-radius: 22px;
          padding: 16px;
          backdrop-filter: blur(10px);
        }

        .strip {
          margin-top: 12px;
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .pill {
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: rgba(255, 255, 255, 0.03);
          border-radius: 999px;
          padding: 6px 10px;
          color: rgba(255, 255, 255, 0.72);
          font-weight: 800;
          font-size: 12px;
          letter-spacing: 0.02em;
        }

        .grid {
          margin-top: 14px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }

        .c-card {
          position: relative;
          z-index: 5;
          border: 1px solid var(--border);
          background: rgba(255, 255, 255, 0.04);
          border-radius: 22px;
          padding: 16px;
          text-decoration: none;
          color: inherit;
          overflow: hidden;
          backdrop-filter: blur(10px);
          min-height: 120px;
          display: grid;
          align-content: center;
          transition: background 180ms ease, border-color 180ms ease;
          will-change: transform;
        }

        .c-card:hover {
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(255, 255, 255, 0.18);
        }

        .row {
          display: grid;
          grid-template-columns: 54px 1fr;
          gap: 12px;
          align-items: center;
        }

        .icon {
          width: 54px;
          height: 54px;
          border-radius: 18px;
          border: 1px solid rgba(255, 255, 255, 0.14);
          background: rgba(255, 255, 255, 0.03);
          display: grid;
          place-items: center;
          color: rgba(255, 255, 255, 0.92);
        }

        .icon svg {
          width: 26px;
          height: 26px;
        }

        .name {
          font-weight: 950;
          letter-spacing: 0.01em;
          font-size: 14px;
        }

        .handle {
          margin-top: 4px;
          color: var(--muted);
          font-weight: 700;
          font-size: 13px;
          line-height: 1.25;
        }

        .glow {
          position: absolute;
          inset: -90px;
          opacity: 0;
          transition: opacity 160ms ease;
          background: radial-gradient(
            360px 260px at var(--cx, 50%) var(--cy, 50%),
            rgba(255, 255, 255, 0.14),
            rgba(255, 255, 255, 0)
          );
        }

        .c-card.hover .glow {
          opacity: 1;
        }

        .c-card.hot {
          border-color: rgba(255, 255, 255, 0.26);
          box-shadow: 0 0 0 6px rgba(255, 255, 255, 0.03);
        }

        @media (max-width: 900px) {
          .grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 560px) {
          .grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

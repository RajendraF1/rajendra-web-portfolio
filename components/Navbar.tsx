"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type NavItem = { id: string; label: string };

export default function Navbar({
  items,
  activeId,
  onNavigate,
}: {
  items: NavItem[];
  activeId: string;
  onNavigate: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  const activeLabel = useMemo(
    () => items.find((x) => x.id === activeId)?.label ?? "Menu",
    [items, activeId]
  );

  // close when clicking outside
  useEffect(() => {
    const onDown = (e: MouseEvent | TouchEvent) => {
      const root = rootRef.current;
      if (!root) return;
      const t = e.target as Node | null;
      if (t && !root.contains(t)) setOpen(false);
    };

    document.addEventListener("mousedown", onDown);
    document.addEventListener("touchstart", onDown, { passive: true });

    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("touchstart", onDown as any);
    };
  }, []);

  // close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handleItemClick = (id: string) => {
    setOpen(false);
    onNavigate(id);
  };

  return (
    <div ref={rootRef} className="nav">
      <button
        className="nav-pill"
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="nav-brand">Rajendra Firjatullah</span>
        <span className="nav-sep" aria-hidden="true" />
        <span className="nav-current">{activeLabel}</span>
        <span className={`nav-caret ${open ? "open" : ""}`} aria-hidden="true">
          ▾
        </span>
      </button>

      <div className={`nav-panel ${open ? "open" : ""}`} role="menu">
        {items.map((it) => (
          <button
            key={it.id}
            type="button"
            role="menuitem"
            className={`nav-item ${it.id === activeId ? "active" : ""}`}
            onClick={() => handleItemClick(it.id)}
          >
            <span className="nav-item-label">{it.label}</span>
            {it.id === activeId ? <span className="nav-chip">Now</span> : null}
          </button>
        ))}
      </div>

      <style jsx>{`
        .nav {
          position: fixed;
          top: 16px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 60;
          user-select: none;
        }

        .nav-pill {
          appearance: none;
          border: 1px solid var(--border);
          background: rgba(0, 0, 0, 0.38);
          color: var(--text);
          border-radius: 999px;
          padding: 10px 12px;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          backdrop-filter: blur(12px);
          cursor: pointer;
        }

        .nav-pill:hover {
          background: rgba(0, 0, 0, 0.46);
        }

        .nav-brand {
          font-weight: 800;
          letter-spacing: 0.02em;
        }

        .nav-sep {
          width: 1px;
          height: 14px;
          background: var(--border);
          display: inline-block;
        }

        .nav-current {
          color: var(--muted);
          font-size: 13px;
          max-width: 48vw;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .nav-caret {
          color: var(--muted);
          transition: transform 180ms ease;
        }
        .nav-caret.open {
          transform: rotate(180deg);
        }

        .nav-panel {
          margin-top: 10px;
          opacity: 0;
          transform: translateY(-6px);
          pointer-events: none;
          transition: 180ms ease;
          padding: 8px;
          border-radius: 16px;
          border: 1px solid var(--border);
          background: rgba(0, 0, 0, 0.42);
          backdrop-filter: blur(12px);
          display: grid;
          gap: 6px;
          min-width: min(420px, 92vw);
        }

        .nav-panel.open {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }

        .nav-item {
          text-align: left;
          cursor: pointer;
          border: 1px solid transparent;
          background: rgba(255, 255, 255, 0.03);
          color: var(--muted);
          border-radius: 14px;
          padding: 10px 12px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
        }

        .nav-item:hover {
          background: rgba(255, 255, 255, 0.06);
          color: var(--text);
        }

        .nav-item.active {
          border-color: rgba(255, 255, 255, 0.14);
          background: rgba(255, 255, 255, 0.08);
          color: var(--text);
        }

        .nav-item-label {
          font-size: 14px;
        }

        .nav-chip {
          font-size: 12px;
          padding: 2px 8px;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.16);
          background: rgba(255, 255, 255, 0.06);
          color: var(--text);
        }

        @media (max-width: 480px) {
          .nav {
            top: 12px;
          }
          .nav-pill {
            padding: 9px 10px;
          }
          .nav-brand {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}

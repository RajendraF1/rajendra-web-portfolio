"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Project = {
  id: string;
  title: string;
  role: string;
  stack: string[];
  summary: string;
  images: { src: string; alt: string }[];
  details: {
    overview: string;
    problem: string;
    solution: string;
    highlights: string[];
    links?: { label: string; href: string }[];
  };
};

export default function ProjectsSection() {
  const projects = useMemo<Project[]>(
    () => [
      {
        id: "scraper-pipeline",
        title: "X Account Classification (SLP Binary)",
        role: "Machine Learning / Binary Classification",
        stack: ["Python", "Scikit-Learn", "Pandas", "NumPy"],
        summary:
          "Binary classification of fake vs non-fake Platform X accounts using Single Layer Perceptron with feature engineering and MinMax scaling.",
        images: [
          { src: "/projects/SLP-1.png", alt: "Feature engineering and scaling overview" },
          { src: "/projects/SLP-2.png", alt: "Cross-validation and accuracy results" },
          { src: "/projects/SLP-3.png", alt: "Cross-validation and accuracy results" },
        ],
        details: {
          overview:
            "A baseline fake-account detection project for Platform X using a Single Layer Perceptron (implemented via Scikit-Learn MLPClassifier with hidden_layer_sizes=()). The workflow covers preprocessing, scaling, cross-validation, and model interpretability through feature weights.",
          problem:
            "Profile metadata signals are heterogeneous (counts, booleans, text presence) and can be noisy; without proper preprocessing the classifier becomes unstable and hard to evaluate objectively.",
          solution:
            "Engineered profile-level features (e.g., description length, account age, language encoding, location availability), applied MinMax scaling to numeric fields, trained an SLP model with stratified cross-validation, then evaluated performance on a held-out test set and inspected feature coefficients.",
          highlights: [
            "Feature engineering: location_available, lang_encode, desc_len, account_age_days",
            "MinMax scaling for count-based features (followers, friends, posts, etc.)",
            "Single Layer Perceptron via MLPClassifier(hidden_layer_sizes=(), activation='logistic')",
            "Stability check using StratifiedKFold cross-validation (cv=5)",
            "Train vs test evaluation + automatic overfitting gap analysis",
            "Feature influence inspection using model coefficients (coefs_)",
          ],
          links: [{ label: "GitHub", href: "https://github.com/RajendraF1/fake-account-classification-x-perceptron" }],
        },
      },
      {
        id: "ai-notes",
        title: "Weather Condition Classification (MLP / JST)",
        role: "Machine Learning / Data Engineering",
        stack: ["Python", "Scikit-Learn", "Pandas", "NumPy"],
        summary: "Classifies weather conditions using an MLP model with scaling, iterative imputation, and cyclic wind-direction encoding.",
        images: [
          { src: "/projects/MLP-1.png", alt: "Notes list" },
          { src: "/projects/MLP-2.png", alt: "Search and tags" },
          { src: "/projects/MLP-3.png", alt: "Search and tags" },
        ],
        details: {
          overview:
            "An end-to-end weather condition classification pipeline using a Multilayer Perceptron (MLP). The workflow includes feature encoding, normalization, missing-value handling, and evaluation across multiple train-test split configurations.",
          problem:
            "Weather data often contains missing values and categorical fields (e.g., cloud cover, wind direction) that require careful encoding; additionally, the relationship between meteorological variables and weather conditions is non-linear.",
          solution:
            "Built a preprocessing pipeline with StandardScaler (fit on train), IterativeImputer for missing values, ordinal encoding for cloud cover, and cyclic encoding (sin/cos) for wind direction, then trained an MLPClassifier and evaluated it using standard classification metrics.",
          highlights: [
            "Multiple split experiments (50/50, 60/40, 70/30) for comparison",
            "Standardization (train-fit, test-transform) to prevent data leakage",
            "IterativeImputer for robust missing-value imputation",
            "Ordinal encoding for cloud cover + cyclic encoding for wind direction (sin/cos)",
            "Evaluation with accuracy, classification report, and confusion matrix",
          ],
          links: [{ label: "GitHub", href: "https://github.com/RajendraF1/weather-prediction-using-mlp" }],
        },
      },
      {
        id: "dashboard",
        title: "Traffic Sign Classification (CNN / ResNet50)",
        role: "Computer Vision / Deep Learning",
        stack: ["Python", "PyTorch", "Torchvision", "Pandas", "NumPy"],
        summary:
          "Traffic sign image classification using ROI cropping and ResNet50 transfer learning with head training + fine-tuning.",
        images: [
          { src: "/projects/CNN-1.png", alt: "ROI crop preview (traffic sign focus)" },
          { src: "/projects/CNN-2.png", alt: "Training curves and validation accuracy" },
          { src: "/projects/CNN-3.png", alt: "Training curves and validation accuracy" },
        ],
        details: {
          overview:
            "A multi-class traffic sign recognition project (43 classes) built with a CNN approach using transfer learning. The pipeline loads GTSRB-style metadata, crops the Region of Interest (ROI) from each image, applies augmentation, then trains a ResNet50 model in two stages (head-only then fine-tuning).",
          problem:
            "Traffic sign images vary in scale, lighting, and background clutter; without focusing on the sign region (ROI), the model can learn irrelevant features and degrade classification accuracy.",
          solution:
            "Parsed ROI coordinates from label CSV files, cropped sign regions with a configurable margin, applied ImageNet normalization and augmentation, then trained a ResNet50-based classifier using head training followed by fine-tuning (layer4 + fc) for improved generalization.",
          highlights: [
            "GTSRB-style dataset loader with CSV ROI parsing (x1,y1,x2,y2) and labels (43 classes)",
            "ROI cropping with extra margin to reduce background noise while keeping context",
            "Image augmentation (ColorJitter) + ImageNet normalization",
            "Transfer learning: ResNet50 pretrained (ImageNet1K_V2) + custom FC for 43 classes",
            "Two-stage training: freeze all except FC (head) → fine-tune layer4 + FC",
            "Evaluation with accuracy, classification report, and confusion matrix",
            "Best-checkpoint saving (best_resnet50_roi.pt)",
          ],
          links: [{ label: "GitHub", href: "https://github.com/RajendraF1/traffic-sign-classification-using-cnn" }],
        },
      },

    ],
    []
  );

  const [activeId, setActiveId] = useState<string | null>(null);
  const activeProject = useMemo(
    () => projects.find((p) => p.id === activeId) ?? null,
    [projects, activeId]
  );

  // ---------- Hover JS animation (tilt + glow following pointer) ----------
  const gridRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const cards = Array.from(grid.querySelectorAll<HTMLElement>(".p-card"));

    const onMove = (e: PointerEvent) => {
      const el = e.currentTarget as HTMLElement;
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / Math.max(1, r.width);
      const y = (e.clientY - r.top) / Math.max(1, r.height);

      // tilt very subtle
      const rx = (0.5 - y) * 6; // deg
      const ry = (x - 0.5) * 8; // deg

      el.style.setProperty("--rx", `${rx.toFixed(2)}deg`);
      el.style.setProperty("--ry", `${ry.toFixed(2)}deg`);
      el.style.setProperty("--gx", `${(x * 100).toFixed(1)}%`);
      el.style.setProperty("--gy", `${(y * 100).toFixed(1)}%`);
      el.classList.add("is-hover");
    };

    const onLeave = (e: PointerEvent) => {
      const el = e.currentTarget as HTMLElement;
      el.classList.remove("is-hover");
      el.style.setProperty("--rx", `0deg`);
      el.style.setProperty("--ry", `0deg`);
    };

    cards.forEach((c) => {
      c.addEventListener("pointermove", onMove);
      c.addEventListener("pointerleave", onLeave);
    });

    return () => {
      cards.forEach((c) => {
        c.removeEventListener("pointermove", onMove);
        c.removeEventListener("pointerleave", onLeave);
      });
    };
  }, []);

  // ---------- Modal controls ----------
  const close = () => setActiveId(null);

  useEffect(() => {
    // set global modal flag
    (window as any).__MODAL_OPEN__ = !!activeId;

    if (!activeId) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);

    // lock background scroll
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;

      // unset modal flag on cleanup
      (window as any).__MODAL_OPEN__ = false;
    };
  }, [activeId]);

  return (
    <div className="frame-scroll projects">
      <div className="head">
        <h1 className="title">Projects</h1>
        <p className="subtitle">
          Click a project card to open a full details view (screenshots, highlights, links).
        </p>
      </div>

      <div ref={gridRef} className="grid">
        {projects.map((p) => (
          <button
            key={p.id}
            type="button"
            className="p-card"
            onClick={() => setActiveId(p.id)}
            aria-label={`Open project: ${p.title}`}
          >
            <div className="p-top">
              <h3 className="p-title">{p.title}</h3>
              <p className="p-meta">
                <span className="pill">{p.role}</span>
                <span className="dot" aria-hidden="true" />
                <span className="stack">{p.stack.join(" • ")}</span>
              </p>
              <p className="p-summary">{p.summary}</p>
            </div>

            <div className="p-hint" aria-hidden="true">
              Click to view details
            </div>

            {/* glow layer */}
            <span className="p-glow" aria-hidden="true" />
          </button>
        ))}
      </div>

      {/* FULL-FRAME MODAL */}
      {activeProject ? (
        <div className="modal" role="dialog" aria-modal="true" aria-label="Project details">
          <div className="backdrop" onClick={close} />

          <div className="sheet"
               role="document"
               onWheelCapture={(e) => e.stopPropagation()}
               onTouchMoveCapture={(e) => e.stopPropagation()}>
            <div className="sheet-head">
              <div className="sheet-title">
                <h2>{activeProject.title}</h2>
                <p className="sheet-sub">
                  {activeProject.role} • {activeProject.stack.join(" • ")}
                </p>
              </div>

              <button type="button" className="close" onClick={close} aria-label="Close">
                ✕
              </button>
            </div>

            <div className="sheet-body"
              onWheelCapture={(e) => e.stopPropagation()}
              onTouchMoveCapture={(e) => e.stopPropagation()}>
              {/* Gallery */}
              <div className="gallery">
                {activeProject.images.length ? (
                  activeProject.images.map((img) => (
                    <div key={img.src} className="shot">
                      <img src={img.src} alt={img.alt} />
                    </div>
                  ))
                ) : (
                  <div className="shot placeholder">
                    <p>No screenshots yet.</p>
                    <p className="muted">Put images in public/projects/</p>
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="details">
                <section className="block">
                  <p className="label">Overview</p>
                  <p className="text">{activeProject.details.overview}</p>
                </section>

                <div className="two">
                  <section className="block">
                    <p className="label">Problem</p>
                    <p className="text">{activeProject.details.problem}</p>
                  </section>
                  <section className="block">
                    <p className="label">Solution</p>
                    <p className="text">{activeProject.details.solution}</p>
                  </section>
                </div>

                <section className="block">
                  <p className="label">Highlights</p>
                  <ul className="list">
                    {activeProject.details.highlights.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                </section>

                {activeProject.details.links?.length ? (
                  <section className="block">
                    <p className="label">Links</p>
                    <div className="links">
                      {activeProject.details.links.map((l) => (
                        <a key={l.label} className="link" href={l.href} target="_blank" rel="noreferrer">
                          {l.label} →
                        </a>
                      ))}
                    </div>
                  </section>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <style jsx>{`
        .projects {
          position: relative;
        }

        .head {
          margin-bottom: 14px;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          align-items: start;
        }

        /* CARD (clickable) */
        .p-card {
          position: relative;
          text-align: left;
          border: 1px solid var(--border);
          background: rgba(255, 255, 255, 0.04);
          border-radius: 18px;
          padding: 14px;
          color: inherit;
          cursor: pointer;
          overflow: hidden;
          transform: perspective(900px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg));
          transition: transform 140ms ease, background 160ms ease, border-color 160ms ease;
          backdrop-filter: blur(10px);
        }

        .p-card:hover {
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(255, 255, 255, 0.18);
        }

        .p-card.is-hover {
          transform: perspective(900px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))
            translateY(-2px);
        }

        .p-glow {
          position: absolute;
          inset: -60px;
          pointer-events: none;
          opacity: 0;
          transition: opacity 160ms ease;
          background: radial-gradient(
            340px 240px at var(--gx, 50%) var(--gy, 50%),
            rgba(255, 255, 255, 0.12),
            rgba(255, 255, 255, 0)
          );
        }

        .p-card.is-hover .p-glow {
          opacity: 1;
        }

        .p-title {
          margin: 0;
          font-size: 16px;
          font-weight: 900;
          letter-spacing: 0.01em;
        }

        .p-meta {
          margin: 8px 0 0;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 8px;
          color: var(--muted);
          font-size: 13px;
        }

        .pill {
          border: 1px solid rgba(255, 255, 255, 0.14);
          background: rgba(255, 255, 255, 0.03);
          padding: 3px 10px;
          border-radius: 999px;
          color: var(--text);
          font-size: 12px;
          font-weight: 800;
        }

        .dot {
          width: 4px;
          height: 4px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.22);
          display: inline-block;
        }

        .stack {
          line-height: 1.4;
        }

        .p-summary {
          margin: 10px 0 0;
          color: var(--muted);
          line-height: 1.6;
        }

        /* hint appears on hover/focus */
        .p-hint {
          margin-top: 12px;
          color: rgba(255, 255, 255, 0.72);
          font-weight: 800;
          font-size: 12px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          opacity: 0.55;
          transition: opacity 160ms ease, transform 160ms ease;
          transform: translateY(2px);
        }

        .p-card:hover .p-hint,
        .p-card:focus-visible .p-hint {
          opacity: 0.95;
          transform: translateY(0);
        }

        /* MODAL full-frame */
        .modal {
          position: fixed;
          inset: 0;
          z-index: 80;
          display: grid;
          place-items: center;
        }

        .backdrop {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.55);
          backdrop-filter: blur(6px);
          animation: fadeIn 160ms ease both;
        }

        .sheet {
          position: relative;
          width: min(980px, 92vw);
          height: min(82vh, 760px);
          border-radius: 22px;
          border: 1px solid rgba(255, 255, 255, 0.16);
          background: rgba(10, 10, 10, 0.72);
          backdrop-filter: blur(12px);
          overflow: hidden;
          animation: popIn 200ms ease both;
        }

        .sheet-head {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 12px;
          padding: 14px 14px 10px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .sheet-title h2 {
          margin: 0;
          font-size: 18px;
          font-weight: 950;
          letter-spacing: 0.01em;
        }

        .sheet-sub {
          margin: 6px 0 0;
          color: var(--muted);
          line-height: 1.4;
          font-size: 13px;
        }

        .close {
          border: 1px solid rgba(255, 255, 255, 0.16);
          background: rgba(255, 255, 255, 0.06);
          color: var(--text);
          border-radius: 14px;
          padding: 8px 10px;
          cursor: pointer;
          transition: transform 160ms ease, background 160ms ease;
        }

        .close:hover {
          transform: translateY(-1px);
          background: rgba(255, 255, 255, 0.1);
        }

        .sheet-body {
          height: calc(100% - 58px);
          overflow: auto;
          padding: 14px;
          display: grid;
          grid-template-columns: 1.05fr 0.95fr;
          gap: 14px;
          overscroll-behavior: contain;
          -webkit-overflow-scrolling: touch;
        }

        .gallery {
          display: grid;
          grid-template-columns: 1fr;
          gap: 10px;
          align-content: start;
        }

        .shot {
          border-radius: 18px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: rgba(255, 255, 255, 0.03);
          height: 210px;
        }

        .shot img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .shot.placeholder {
          display: grid;
          place-items: center;
          text-align: center;
          padding: 18px;
        }

        .muted {
          color: var(--muted);
          margin: 6px 0 0;
        }

        .details {
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: rgba(255, 255, 255, 0.03);
          border-radius: 18px;
          padding: 14px;
          align-content: start;
          display: grid;
          gap: 12px;
        }

        .block .label {
          margin: 0 0 6px;
          font-size: 12px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--muted);
        }

        .block .text {
          margin: 0;
          color: rgba(255, 255, 255, 0.9);
          line-height: 1.65;
        }

        .two {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .list {
          margin: 0;
          padding-left: 18px;
          color: var(--muted);
          line-height: 1.6;
        }

        .links {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          border: 1px solid rgba(255, 255, 255, 0.16);
          background: rgba(255, 255, 255, 0.05);
          color: var(--text);
          padding: 8px 10px;
          border-radius: 14px;
          text-decoration: none;
          font-weight: 800;
          font-size: 13px;
          transition: transform 160ms ease, background 160ms ease;
        }

        .link:hover {
          transform: translateY(-1px);
          background: rgba(255, 255, 255, 0.09);
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes popIn {
          from {
            opacity: 0;
            transform: translateY(8px) scale(0.985);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @media (max-width: 980px) {
          .grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 760px) {
          .sheet-body {
            grid-template-columns: 1fr;
          }
          .two {
            grid-template-columns: 1fr;
          }
          .shot {
            height: 190px;
          }
        }

        @media (max-width: 560px) {
          .grid {
            grid-template-columns: 1fr;
          }
          .sheet {
            width: 94vw;
            height: 86vh;
          }
        }
      `}</style>
    </div>
  );
}

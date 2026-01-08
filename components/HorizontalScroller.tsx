"use client";

import { useEffect, useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import { SECTION_REGISTRY, type SectionKey } from "@/components/sections/registry";

type SectionDef = {
  id: SectionKey;
  label: string;
  bgClass: string; // "bg-0".."bg-4"
};

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

function canScrollVertically(el: HTMLElement, deltaY: number) {
  const max = el.scrollHeight - el.clientHeight;
  if (max <= 0) return false;
  if (deltaY > 0) return el.scrollTop < max - 1;
  return el.scrollTop > 1;
}

export default function HorizontalScroller({ sections }: { sections: SectionDef[] }) {
  const navItems = useMemo(
    () => sections.map((s) => ({ id: s.id, label: s.label })),
    [sections]
  );

  const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? "home");

  // Navbar click: jump to selected slide
  const navigateTo = (id: string) => {
    const idx = sections.findIndex((s) => s.id === id);
    if (idx < 0) return;
    const vw = window.innerWidth || 1;
    window.scrollTo({ top: idx * vw, behavior: "smooth" });
  };

  useEffect(() => {
    const root = document.documentElement;
    const track = document.querySelector<HTMLElement>(".h-track");
    const secEls = Array.from(document.querySelectorAll<HTMLElement>(".h-section"));
    if (!track || secEls.length === 0) return;

    const N = secEls.length;

    // ===== sizing: tinggi halaman vertikal bertingkat sesuai jumlah slide =====
    const setSizes = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      // 1 slide = 1 langkah vertikal sebesar vw
      const scrollH = (N - 1) * vw + vh;
      root.style.setProperty("--scroll-h", `${scrollH}px`);

      // refresh transform saat resize
      onScroll();
      updateIndexFromScroll();
    };

    // ===== translate horizontal sesuai scrollY =====
    let raf = 0;

    const updateActiveFromIndex = (idx: number) => {
      const safe = clamp(idx, 0, N - 1);
      secEls.forEach((el, i) => el.classList.toggle("is-active", i === safe));
      setActiveId(secEls[safe]?.id || sections[0]?.id || "home");
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const vw = window.innerWidth || 1;
        const maxX = (N - 1) * vw;

        const y = window.scrollY;
        const x = clamp(y, 0, maxX);

        track.style.transform = `translate3d(${-x}px, 0, 0)`;

        const idx = Math.round(x / vw);
        updateActiveFromIndex(idx);
      });
    };

    // ===== index helper =====
    let currentIndex = 0;

    const updateIndexFromScroll = () => {
      const vw = window.innerWidth || 1;
      currentIndex = clamp(Math.round(window.scrollY / vw), 0, N - 1);
    };

    const goToIndex = (idx: number) => {
      const vw = window.innerWidth || 1;
      window.scrollTo({ top: idx * vw, behavior: "smooth" });
    };

    // ===== One-Gesture-One-Slide (anti queue) =====
    // Lock berbasis gesture: wheel pertama memicu perpindahan, wheel berikutnya diabaikan
    // sampai wheel berhenti selama COOLDOWN ms.
    let locked = false;
    let unlockTimer: number | null = null;
    const COOLDOWN = 220; // naikkan 260-300 jika trackpad super sensitif

    const lockForGesture = () => {
      locked = true;
      if (unlockTimer) window.clearTimeout(unlockTimer);
      unlockTimer = window.setTimeout(() => {
        locked = false;
        unlockTimer = null;
      }, COOLDOWN);
    };

    const onWheel = (e: WheelEvent) => {
      if ((window as any).__MODAL_OPEN__) {
        return;
      }
      const target = e.target as HTMLElement | null;

      // (A) kalau wheel terjadi di area konten yang bisa di-scroll (frame-scroll),
      // biarkan scroll di dalam frame dulu sampai mentok.
      const innerScroller = target?.closest?.(".frame-scroll") as HTMLElement | null;
      if (innerScroller && canScrollVertically(innerScroller, e.deltaY)) {
        return;
      }

      // (B) selain itu, kita pakai slide-step
      e.preventDefault();

      if (locked) {
        lockForGesture(); // perpanjang lock selama wheel masih mengalir
        return;
      }

      lockForGesture();
      updateIndexFromScroll();

      const dir = e.deltaY > 0 ? 1 : -1;
      const next = clamp(currentIndex + dir, 0, N - 1);
      if (next !== currentIndex) goToIndex(next);
    };

    // ===== Touch support (mobile): swipe up/down -> 1 slide =====
    let touchStartY = 0;
    let touchTriggered = false;

    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0]?.clientY ?? 0;
      touchTriggered = false;
    };

    const onTouchMove = (e: TouchEvent) => {
      const target = e.target as HTMLElement | null;

      // kalau sedang di frame-scroll, biarkan native scroll
      const innerScroller = target?.closest?.(".frame-scroll") as HTMLElement | null;
      if (innerScroller) return;

      if (touchTriggered) return;

      const y = e.touches[0]?.clientY ?? 0;
      const dy = touchStartY - y;

      // threshold swipe
      if (Math.abs(dy) < 44) return;

      touchTriggered = true;
      updateIndexFromScroll();

      const dir = dy > 0 ? 1 : -1;
      const next = clamp(currentIndex + dir, 0, N - 1);
      if (next !== currentIndex) goToIndex(next);
    };

    // init
    setSizes();
    updateIndexFromScroll();
    onScroll();
    updateActiveFromIndex(currentIndex);

    window.addEventListener("resize", setSizes);
    window.addEventListener(
      "scroll",
      () => {
        onScroll();
        updateIndexFromScroll();
      },
      { passive: true }
    );

    // passive:false agar preventDefault bekerja
    window.addEventListener("wheel", onWheel, { passive: false });

    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    return () => {
      window.removeEventListener("resize", setSizes);
      window.removeEventListener("wheel", onWheel as any);
      window.removeEventListener("touchstart", onTouchStart as any);
      window.removeEventListener("touchmove", onTouchMove as any);
      cancelAnimationFrame(raf);
      if (unlockTimer) window.clearTimeout(unlockTimer);
    };
  }, [sections]);

  return (
    <>
      <Navbar items={navItems} activeId={activeId} onNavigate={navigateTo} />

      <div className="v-spacer" aria-hidden="true" />

      <main className="h-wrap" aria-label="Vertical scroll input, horizontal slide">
        <div className="h-track">
          {sections.map((s) => {
            const Comp = SECTION_REGISTRY[s.id];
            return (
              <section key={s.id} id={s.id} className={`h-section ${s.bgClass}`}>
                <div className="content">
                  <Comp />
                </div>
              </section>
            );
          })}
        </div>
      </main>
    </>
  );
}

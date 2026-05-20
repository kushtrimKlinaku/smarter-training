"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const CATEGORY_STYLES = [
  { id: "lidership", number: "01", title: "Lidershipë & Biznes", color: "#D4753A", bg: "#1a1a1a", light: false },
  { id: "kreativitet", number: "02", title: "Kreativitet & Dizajn", color: "#ffffff", bg: "#2D4A3E", light: false },
  { id: "zhvillim", number: "03", title: "Zhvillim Personal", color: "#D4753A", bg: "#F5F0EB", light: true },
  { id: "shitje", number: "04", title: "Shitje & Shërbime", color: "#ffffff", bg: "#1a1a1a", light: false },
  { id: "teknologji", number: "05", title: "Teknologji", color: "#ffffff", bg: "#2D4A3E", light: false },
];

export default function ProgramsHorizontalScroll({ initialPrograms = [] }: { initialPrograms?: any[] }) {
  // outerRef  — tall div in normal flow (gives scroll distance)
  // stickyRef — CSS sticky viewport (React never moves this)
  // trackRef  — the row of cards that GSAP slides left
  const outerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Group programs by category from CMS, fallback to empty array for undefined categories
  const mappedCategories = CATEGORY_STYLES.map(style => ({
    ...style,
    programs: initialPrograms
      .filter((p) => p.category === style.title)
      .map((p) => p.title),
  })).filter(cat => cat.programs.length > 0); // Only show categories with at least 1 program
  
  // For development only, if DB is empty, use some fallback data so UI doesn't break
  const displayCategories = mappedCategories.length > 0 ? mappedCategories : CATEGORY_STYLES.map(style => ({
    ...style,
    programs: ["Program shembull 1", "Program shembull 2"]
  }));

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const outer = outerRef.current;
    const sticky = stickyRef.current;
    const track = trackRef.current;
    if (!outer || !sticky || !track) return;

    // How far the track must move left
    const getScrollAmount = () => -(track.scrollWidth - sticky.offsetWidth);

    // Set outer height = 100vh (sticky frame) + total horizontal distance
    const setOuterHeight = () => {
      outer.style.height = `calc(100vh + ${Math.abs(getScrollAmount())}px)`;
    };
    setOuterHeight();

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: outer,          // scroll distance comes from outer
          start: "top top",
          end: () => `+=${Math.abs(getScrollAmount())}`,
          scrub: 1.2,
          invalidateOnRefresh: true,
          onRefresh: setOuterHeight, // recalc height on resize
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    /* ── OUTER: tall div, determines scroll distance ── */
    <div ref={outerRef} className="relative bg-white">

      {/* ── STICKY: 100vh viewport, CSS sticky — React never moves this ── */}
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen overflow-hidden bg-white"
      >
        {/* Header bar */}
        <div className="absolute top-0 left-0 right-0 z-20 flex items-end justify-between px-8 lg:px-16 pt-12 pb-5 bg-white/95 backdrop-blur-sm">
          <div>
            <p className="text-sm font-semibold tracking-widest uppercase text-[#D4753A] mb-2">
              Programet tona
            </p>
            <h2
              className="font-bold text-[#1a1a1a] tracking-tight leading-none"
              style={{ fontSize: "clamp(28px,4vw,52px)" }}
            >
              20+ programe trajnimi
            </h2>
          </div>
          <div className="hidden lg:flex items-center gap-3 text-[15px] text-[#999] font-medium pb-1">
            <span>Scrollo horizontalisht</span>
            <svg
              width="36"
              height="16"
              viewBox="0 0 36 16"
              fill="none"
              className="text-[#D4753A]"
            >
              <path
                d="M0 8h32M26 2l8 6-8 6"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* ── TRACK: slides left via GSAP ── */}
        <div
          ref={trackRef}
          className="absolute top-0 left-0 h-full flex items-center pt-[110px] pb-8 pl-8 lg:pl-16 gap-5"
          style={{ width: "max-content", willChange: "transform" }}
        >
          {displayCategories.map((cat) => (
            <div
              key={cat.id}
              className="flex-shrink-0 flex flex-col justify-between p-12 relative overflow-hidden"
              style={{
                background: cat.bg,
                width: "clamp(300px, 46vw, 800px)",
                height: "calc(100vh - 160px)",
              }}
            >
              {/* Watermark number */}
              <span
                className="absolute bottom-4 right-6 font-black select-none pointer-events-none leading-none"
                style={{
                  fontSize: "clamp(80px,12vw,160px)",
                  color: cat.light
                    ? "rgba(0,0,0,0.04)"
                    : "rgba(255,255,255,0.04)",
                }}
              >
                {cat.number}
              </span>

              {/* Top */}
              <div>
                <span
                  className="inline-block font-semibold tracking-widest uppercase mb-8 px-4 py-1.5"
                  style={{
                    fontSize: "13px",
                    color: cat.light ? "#D4753A" : cat.color,
                    border: `1px solid ${
                      cat.light ? "#D4753A" : "rgba(255,255,255,0.25)"
                    }`,
                  }}
                >
                  {cat.number}
                </span>

                <h3
                  className="font-bold leading-tight mb-10 tracking-tight"
                  style={{
                    fontSize: "clamp(26px,3.2vw,44px)",
                    color: cat.light ? "#1a1a1a" : cat.color,
                  }}
                >
                  {cat.title}
                </h3>

                <ul className="space-y-4">
                  {cat.programs.map((program) => (
                    <li key={program} className="flex items-start gap-4">
                      <span
                        className="mt-[9px] w-2 h-2 rounded-full flex-shrink-0"
                        style={{ background: "#D4753A" }}
                      />
                      <span
                        className="font-medium leading-snug"
                        style={{
                          fontSize: "clamp(15px,1.4vw,19px)",
                          color: cat.light
                            ? "#444"
                            : "rgba(255,255,255,0.82)",
                        }}
                      >
                        {program}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Footer */}
              <div
                className="mt-10 pt-6"
                style={{
                  borderTop: `1px solid ${
                    cat.light ? "#e0d8d0" : "rgba(255,255,255,0.12)"
                  }`,
                }}
              >
                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: 500,
                    color: cat.light ? "#999" : "rgba(255,255,255,0.4)",
                  }}
                >
                  {cat.programs.length} programe
                </span>
              </div>
            </div>
          ))}

          {/* CTA card */}
          <div
            className="flex-shrink-0 flex flex-col items-center justify-center gap-8 px-12"
            style={{
              background: "#D4753A",
              width: "clamp(280px,32vw,520px)",
              height: "calc(100vh - 160px)",
            }}
          >
            <div className="text-center">
              <p className="text-white/80 font-semibold uppercase tracking-widest mb-4"
                style={{ fontSize: "14px" }}>
                Gati të filloni?
              </p>
              <h3
                className="font-bold text-white leading-tight mb-10"
                style={{ fontSize: "clamp(22px,2.8vw,38px)" }}
              >
                Gjej programin e duhur për ekipin tuaj
              </h3>
              <a
                href="/contact"
                className="inline-block bg-white text-[#D4753A] px-8 py-4 font-bold tracking-wide hover:bg-[#1a1a1a] hover:text-white transition-colors"
                style={{ fontSize: "15px" }}
              >
                Kontakto tani
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

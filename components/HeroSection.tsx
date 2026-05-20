"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const STATS = [
  { value: 50, suffix: "+", label: "Kompani partnere" },
  { value: 5000, suffix: "+", label: "Profesionistë të trajnuar" },
  { value: 98, suffix: "%", label: "Shkallë kënaqësie" },
  { value: 12, suffix: "+", label: "Vite eksperiencë" },
];

const AVATARS = [
  { initials: "BK", color: "#D4753A" },
  { initials: "LM", color: "#1a1a1a" },
  { initials: "AD", color: "#888" },
  { initials: "SF", color: "#D4753A" },
];

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);
  const btnsRef = useRef<HTMLDivElement>(null);
  const chartWrapRef = useRef<HTMLDivElement>(null);
  const chartLineRef = useRef<SVGPolylineElement>(null);
  const chartDotRef = useRef<SVGCircleElement>(null);
  const statRefs = useRef<(HTMLDivElement | null)[]>([]);
  const statNumRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const avatarRefs = useRef<(HTMLDivElement | null)[]>([]);
  const avatarsLabelRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // ── Left side — stagger fade up ──────────────────────────────
      gsap.from(
        [
          eyebrowRef.current,
          h1Ref.current,
          paraRef.current,
          btnsRef.current,
        ],
        {
          y: 30,
          opacity: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      // ── Chart wrap — slide from right ────────────────────────────
      gsap.from(chartWrapRef.current, {
        x: 40,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      // ── SVG line — infinite loop draw ────────────────────────────
      if (chartLineRef.current) {
        const line = chartLineRef.current;
        const dot = chartDotRef.current;

        const loopTimeline = gsap.timeline({
          repeat: -1,
          delay: 0.3,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        });

        // 1. linja vizatohet (320→0)
        loopTimeline.to(line, {
          strokeDashoffset: 0,
          duration: 1.8,
          ease: "power2.inOut",
        });

        // 2. dot shfaqet në fund
        if (dot) {
          loopTimeline.to(dot, { opacity: 1, duration: 0.25 }, "-=0.1");
        }

        // 3. pauzë — grafikun e plotë
        loopTimeline.to({}, { duration: 1.2 });

        // 4. dot zhduket
        if (dot) {
          loopTimeline.to(dot, { opacity: 0, duration: 0.2 });
        }

        // 5. linja fshihet mbrapsht
        loopTimeline.to(line, {
          strokeDashoffset: 320,
          duration: 1.0,
          ease: "power2.in",
        });

        // 6. pauzë e shkurtër
        loopTimeline.to({}, { duration: 0.4 });
      }

      // ── Stat cards — slide up + count-up ─────────────────────────
      statRefs.current.forEach((card, i) => {
        if (!card) return;

        gsap.from(card, {
          y: 24,
          opacity: 0,
          duration: 0.5,
          delay: i * 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
          },
        });

        const numEl = statNumRefs.current[i];
        if (!numEl) return;
        const target = STATS[i].value;
        const suffix = STATS[i].suffix;
        const obj = { val: 0 };

        gsap.to(obj, {
          val: target,
          duration: 1.2,
          delay: i * 0.1,
          ease: "power2.out",
          onUpdate() {
            numEl.textContent =
              target >= 1000
                ? Math.round(obj.val / 1000) + "k" + suffix
                : Math.round(obj.val) + suffix;
          },
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
          },
        });
      });

      // ── Avatars — cascade from right ─────────────────────────────
      avatarRefs.current.forEach((av, i) => {
        if (!av) return;
        gsap.from(av, {
          x: 20,
          opacity: 0,
          duration: 0.4,
          delay: i * 0.08,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: av,
            start: "top 95%",
          },
        });
      });

      if (avatarsLabelRef.current) {
        gsap.from(avatarsLabelRef.current, {
          opacity: 0,
          duration: 0.5,
          delay: 0.4,
          scrollTrigger: {
            trigger: avatarsLabelRef.current,
            start: "top 95%",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="grid grid-cols-1 lg:grid-cols-2 min-h-[560px] bg-white pt-[140px] pb-[80px]"
    >
      {/* ── Left ── */}
      <div className="flex flex-col justify-center px-8 py-16 lg:px-16 lg:pl-[max(2rem,calc((100vw-1200px)/2+1.5rem))]">
        <p
          ref={eyebrowRef}
          className="text-xs font-semibold tracking-widest uppercase mb-4"
          style={{ color: "#D4753A" }}
        >
          Nga viti 2018
        </p>

        <h1
          ref={h1Ref}
          className="text-4xl lg:text-5xl font-bold leading-tight mb-5"
          style={{ color: "#1a1a1a" }}
        >
          Zhvilloni ekipin tuaj.
          <br />
          Transformoni biznesin tuaj.
        </h1>

        <p
          ref={paraRef}
          className="text-base text-gray-500 leading-relaxed mb-8 max-w-md"
        >
          Smarter ofron 20 programe trajnimi të dizajnuara për të rritur
          performancën e individëve, ekipeve dhe organizatave.
        </p>

        <div ref={btnsRef} className="flex flex-wrap items-center gap-4">
          <Link href="/soft-skills-academy" className="btn-accent text-[15px]">
            Fillo Tani
          </Link>
          <Link
            href="/services"
            className="text-[15px] font-medium text-[#6B6B6B] underline underline-offset-4 decoration-[#E8E8E8] hover:text-[#1A1A1A] hover:decoration-[#1A1A1A] transition-colors cursor-pointer"
          >
            Eksploro programet →
          </Link>
        </div>
      </div>

      {/* ── Right ── */}
      <div className="flex flex-col items-center justify-center gap-6 bg-gray-50 px-8 py-12 lg:px-12 lg:pr-[max(2rem,calc((100vw-1200px)/2+1.5rem))]">
        {/* Chart */}
        <div ref={chartWrapRef} className="w-full max-w-[400px]">
          <svg
            viewBox="0 0 260 100"
            className="w-full"
            style={{ height: 120 }}
            xmlns="http://www.w3.org/2000/svg"
          >
            <polyline
              ref={chartLineRef}
              points="10,80 50,65 90,55 130,38 170,28 210,14 250,8"
              fill="none"
              stroke="#D4753A"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ strokeDasharray: 320, strokeDashoffset: 320 }}
            />
            <circle
              ref={chartDotRef}
              cx="250"
              cy="8"
              r="4"
              fill="#D4753A"
              style={{ opacity: 0 }}
            />
            <text x="10" y="95" fontSize="9" fill="#ccc">
              2018
            </text>
            <text x="226" y="95" fontSize="9" fill="#ccc">
              2026
            </text>
          </svg>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 gap-4 w-full max-w-[400px]">
          {STATS.map((stat, i) => (
            <div
              key={i}
              ref={(el) => {
                statRefs.current[i] = el;
              }}
              className="bg-white rounded-none p-5"
              style={{ border: "1px solid #e8e8e4" }}
            >
              <p
                className="text-[28px] font-bold tracking-tight"
                style={{ color: "#D4753A", lineHeight: 1 }}
              >
                <span
                  ref={(el) => {
                    statNumRefs.current[i] = el;
                  }}
                >
                  {"0" + stat.suffix}
                </span>
              </p>
              <p className="text-[13px] text-gray-500 mt-2 font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Avatars */}
        <div className="flex flex-col items-center gap-3">
          <div className="flex gap-2">
            {AVATARS.map((av, i) => (
              <div
                key={i}
                ref={(el) => {
                  avatarRefs.current[i] = el;
                }}
                className="w-10 h-10 rounded-full flex items-center justify-center text-[13px] font-semibold text-white"
                style={{ background: av.color }}
              >
                {av.initials}
              </div>
            ))}
          </div>
          <p
            ref={avatarsLabelRef}
            className="text-[13px] text-gray-400 font-medium"
          >
            Ekipi juaj i ardhshëm
          </p>
        </div>
      </div>
    </section>
  );
}

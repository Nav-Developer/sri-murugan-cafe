"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { chapters } from "@/data/story";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const STEP = 3;

export default function StoryScroll() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const total = chapters.length * STEP;
      const last = chapters.length - 1;

      gsap.set(".chapter", { autoAlpha: 0 });
      gsap.set(root.current, {
        backgroundColor: chapters[0].bg,
        color: chapters[0].fg,
      });

      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: `+=${chapters.length * 1400}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      chapters.forEach((c, i) => {
        const t = i * STEP;
        const sel = `.chapter-${i}`;

        // time of day: shift the whole section's colours
        if (i > 0) {
          tl.to(
            root.current,
            { backgroundColor: c.bg, color: c.fg, duration: 1, ease: "none" },
            t - 0.6,
          );
        }

        tl.to(sel, { autoAlpha: 1, duration: 0.4 }, t)
          .fromTo(
            `${sel} .reveal`,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.12, duration: 0.8 },
            t,
          )
          .fromTo(
            `${sel} .bigtime`,
            { xPercent: 15, opacity: 0 },
            { xPercent: 0, opacity: 1, duration: 1 },
            t,
          );

        if (i < last) {
          tl.to(
            sel,
            { autoAlpha: 0, y: -40, duration: 0.5, ease: "power2.in" },
            t + STEP - 0.6,
          );
        }
      });

      // counters
      root.current?.querySelectorAll<HTMLElement>(".stat").forEach((el) => {
        const o = { v: 0 };
        tl.to(
          o,
          {
            v: Number(el.dataset.value),
            duration: 1.4,
            ease: "power1.out",
            snap: { v: 1 },
            onUpdate: () => {
              el.textContent = String(o.v);
            },
          },
          last * STEP + 0.3,
        );
      });

      // sun travelling along the arc
      const sun = root.current?.querySelector<SVGCircleElement>(".sun");
      const d = { p: 0 };
      tl.to(
        d,
        {
          p: 1,
          ease: "none",
          duration: total,
          onUpdate: () => {
            const p = d.p;
            const q = 1 - p;
            sun?.setAttribute("cx", String(1000 * p));
            sun?.setAttribute(
              "cy",
              String(q * q * 200 + 2 * q * p * -100 + p * p * 200),
            );
          },
        },
        0,
      );
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="relative h-screen overflow-hidden bg-[#c89466] text-[#2e1a12]"
    >
      {chapters.map((c, i) => (
        <div
          key={i}
          className={`chapter chapter-${i} absolute inset-0 grid items-center gap-6 px-8 pb-44 pt-32 md:grid-cols-2 md:px-20`}
        >
          <div className="relative z-10">
            <p className="reveal mb-4 inline-block rounded-full border border-current px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.25em]">
              {c.tag}
            </p>
            <h2 className="reveal text-5xl font-black leading-[1.02] tracking-tight md:text-7xl">
              {c.title}
            </h2>
            <div className="reveal my-6 h-px w-24 bg-current/40" />
            <p className="reveal max-w-md text-lg text-current/80">{c.text}</p>

            {c.stats && (
              <div className="reveal mt-10 flex gap-10">
                {c.stats.map((s) => (
                  <div key={s.label}>
                    <p className="text-5xl font-black md:text-6xl">
                      <span className="stat" data-value={s.value}>
                        0
                      </span>
                      {s.suffix}
                    </p>
                    <p className="mt-1 text-xs font-bold uppercase tracking-[0.2em] text-current/70">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <p className="bigtime pointer-events-none justify-self-center font-serif text-[10rem] font-black italic leading-none md:text-[24rem]">
            {c.time}
            <span className="ml-2 text-4xl not-italic tracking-widest md:text-6xl">
              {c.period}
            </span>
          </p>
        </div>
      ))}

      {/* sun arc */}
      <div className="absolute inset-x-0 bottom-8">
        <svg
          viewBox="0 0 1000 200"
          className="mx-auto h-28 w-full max-w-3xl overflow-visible"
          aria-hidden
        >
          <path
            d="M0,200 Q500,-100 1000,200"
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.35"
            strokeWidth="2"
            strokeDasharray="4 10"
            strokeLinecap="round"
          />
          <circle className="sun" cx="0" cy="200" r="14" fill="currentColor" />
        </svg>
      </div>
    </section>
  );
}

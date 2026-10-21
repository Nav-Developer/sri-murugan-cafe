"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import assets from "@/assets";
import PourScene from "@/components/ui/PourScene";

const LINES = ["Strong kaapi.", "Soft idli.", "Same since 1967."];

const MENU_WORDS = [
  "காபி · Kaapi",
  "இட்லி · Idli",
  "தோசை · Dosa",
  "வடை · Vada",
  "சாப்பாடு · Meals",
];

export default function HeroMotion() {
  return (
    <>
      <section className="relative min-h-screen overflow-hidden px-6 pb-20 pt-32">
        {/* ghost year */}
        <span
          aria-hidden
          className="pointer-events-none absolute -bottom-10 -left-6 select-none text-[30vw] font-black leading-none text-transparent"
          style={{ WebkitTextStroke: "2px rgba(123,74,46,0.18)" }}
        >
          1967
        </span>

        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-[1.15fr_0.85fr]">
          {/* TEXT */}
          <div>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-6 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-coffee-600"
            >
              <span className="h-px w-10 bg-coffee-600" />
              Coimbatore · Est. 1967
            </motion.p>

            <h1 className="text-5xl font-black leading-[0.98] tracking-tight text-espresso-800 md:text-7xl">
              {LINES.map((l, k) => (
                <span key={l} className="block overflow-hidden pb-[0.08em]">
                  <motion.span
                    className={`block ${
                      k === 2 ? "font-serif italic text-coffee-600" : ""
                    }`}
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{
                      delay: 0.15 * k + 0.1,
                      duration: 0.7,
                      ease: [0.76, 0, 0.24, 1],
                    }}
                  >
                    {l}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-6 max-w-md text-lg text-espresso-800/75"
            >
              Filter coffee, crisp dosas and home-style meals. Your cafe next
              door, the one that remembers your order.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="mt-8 flex items-center gap-6"
            >
              <Link
                href="/menu"
                className="rounded-full bg-espresso-800 px-8 py-3 text-sm font-black uppercase tracking-wider text-cream-200 transition hover:-translate-y-1 hover:shadow-[0_8px_0_#c89466]"
              >
                View menu
              </Link>
              <Link
                href="/contact"
                className="group flex items-center gap-2 text-sm font-black uppercase tracking-wider text-espresso-800"
              >
                Find us
                <span className="transition group-hover:translate-x-1">→</span>
              </Link>
            </motion.div>
          </div>

          {/* POUR + LOGO STICKER */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="relative mx-auto w-full max-w-md"
          >
            <PourScene />
            <motion.div
              className="absolute right-0 top-2 h-24 w-24 md:h-28 md:w-28"
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            >
              <Image
                src={assets.images.logo}
                alt="Sri Murugan Cafe"
                fill
                priority
                sizes="112px"
                className="rounded-full border-4 border-espresso-800 object-cover"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="overflow-hidden bg-espresso-800 py-4">
        <motion.div
          className="flex w-max"
          animate={{ x: ["0%", "-25%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          {[0, 1, 2, 3].map((c) => (
            <div key={c} className="flex shrink-0">
              {MENU_WORDS.map((w) => (
                <span
                  key={w + c}
                  className="mx-8 whitespace-nowrap text-xl font-black uppercase tracking-wider text-caramel-400"
                >
                  {w}
                  <span className="ml-16 text-copper">✦</span>
                </span>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </>
  );
}

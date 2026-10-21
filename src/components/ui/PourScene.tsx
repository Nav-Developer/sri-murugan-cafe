"use client";

import { motion } from "framer-motion";

const LOOP = 7;
const loop = (times: number[]) => ({
  duration: LOOP,
  repeat: Infinity,
  ease: "easeInOut" as const,
  times,
});

export default function PourScene() {
  return (
    <svg
      viewBox="0 0 400 480"
      className="block h-auto w-full"
      role="img"
      aria-label="Filter coffee being poured from tumbler into davara"
    >
      <defs>
        <linearGradient id="steel" x1="0" x2="1">
          <stop offset="0" stopColor="#d9d3c8" />
          <stop offset="0.35" stopColor="#fbf8f1" />
          <stop offset="0.7" stopColor="#a9a295" />
          <stop offset="1" stopColor="#d4cec2" />
        </linearGradient>
      </defs>

      {/* backdrop */}
      <circle cx="200" cy="245" r="185" fill="#c89466" />
      <circle
        cx="200"
        cy="245"
        r="170"
        fill="none"
        stroke="#2e1a12"
        strokeOpacity="0.45"
        strokeWidth="2"
        strokeDasharray="2 8"
        strokeLinecap="round"
      />

      {/* shadow */}
      <ellipse
        cx="200"
        cy="456"
        rx="135"
        ry="10"
        fill="#2e1a12"
        opacity="0.25"
      />

      {/* davara */}
      <path
        d="M64 360 H336 L314 432 Q200 458 86 432 Z"
        fill="url(#steel)"
        stroke="#2e1a12"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M72 392 Q200 414 328 392"
        fill="none"
        stroke="#2e1a12"
        strokeOpacity="0.25"
        strokeWidth="2"
      />
      <motion.ellipse
        cx="200"
        cy="360"
        rx="136"
        ry="16"
        stroke="#2e1a12"
        strokeWidth="3"
        initial={{ fill: "#1a0d07" }}
        animate={{
          fill: [
            "#1a0d07",
            "#1a0d07",
            "#7a4526",
            "#7a4526",
            "#1a0d07",
            "#1a0d07",
          ],
        }}
        transition={loop([0, 0.3, 0.5, 0.76, 0.92, 1])}
      />

      {/* ripples where the stream lands */}
      <motion.g
        animate={{ opacity: [0, 0, 1, 1, 0, 0] }}
        transition={loop([0, 0.3, 0.34, 0.74, 0.78, 1])}
      >
        <motion.ellipse
          cx="200"
          cy="360"
          fill="none"
          stroke="#fbe8cd"
          strokeWidth="2"
          animate={{ rx: [14, 70], ry: [2, 9], opacity: [0.9, 0] }}
          transition={{ duration: 1.1, repeat: Infinity, ease: "easeOut" }}
        />
      </motion.g>

      {/* stream */}
      <motion.path
        d="M200 128 C196 190 205 270 200 360"
        fill="none"
        stroke="#7a4526"
        strokeWidth="7"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{
          pathLength: [0, 0, 1, 1, 1, 1],
          opacity: [0, 0, 1, 1, 0, 0],
        }}
        transition={loop([0, 0.24, 0.3, 0.76, 0.82, 1])}
      />

      {/* tumbler: lip sits at (200,120), tilts around its top-right corner */}
      <g transform="translate(200 120)">
        <motion.g
          style={{ originX: 1, originY: 0 }}
          animate={{ rotate: [0, 0, 52, 52, 0, 0] }}
          transition={loop([0, 0.1, 0.3, 0.76, 0.92, 1])}
        >
          <path
            d="M-92 0 H0 L-12 132 Q-46 142 -80 132 Z"
            fill="url(#steel)"
            stroke="#2e1a12"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <path
            d="M-90 30 H-3"
            stroke="#2e1a12"
            strokeOpacity="0.25"
            strokeWidth="2"
          />
          <path
            d="M-86 100 H-8"
            stroke="#2e1a12"
            strokeOpacity="0.25"
            strokeWidth="2"
          />
        </motion.g>
      </g>

      {/* steam */}
      {[110, 290].map((x, k) => (
        <motion.path
          key={x}
          d={`M${x} 340 c-12 -18 12 -30 0 -52`}
          fill="none"
          stroke="#fbe8cd"
          strokeWidth="4"
          strokeLinecap="round"
          animate={{ y: [0, -22], opacity: [0, 0.7, 0] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: k * 1.2,
            ease: "easeOut",
          }}
        />
      ))}
    </svg>
  );
}

export function CoffeeBean() {
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden>
      <g transform="rotate(35 50 50)">
        <ellipse cx="50" cy="50" rx="30" ry="42" fill="#8a4a2c" />
        <ellipse cx="42" cy="38" rx="9" ry="20" fill="#a8643f" opacity="0.55" />
        <path
          d="M50 10 C34 30 66 70 50 90"
          stroke="#2e1a12"
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

export function CoffeeCup() {
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden>
      <path
        d="M20 42 H72 V60 a22 22 0 0 1 -22 22 H42 a22 22 0 0 1 -22 -22 Z"
        fill="#fbe8cd"
        stroke="#2e1a12"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path
        d="M72 48 h6 a9 9 0 0 1 0 18 h-8"
        fill="none"
        stroke="#2e1a12"
        strokeWidth="4"
      />
      <path d="M20 50 H72" stroke="#c89466" strokeWidth="6" />
      <path
        d="M36 32 C30 24 42 20 36 12 M52 32 C46 24 58 20 52 12"
        fill="none"
        stroke="#c89466"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

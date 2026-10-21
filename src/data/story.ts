export type Chapter = {
  time: string;
  period: string;
  tag: string;
  title: string;
  text: string;
  bg: string;
  fg: string;
  stats?: { label: string; value: number; suffix?: string }[];
};

export const chapters: Chapter[] = [
  {
    time: "6",
    period: "AM",
    tag: "Morning",
    title: "First, the kaapi.",
    text: "The decoction drips slow, the milk comes to a boil, and the first tumbler is poured the way it has been since 1967.",
    bg: "#c89466",
    fg: "#2e1a12",
  },
  {
    time: "1",
    period: "PM",
    tag: "Afternoon",
    title: "Meals like home.",
    text: "Veetu saapadu, served hot. Everything you would get at home, minus the onion cutting. Come closer, we have been waiting to say hi.",
    bg: "#fbe8cd",
    fg: "#2e1a12",
  },
  {
    time: "5",
    period: "PM",
    tag: "Evening",
    title: "Tiny bites, big cravings.",
    text: "Crisp vadas, golden dosas and little bites to go with your evening kaapi. Swipe at your own risk.",
    bg: "#7b4a2e",
    fg: "#fbe8cd",
  },
  {
    time: "9",
    period: "PM",
    tag: "Night",
    title: "Same cafe. Since 1967.",
    text: "It began as a small cafe in Salem, where Thatha served food with love, not just spice. Now it is yours in Coimbatore.",
    bg: "#150a05",
    fg: "#fbe8cd",
    stats: [
      { label: "Years of kaapi", value: 59, suffix: "+" },
      { label: "Cafe family", value: 600, suffix: "+" },
    ],
  },
];

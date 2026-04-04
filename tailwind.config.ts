import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        abyss: "#040507",
        ink: "#090b10",
        panel: "#0d1016",
        line: "#1b2030",
        zooey: {
          50: "#effef1",
          100: "#d7fada",
          200: "#aef2b7",
          300: "#86ea95",
          400: "#58de74",
          500: "#37c95a",
          600: "#26a744",
          700: "#207f37",
          800: "#1d642f",
          900: "#195329"
        },
        aurora: {
          400: "#6f78ff",
          500: "#7157ff",
          600: "#4a5cff"
        }
      },
      fontFamily: {
        sans: ["var(--font-manrope)", "sans-serif"],
        display: ["var(--font-space-grotesk)", "sans-serif"]
      },
      backgroundImage: {
        "zooey-grid":
          "linear-gradient(rgba(74, 222, 128, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(74, 222, 128, 0.08) 1px, transparent 1px)"
      },
      boxShadow: {
        glow: "0 0 40px rgba(74, 222, 128, 0.16)",
        orbital: "0 0 40px rgba(112, 87, 255, 0.18)"
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - var(--gap)))" }
        },
        "marquee-reverse": {
          from: { transform: "translateX(calc(-100% - var(--gap)))" },
          to: { transform: "translateX(0)" }
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" }
        },
        pulseRing: {
          "0%": { transform: "scale(0.92)", opacity: "0.2" },
          "70%": { transform: "scale(1.1)", opacity: "0.55" },
          "100%": { transform: "scale(1.2)", opacity: "0" }
        }
      },
      animation: {
        marquee: "marquee var(--duration, 36s) linear infinite",
        "marquee-reverse": "marquee-reverse var(--duration, 36s) linear infinite",
        float: "float 6s ease-in-out infinite",
        ring: "pulseRing 2.6s ease-out infinite"
      }
    }
  },
  plugins: []
};

export default config;

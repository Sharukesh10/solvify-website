/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          green: "#1DB954",
          dark: "#0a0a0a",
          charcoal: "#111111",
          card: "#161616",
          border: "#222222",
          muted: "#888888",
        },
      },
      fontFamily: {
        display: ["'Archivo Narrow'", "sans-serif"],
        body: ["'Satoshi'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease forwards",
        "fade-in": "fadeIn 0.5s ease forwards",
        float: "float 6s ease-in-out infinite",
        pulse2: "pulse2 2s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: { "0%": { opacity: 0, transform: "translateY(24px)" }, "100%": { opacity: 1, transform: "translateY(0)" } },
        fadeIn: { "0%": { opacity: 0 }, "100%": { opacity: 1 } },
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-12px)" } },
        pulse2: { "0%,100%": { opacity: 1 }, "50%": { opacity: 0.5 } },
      },
    },
  },
  plugins: [],
};

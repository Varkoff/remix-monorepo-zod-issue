const tailwindCssAnimate = require("tailwindcss-animate");
// import { join } from 'node:path';
const { join } = require("node:path");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/routes/**/*.{js,ts,jsx,tsx}",
    "./app/components/**/*.{js,ts,jsx,tsx}",
    // 👇 this line allows monorepo to detect tailwind
    join(__dirname, "./app/**/*.{js,ts,jsx,tsx}"),
  ],

  theme: {
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
    },
    extend: {
      gridTemplateColumns: {
        process: "repeat(auto-fill, minmax(min(100%, 350px), 1fr))",
        smallBlogArticle: "repeat(auto-fill, minmax(min(100%, 300px), 1fr))",
      },
      boxShadow: {
        goodcollect: "0 20px 30px -30px rgba(0, 0, 0, 0.25)",
      },
      backgroundImage: {
        "hero-pattern": "url('/images/landing-page.webp')",
        "hero-pattern-2": "url('/images/landing-page-2.webp')",
      },

      borderRadius: {
        soft: "10px",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },

      colors: {
        // Shadcn

        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        // destructive: {
        // 	DEFAULT: 'hsl(var(--destructive))',
        // 	foreground: 'hsl(var(--destructive-foreground))',
        // },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },

        teal: "#09B582",
        oceanblue: "#1C6FD0",
        midnightblue: "#0D294A",
        turquoise: "#D0EBEA",
        "light-turquoise": "#E2F2F1",
        "extra-light-turquoise": "#F3F8F8",
        "dark-iron": "#B0B0B0",
        iron: "#EEEEEE",
        "light-iron": "#F8F8F8",
        rouge: "#B40E0E",
        destructive: "#DB7D7D",
        progress: "#F4BA61",

        // ShadCN UI

        // borderRadius: {
        // 	lg: "var(--radius)",
        // 	md: "calc(var(--radius) - 2px)",
        // 	sm: 'calc(var(--radius) - 4px)',
        // 	soft: '10px',
        // },

        keyframes: {
          "accordion-down": {
            from: { height: 0 },
            to: { height: "var(--radix-accordion-content-height)" },
          },
          "accordion-up": {
            from: { height: "var(--radix-accordion-content-height)" },
            to: { height: 0 },
          },

          // Popover
          slideUpAndFade: {
            from: { opacity: 0, transform: "translateY(2px)" },
            to: { opacity: 1, transform: "translateY(0)" },
          },
          slideRightAndFade: {
            from: { opacity: 0, transform: "translateX(-2px)" },
            to: { opacity: 1, transform: "translateX(0)" },
          },
          slideDownAndFade: {
            from: { opacity: 0, transform: "translateY(-2px)" },
            to: { opacity: 1, transform: "translateY(0)" },
          },
          slideLeftAndFade: {
            from: { opacity: 0, transform: "translateX(2px)" },
            to: { opacity: 1, transform: "translateX(0)" },
          },
        },
        animation: {
          "accordion-down": "accordion-down 0.2s ease-out",
          "accordion-up": "accordion-up 0.2s ease-out",

          // Popover
          slideUpAndFade: "slideUpAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
          slideRightAndFade:
            "slideRightAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
          slideDownAndFade:
            "slideDownAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
          slideLeftAndFade:
            "slideLeftAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        },
      },
    },
  },
  plugins: [tailwindCssAnimate],
};

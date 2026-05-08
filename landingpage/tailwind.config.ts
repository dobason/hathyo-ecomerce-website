import type { Config } from "tailwindcss";
const plugin = require("tailwindcss/plugin");

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/containers/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xxs: "352px",
        xs: "372px",
        sm: "540px",
        md: "720px",
        lg: "960px",
        xl: "1140px",
        xxl: "1296px",
      },
      gridTemplateColumns: {
        "16": "repeat(16, minmax(0, 1fr))", // Adds support for 16-column grids
      },
      gridColumn: {
        "span-15": "span 15 / span 15", // Specific for custom spans
      },
      colors: {
        "Moss/900": "#042D19",
        "Moss/700": "#054627",
        "Moss/600": "#085A33",
        "Moss/500": "#0A6D3D",
        "Moss/400": "#0B8249",
        "Moss/300": "#27C679",
        "Moss/200": "#4FDE9A",
        "Moss/100": "#D1FBE7",
        "Moss/50": "#F5FBEE",
        "Moss/25": "#FAFDF7",

        "Grayiron/700": "#3F3F46",
        "Grayiron/600": "#51525C",
        "Grayiron/500": "#70707B",
        "Grayiron/400": "#A0A0AB",
        "Grayiron/300": "#D1D1D6",
        "Grayiron/200": "#E4E4E7",

        "Warning/500": "#F79009",
        "Warning/400": "#FDB022",
        "Warning/100": "#FEF0C7",

        "Orange/900": "#7A2E0E",
        "Orange/700": "#B54708",
        "Orange/600": "#DC6803",
        "Orange/500": "#F79009",
        "Orange/400": "#FDB022",
        "Orange/300": "#FEC84B",
        "Orange/200": "#FEDF89",
        "Orange/100": "#FEF0C7",
        "Orange/50": "#FFFAEB",
        "Orange/25": "#FFFCF5",
      },
      boxShadow: {
        "Shadow/xs": "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
        "Shadow/sm": "0px 4px 8px 0px rgba(17, 66, 0, 0.06)",
        "Shadow/md": " 0px 4px 12px 0px rgba(0, 0, 0, 0.08)",
        "Shadow/xl": "0px 4px 20px 0px rgba(34, 47, 0, 0.3)",
        "Shadow/product": "0px 0px 15px 0px rgba(17, 66, 0, 0.1)",

        "Shadow/primary": "0px 0px 0px 4px rgba(206, 234, 176, 1)",
        "Shadow/secondary": "0px 0px 0px 4px rgba(230, 244, 215, 1)",
      },
      fontFamily: {
        sans: ["Nunito", "sans-serif"],
        lexend: ["Lexend", "sans-serif"],
        arial: ["Arial", "sans-serif"],
      },
      fontSize: {
        sm: [
          "12px",
          {
            lineHeight: "18px",
            fontWeight: "500",
          },
        ],
        md: [
          "14px",
          {
            lineHeight: "20px",
            fontWeight: "500",
          },
        ],
        base: [
          "16px",
          {
            lineHeight: "24px",
            fontWeight: "500",
          },
        ],
        lg: [
          "18px",
          {
            lineHeight: "28px",
            fontWeight: "500",
          },
        ],
        xl: [
          "20px",
          {
            lineHeight: "30px",
            fontWeight: "600",
          },
        ],
        "2xl": [
          "24px",
          {
            lineHeight: "32px",
            fontWeight: "600",
          },
        ],
        "3xl": [
          "30px",
          {
            lineHeight: "38px",
            fontWeight: "600",
          },
        ],
        "4xl": [
          "36px",
          {
            lineHeight: "44px",
            fontWeight: "700",
          },
        ],
        "5xl": [
          "48px",
          {
            lineHeight: "60px",
            fontWeight: "700",
          },
        ],
      },
      animation: {
        "logo-shine": "shine 2.5s linear infinite",
      },
      keyframes: {
        shine: {
          "0%": { left: "-100%" },
          "50%": { left: "100%" },
          "100%": { left: "100%" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-post-card":
          "linear-gradient(180deg, rgba(30, 37, 25, 0.3825) 0%, rgba(29, 66, 0, 0.3621) 100%)",
      },
    },
  },
  
  plugins: [
    require("@tailwindcss/forms"),
    require('tailwind-scrollbar'),
    plugin(function ({ addComponents }: any) {
      addComponents({
        ".heading-1": {
          fontSize: "56px",
          fontWeight: 700,
          lineHeight: "120%",
          letterSpacing: "-0.03em",
          "@media only screen and (min-width: 768px) and (max-width: 1199px)": {
            // Styles for tablets
            fontSize: "48px",
          },
          "@media only screen and (max-width: 767px)": {
            // Styles for mobile
            fontSize: "44px",
          },
        },
        ".heading-2": {
          fontSize: "48px",
          fontWeight: 700,
          lineHeight: "130%",
          letterSpacing: "-0.03em",
          "@media only screen and (min-width: 768px) and (max-width: 1199px)": {
            // Styles for tablets
            fontSize: "40px",
          },
          "@media only screen and (max-width: 767px)": {
            // Styles for mobile
            fontSize: "36px",
          },
        },
        ".heading-3": {
          fontSize: "32px",
          fontWeight: 700,
          lineHeight: "130%",
          letterSpacing: "-0.025em",
          "@media only screen and (min-width: 768px) and (max-width: 1199px)": {
            // Styles for tablets
            fontSize: "28px",
          },
          "@media only screen and (max-width: 767px)": {
            // Styles for mobile
            fontSize: "28px",
          },
        },
        ".heading-4": {
          fontSize: "24px",
          fontWeight: 700,
          lineHeight: "140%",
          letterSpacing: "-0.02em",
          "@media only screen and (min-width: 768px) and (max-width: 1199px)": {
            // Styles for tablets
            fontSize: "22px",
          },
          "@media only screen and (max-width: 767px)": {
            // Styles for mobile
            fontSize: "20px",
          },
        },
        ".heading-5": {
          fontSize: "20px",
          fontWeight: 700,
          lineHeight: "140%",
          letterSpacing: "-0.02em",
          "@media only screen and (min-width: 768px) and (max-width: 1199px)": {
            // Styles for tablets
            fontSize: "20px",
          },
          "@media only screen and (max-width: 767px)": {
            // Styles for mobile
            fontSize: "17px",
          },
        },
        ".quote": {
          fontSize: "32px",
          fontWeight: 700,
          lineHeight: "130%",
          letterSpacing: "-0.025em",
          "@media only screen and (min-width: 768px) and (max-width: 1199px)": {
            // Styles for tablets
            fontSize: "28px",
          },
          "@media only screen and (max-width: 767px)": {
            fontSize: "17px",
            fontWeight: 700,
            lineHeight: "140%",
            letterSpacing: "-0.02em",
          },
        },
        ".body-lg-medium": {
          fontSize: "18px",
          fontWeight: 500,
          lineHeight: "150%",
          "@media only screen and (min-width: 768px) and (max-width: 1199px)": {
            // Styles for tablets
            fontSize: "17px",
          },
          "@media only screen and (max-width: 767px)": {
            // Styles for mobile
            fontSize: "16px",
          },
        },
        
        ".body-lg-semibold": {
          fontSize: "18px",
          fontWeight: 600,
          lineHeight: "150%",
          "@media only screen and (min-width: 768px) and (max-width: 1199px)": {
            // Styles for tablets
            fontSize: "17px",
          },
          "@media only screen and (max-width: 767px)": {
            // Styles for mobile
            fontSize: "16px",
          },
        },
        ".body-medium": {
          fontSize: "16px",
          fontWeight: 500,
          lineHeight: "150%",
          "@media only screen and (min-width: 768px) and (max-width: 1199px)": {
            // Styles for tablets
            fontSize: "16px",
          },
          "@media only screen and (max-width: 767px)": {
            // Styles for mobile
            fontSize: "15px",
          },
        },
        ".body-semibold": {
          fontSize: "16px",
          fontWeight: 600,
          lineHeight: "150%",
          "@media only screen and (min-width: 768px) and (max-width: 1199px)": {
            // Styles for tablets
            fontSize: "16px",
          },
          "@media only screen and (max-width: 767px)": {
            // Styles for mobile
            fontSize: "15px",
          },
        },
        ".body-bold": {
          fontSize: "16px",
          fontWeight: 700,
          lineHeight: "150%",
          "@media only screen and (min-width: 768px) and (max-width: 1199px)": {
            // Styles for tablets
            fontSize: "16px",
          },
          "@media only screen and (max-width: 767px)": {
            // Styles for mobile
            fontSize: "15px",
          },
        },
        ".body-sm-medium": {
          fontSize: "14px",
          fontWeight: 500,
          lineHeight: "150%",
          "@media only screen and (min-width: 768px) and (max-width: 1199px)": {
            // Styles for tablets
            fontSize: "14px",
          },
          "@media only screen and (max-width: 767px)": {
            // Styles for mobile
            fontSize: "13px",
          },
        },
        ".body-sm-semibold": {
          fontSize: "14px",
          fontWeight: 600,
          lineHeight: "150%",
          "@media only screen and (min-width: 768px) and (max-width: 1199px)": {
            // Styles for tablets
            fontSize: "14px",
          },
          "@media only screen and (max-width: 767px)": {
            // Styles for mobile
            fontSize: "14px",
          },
        },
        ".body-sm-bold": {
          fontSize: "14px",
          fontWeight: 700,
          lineHeight: "150%",
          "@media only screen and (min-width: 768px) and (max-width: 1199px)": {
            // Styles for tablets
            fontSize: "14px",
          },
          "@media only screen and (max-width: 767px)": {
            // Styles for mobile
            fontSize: "14px",
          },
        },
        ".body-xs-regular": {
          fontSize: "12px",
          fontWeight: 400,
          lineHeight: "120%",
          "@media only screen and (min-width: 768px) and (max-width: 1199px)": {
            // Styles for tablets
            fontSize: "12px",
          },
          "@media only screen and (max-width: 767px)": {
            // Styles for mobile
            fontSize: "10px",
          },
        },
        ".body-xs-medium": {
          fontSize: "12px",
          fontWeight: 500,
          lineHeight: "120%",
          "@media only screen and (min-width: 768px) and (max-width: 1199px)": {
            // Styles for tablets
            fontSize: "12px",
          },
          "@media only screen and (max-width: 767px)": {
            // Styles for mobile
            fontSize: "10px",
          },
        },
        ".body-xs-semibold": {
          fontSize: "12px",
          fontWeight: 600,
          lineHeight: "120%",
          "@media only screen and (min-width: 768px) and (max-width: 1199px)": {
            // Styles for tablets
            fontSize: "12px",
          },
          "@media only screen and (max-width: 767px)": {
            // Styles for mobile
            fontSize: "10px",
          },
        },
        ".body-xs-bold": {
          fontSize: "12px",
          fontWeight: 700,
          lineHeight: "120%",
          "@media only screen and (min-width: 768px) and (max-width: 1199px)": {
            // Styles for tablets
            fontSize: "12px",
          },
          "@media only screen and (max-width: 767px)": {
            // Styles for mobile
            fontSize: "10px",
          },
        },

        ".label-lg": {
          fontSize: "14px",
          fontWeight: 700,
          lineHeight: "150%",
          letterSpacing: "0.05em",
          "@media only screen and (min-width: 768px) and (max-width: 1199px)": {
            // Styles for tablets
            fontSize: "14px",
          },
          "@media only screen and (max-width: 767px)": {
            // Styles for mobile
            fontSize: "14px",
          },
        },
        ".label-normal": {
          fontSize: "10px",
          fontWeight: 700,
          lineHeight: "15px",
          letterSpacing: "0.5px",
        },
        ".dot": {
          width: "4px",
          height: "4px",
          borderRadius: "50%",
          backgroundColor: "rgba(0,0,0,0.9)",
        },
        extend: {
          animation: {
            "ping-fast": "ping 0.8s cubic-bezier(0, 0, 0.2, 1) infinite",
          },
          fontFamily: {
            quicksand: ["Quicksand", "sans-serif"],
          },
        },
      });
    }),
  ],
};
export default config;

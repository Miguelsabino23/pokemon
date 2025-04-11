/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "golden-shimmer":
          "linear-gradient(to bottom, #B57E10 0%, #B57E10 24%, #F9DF7B 40%, #FFF3A6 59%, #F9DF7B 78%, #B57E10 100%)",
      },
    },
    colors: {
      third: "#F5DB13",
      primary: "#F2b807",
      second: "#f28f16",
      danger: "#d93e30",
      white: "#f6f7f9",
      dark: "#212121",
      transparent: "transparent",

      primaryColor: "#dc0a2d",
      bugColor: "#a7b723",
      darkColor: "#75574c",
      dragonColor: "#7037ff",
      electricColor: "#f9cf30",
      fairyColor: "#e69eac",
      fightingColor: "#c12239",
      fireColor: "#f57d31",
      flyingColor: "#a891ec",
      ghostColor: "#70559b",
      normalColor: "#aaa67f",
      grassColor: "#74cb48",
      groundColor: "#dec16b",
      iceColor: "#9ad6df",
      poisonColor: "#a43e9e",
      psychicColor: "#fb5584",
      rockColor: "#b69e31",
      steelColor: "#b7b9d0",
      waterColor: "#6493eb",
    },
  },
  plugins: [],
};

import { createTheme } from "@mui/material/styles";

export const shades = {
  primary: {
    100: "#ffffffcc",
    200: "#ffffff99",
    300: "#ffffff66",
    400: "#ffffff33",
    500: "#00000000",
    600: "#00000033",
    700: "#00000066",
    800: "#00000099",
    900: "#000000cc",
  },
  secondary: {
    100: "#d1dceb",
    200: "#a4bad6",
    300: "#7697c2",
    400: "#4975ad",
    500: "#1b5299",
    600: "#16427a",
    700: "#10315c",
    800: "#0b213d",
    900: "#05101f",
  },

  neutral: {
    100: "#fceadb",
    200: "#f8d5b7",
    300: "#f5c093",
    400: "#f1ab6f",
    500: "#ee964b",
    600: "#be783c",
    700: "#8f5a2d",
    800: "#5f3c1e",
    900: "#301e0f",
  },
};

export const theme = createTheme({
  palette: {
    primary: {
      main: shades.primary[900],
    },
    secondary: {
      main: shades.secondary[500],
    },
    neutral: {
      dark: shades.neutral[700],
      main: shades.neutral[500],
      light: shades.neutral[100],
    },
  },
  typography: {
    fontFamily: ["Poppins", "sans-serif"].join(","),
    fontSize: 12,
    h1: {
      fontFamily: ["Cinzel", "sans-serif"].join(","),
      fontSize: 46,
    },
    h2: {
      fontFamily: ["Cinzel", "sans-serif"].join(","),
      fontSize: 34,
    },
    h3: {
      fontFamily: ["Cinzel", "sans-serif"].join(","),
      fontSize: 22,
    },
    h4: {
      fontFamily: ["Cinzel", "sans-serif"].join(","),
      fontSize: 18,
    },
    h6: {
      fontFamily: ["Cinzel", "sans-serif"].join(","),
      fontSize: 16,
    },
  },
});

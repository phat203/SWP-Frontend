const { createTheme } = require("@mui/material");

export const darkTheme = createTheme({
  palette: {
    mode: "light", // Change this to "light" for a light theme or "dark" for a dark theme
    primary: {
      main: "#055AC9",
    },
    secondary: {
      main: "#5A20CB",
    },
    black: {
      main: "#242B2E",
    },
    background: {
      default: "#FFFFFF", // Change background to white
      paper: "#FFFFFF",   // Change paper background to white
    },
    text: {
      primary: "#111111", // Change text color as needed
    },
  },
});

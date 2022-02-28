import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  colors: {
    transparent: "transparent",
    green: "#15803D",
    lightGreen: "#F6F9FA",
    gray: "#6B7280",
    white: "#fff",
  },
  styles: {
    global: {
      body: {
        bg: "",
        color: "",
        h1: "",
        h2: "",
        h3: "",
        h4: "",
        h5: "",
        div: "",
      },
      Button: "",
    },
  },
  component: {
    Button: {},
  },
});

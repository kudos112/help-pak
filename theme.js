import {extendTheme} from "@chakra-ui/react";
import {StepsStyleConfig as Steps} from "chakra-ui-steps";

export const theme = extendTheme({
  components: {
    Steps,
  },
  colors: {
    transparent: "transparent",
    customGreen: "#15803D",
    lightGreen: "#F6F9FA",
    customGray: "#6B7280",
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
    },
  },
});

import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
};

const theme = extendTheme({
  config,
  colors: {
    gray: {
      50: "#f9f9f9",
      100: "#ededed",
      200: "#d3d3d3",
      300: "#b3b3b3",
      400: "#a0a0a0",
      500: "#898989",
      600: "#6c6c6c",
      700: "#202020",
      800: "#121212",
      900: "#111",
    },
  },
  styles: {
    global: (props: { colorMode: string }) => ({
      body: {
        background:
          props.colorMode === "dark"
            ? `radial-gradient(circle at 35% 50%, rgba(5,88,255,0.25), transparent 50%),
               radial-gradient(circle at 65% 50%, rgba(128,0,74,0.25), transparent 50%),
               radial-gradient(circle at 50% 65%, rgba(74,128,0,0.25), transparent 50%)`
            : `radial-gradient(circle at 35% 50%, rgba(5,88,255,0.15), transparent 50%),
               radial-gradient(circle at 65% 50%, rgba(128,0,74,0.15), transparent 50%),
               radial-gradient(circle at 50% 65%, rgba(74,128,0,0.15), transparent 50%)`,
        backgroundAttachment: "fixed",
      },
    }),
  },
});

export default theme;

import { style } from "@vanilla-extract/css";
import { theme } from "isskinui";

export const heroSection = style({
  position: "relative",
  background:
    "linear-gradient(111deg, #C6E6EB 0.12%, #FFF 49.04%, #E2EBFA 100%)",
  width: "100%",
  height: "110vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
});

export const cubes = style({
  position: "absolute",
  width: 1174,
  height: "auto",
  transform: "scale(0.7)",

  "@media": {
    "screen and (min-width: 700px)": {},

    "screen and (min-width: 1000px)": {
      width: 1300,
    },
  },
});

export const cubeSvg = style({
  width: "100%",
  height: "auto",
});

export const rightCube = style({
  left: "-45%",
  rotate: "10deg",

  "@media": {
    "screen and (min-width: 400px)": {
      left: "1%",
    },

    "screen and (min-width: 700px)": {
      left: "28%",
    },

    "screen and (min-width: 1000px)": {
      left: "40%",
    },
  },
});

export const leftCube = style({
  right: "-40%",

  "@media": {
    "screen and (min-width: 400px)": {
      right: "10%",
    },

    "screen and (min-width: 700px)": {
      right: "34%",
    },

    "screen and (min-width: 1000px)": {
      right: "45%",
    },
  },
});

export const heroHeading = style({
  maxWidth: 300,
  fontFamily: theme.typography.fontFamilyHeadline,
  fontSize: 35,
  lineHeight: "45px",
  fontWeight: 700,
  textAlign: "center",

  "@media": {
    "screen and (min-width: 400px)": {
      maxWidth: 400,
      fontSize: 50,
      lineHeight: "60px",
    },

    "screen and (min-width: 700px)": {
      maxWidth: 600,
      fontSize: 75,
      lineHeight: "80px",
    },

    "screen and (min-width: 1000px)": {
      maxWidth: 987,
      fontSize: 100,
      lineHeight: "106px",
    },
  },
});

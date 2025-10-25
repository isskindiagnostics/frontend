import { style } from "@vanilla-extract/css";
import { theme } from "isskinui";

export const navContainer = style({
  boxSizing: "border-box",
  position: "fixed",
  top: 0,
  left: "50%",
  transform: "translateX(-50%)",
  width: "calc(100% - 30px)",
  display: "flex",
  justifyContent: "space-between",
  backgroundColor: theme.colors.brandWhite,
  borderRadius: 19,
  padding: 8,
  margin: "16px 0",

  "@media": {
    "screen and (min-width: 500px)": {
      margin: "24px 0",
      width: "calc(100% - 52px)",
    },

    "screen and (min-width: 800px)": {
      width: "calc(100% - 88px)",
    },
  },
});

export const navLogo = style({
  margin: "4px 13px 0 0",
});

export const navWrapper = style({
  position: "absolute",
  top: 80,
  width: "100%",
  display: "flex",
  listStyleType: "none",
  padding: 0,
  margin: 0,
  gap: 40,
  alignItems: "center",
  flexDirection: "column",

  "@media": {
    "screen and (min-width: 1000px)": {
      position: "unset",
      gap: 65,
      flexDirection: "row",
      justifyContent: "center",
    },
  },
});

export const navItem = style({
  fontWeight: "500 !important",
});

export const navActions = style({
  display: "flex",
  height: "max-content",
  gap: 24,
  alignItems: "center",
});

export const navLogin = style({
  display: "none !important",
  fontWeight: "500 !important",

  "@media": {
    "screen and (min-width: 1000px)": {
      display: "inline-flex !important",
    },
  },
});

export const navItemLogin = style({
  display: "inline-flex !important",

  "@media": {
    "screen and (min-width: 1000px)": {
      display: "none !important",
    },
  },
});

export const hamburgerBtn = style({
  position: "relative",
  display: "unset",
  width: 30,
  height: 30,
  border: 0,
  marginRight: 15,
  background: "transparent",
  cursor: "pointer",
  zIndex: 99,

  "@media": {
    "screen and (min-width: 1000px)": {
      display: "none",
    },
  },
});

export const hambugerStripeTop = style({
  position: "absolute",
  width: 30,
  backgroundColor: theme.colors.brandBlack,
  borderRadius: 2,
});

export const hambugerStripeBottom = style({
  position: "absolute",
  width: 30,
  backgroundColor: theme.colors.brandBlack,
  borderRadius: 2,
});

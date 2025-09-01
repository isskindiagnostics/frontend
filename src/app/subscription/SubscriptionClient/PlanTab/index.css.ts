import { style } from "@vanilla-extract/css";
import { theme } from "isskinui";

export const container = style({
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  height: 0,
});

export const contentWrapper = style({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  padding: `${theme.spacing.lg} 0`,
  gap: theme.spacing.lg,
  overflowY: "scroll",
  msOverflowStyle: "none",
  scrollbarWidth: "none",
  selectors: {
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
});

export const titleWrapper = style({
  display: "flex",
  justifyContent: "space-between",
});

export const blocks = style({
  width: "100%",
  display: "flex",
  gap: theme.spacing.lg,
  marginTop: theme.spacing.lg,
});
